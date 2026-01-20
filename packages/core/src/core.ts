import Calendar from './calendar';
import { DateTime } from '@easepick/datetime';
import PluginManager from './pluginManager';
import {
  IEventDetail,
  IPickerConfig,
  IPickerElements,
} from './types';

export class Core {
  public Calendar = new Calendar(this);
  public PluginManager = new PluginManager(this);

  public calendars: DateTime[] = [];
  public datePicked: DateTime[] = [];
  public cssLoaded = 0;
  public binds = {
    hidePicker: this.hidePicker.bind(this),
    show: this.show.bind(this),
  }

  public options: IPickerConfig = {
    doc: document,
    css: [],
    element: null,
    firstDay: 1,
    grid: 1,
    calendars: 1,
    lang: 'en-US',
    date: null,
    format: 'YYYY-MM-DD',
    readonly: true,
    autoApply: true,
    header: false,
    inline: false,
    scrollToDate: true,
    locale: {
      nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
      previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
      cancel: 'Cancel',
      apply: 'Apply',
    },
    documentClick: this.binds.hidePicker,
    plugins: [],
  };

  public ui: IPickerElements = {
    container: null,
    shadowRoot: null,
    wrapper: null,
  };

  public version = __VERSION__;

  constructor(options: IPickerConfig) {
    const locales = { ...this.options.locale, ...options.locale };

    this.options = { ...this.options, ...options };
    this.options.locale = locales;

    this.handleOptions();

    this.ui.wrapper = document.createElement('span');
    this.ui.wrapper.style.display = 'none';
    this.ui.wrapper.style.position = 'absolute';
    this.ui.wrapper.style.pointerEvents = 'none';
    this.ui.wrapper.className = 'easepick-wrapper';
    this.ui.wrapper.attachShadow({ mode: 'open' });
    this.ui.shadowRoot = this.ui.wrapper.shadowRoot;

    this.ui.container = document.createElement('div');
    this.ui.container.className = 'container';

    if (this.options.zIndex) {
      this.ui.container.style.zIndex = String(this.options.zIndex);
    }

    if (this.options.inline) {
      this.ui.wrapper.style.position = 'relative';
      this.ui.container.classList.add('inline');
    }

    this.ui.shadowRoot.appendChild(this.ui.container);
    (this.options.element as HTMLElement).after(this.ui.wrapper);

    this.handleCSS();

    (this.options.element as HTMLElement).addEventListener('click', this.binds.show);

    this.on('view', this.onView.bind(this));
    this.on('render', this.onRender.bind(this));

    this.PluginManager.initialize();

    this.parseValues();

    if (typeof this.options.setup === 'function') {
      this.options.setup(this);
    }

    this.on('click', this.onClick.bind(this));

    const targetDate = this.options.scrollToDate ? this.getDate() : null;
    this.renderAll(targetDate);
  }

  /**
   * Add listener to container element
   * 
   * @param type 
   * @param listener 
   * @param options 
   */
  public on(type: string, listener: (event) => void, options: unknown = {}): void {
    this.ui.container.addEventListener(type, listener, options);
  }

  /**
   * Remove listener from container element
   * 
   * @param type 
   * @param listener 
   * @param options 
   */
  public off(type: string, listener: (event) => void, options: unknown = {}): void {
    this.ui.container.removeEventListener(type, listener, options);
  }

  /**
   * Dispatch an event
   * 
   * @param type 
   * @param detail 
   * @returns 
   */
  public trigger(type: string, detail: unknown = {}): boolean {
    return this.ui.container.dispatchEvent(new CustomEvent(type, { detail }));
  }

  /**
   * Destroy picker
   */
  public destroy() {
    (this.options.element as HTMLElement).removeEventListener('click', this.binds.show);
    if (typeof this.options.documentClick === 'function') {
      document.removeEventListener('click', this.options.documentClick, true);
    }

    // detach all plugins
    Object.keys(this.PluginManager.instances).forEach(plugin => {
      this.PluginManager.removeInstance(plugin);
    });

    this.ui.wrapper.remove();
  }

  /**
   * Fired on render event
   * 
   * @param event 
   */
  public onRender(event: CustomEvent) {
    const { view, date }: IEventDetail = event.detail;

    this.Calendar.render(date, view);
  }

  public onView(event: CustomEvent) {
    const { view, target } = event.detail;

    if (view === 'Footer' && this.datePicked.length) {
      const applyButton = target.querySelector('.apply-button');
      applyButton.disabled = false;
    }
  }

  /**
   * 
   * @param element 
   */
  public onClickHeaderButton(element: HTMLElement) {
    if (this.isCalendarHeaderButton(element)) {
      if (element.classList.contains('next-button')) {
        this.calendars[0].add(1, 'month');
      } else {
        this.calendars[0].subtract(1, 'month');
      }

      this.renderAll(this.calendars[0]);
    }
  }

  /**
   * 
   * @param element 
   */
  public onClickCalendarDay(element: HTMLElement) {
    if (this.isCalendarDay(element)) {
      const date = new DateTime(element.dataset.time);

      if (this.options.autoApply) {
        this.setDate(date);

        this.trigger('select', { date: this.getDate() });

        this.hide();
      } else {
        this.datePicked[0] = date;

        this.trigger('preselect', { date: this.getDate() });

        this.renderAll();
      }
    }
  }

  /**
   * 
   * @param element 
   */
  public onClickApplyButton(element: HTMLElement) {
    if (this.isApplyButton(element)) {
      if (this.datePicked[0] instanceof Date) {
        const date = this.datePicked[0].clone();
        this.setDate(date);
      }

      this.hide();

      this.trigger('select', { date: this.getDate() });
    }
  }

  /**
   * 
   * @param element 
   * @returns 
   */
  public onClickCancelButton(element: HTMLElement) {
    if (this.isCancelButton(element)) {
      this.hide();
      return;
    }
  }

  /**
   * Fired on click event
   * 
   * @param event
   */
  public onClick(event): void {
    const target = event.target;

    if (target instanceof HTMLElement) {
      const element = target.closest('.unit');

      if (!(element instanceof HTMLElement)) return;

      this.onClickHeaderButton(element);
      this.onClickCalendarDay(element);
      this.onClickApplyButton(element);
      this.onClickCancelButton(element);
    }
  }

  /**
   * Determine if the picker is visible or not
   * 
   * @returns Boolean
   */
  public isShown(): boolean {
    return this.ui.container.classList.contains('inline')
      || this.ui.container.classList.contains('show');
  }

  /**
   * Show the picker
   * 
   * @param event 
   */
  public show(event?): void {
    if (this.isShown()) return;

    const target = event && 'target' in event ? event.target : this.options.element;
    const { top, left } = this.adjustPosition(target);
    //this.ui.container.style.position = 'absolute';
    this.ui.container.style.top = `${top}px`;
    this.ui.container.style.left = `${left}px`;
    this.ui.container.classList.add('show');

    this.trigger('show', { target: target });
  }

  /**
   * Hide the picker
   */
  public hide(): void {
    this.ui.container.classList.remove('show');

    this.datePicked.length = 0;

    this.renderAll();

    this.trigger('hide');
  }

  /**
   * Set date programmatically
   * 
   * @param date 
   */
  public setDate(date: Date | string | number): void {
    const d = new DateTime(date, this.options.format);
    this.options.date = d.clone();

    this.updateValues();

    if (this.calendars.length) {
      this.renderAll();
    }
  }

  /**
   * 
   * @returns DateTime
   */
  public getDate(): DateTime {
    return this.options.date instanceof DateTime
      ? this.options.date.clone()
      : null;
  }

  /**
   * Parse `date` option or value of input element
   */
  public parseValues() {
    if (this.options.date) {
      this.setDate(this.options.date);
    } else if (this.options.element instanceof HTMLInputElement && this.options.element.value.length) {
      this.setDate(this.options.element.value);
    }

    if (!(this.options.date instanceof Date)) {
      this.options.date = null;
    }
  }

  /**
   * Update value of input element
   */
  public updateValues() {
    const date = this.getDate();
    const formatString = date instanceof Date ? date.format(this.options.format, this.options.lang) : '';

    const el = this.options.element;
    if (el instanceof HTMLInputElement) {
      el.value = formatString;
    } else if (el instanceof HTMLElement) {
      el.innerText = formatString;
    }
  }

  /**
   * Function for documentClick option
   * Allows the picker to close when the user clicks outside
   * 
   * @param e 
   */
  public hidePicker(e): void {
    let target = e.target;
    let host = null;

    if (target.shadowRoot) {
      target = e.composedPath()[0];
      host = target.getRootNode().host;
    }

    if (this.isShown()
      && this.options.inline === false
      && host !== this.ui.wrapper
      && target !== this.options.element) {
      this.hide();
    }
  }

  /**
   * Render entire picker layout
   * 
   * @param date 
   */
  public renderAll(date?: DateTime): void {
    this.trigger('render', { view: 'Container', date: (date || this.calendars[0]).clone() });
  }

  /**
   * Determines if the element is buttons of header (previous month, next month)
   * 
   * @param element 
   * @returns Boolean
   */
  public isCalendarHeaderButton(element: HTMLElement): boolean {
    return ['previous-button', 'next-button'].some(x => element.classList.contains(x));
  }

  /**
   * Determines if the element is day element
   * 
   * @param element 
   * @returns Boolean
   */
  public isCalendarDay(element: HTMLElement): boolean {
    return element.classList.contains('day');
  }

  /**
   * Determines if the element is the apply button
   * 
   * @param element 
   * @returns Boolean
   */
  public isApplyButton(element: HTMLElement): boolean {
    return element.classList.contains('apply-button');
  }

  /**
   * Determines if the element is the cancel button
   * 
   * @param element 
   * @returns Boolean
   */
  public isCancelButton(element: HTMLElement): boolean {
    return element.classList.contains('cancel-button');
  }

  /**
   * Change visible month
   * 
   * @param date 
   */
  public gotoDate(date: Date | string | number): void {
    const toDate = new DateTime(date, this.options.format);
    toDate.setDate(1);
    this.calendars[0] = toDate.clone();
    this.renderAll();
  }

  /**
   * Clear date selection
   */
  public clear() {
    this.options.date = null;
    this.datePicked.length = 0;
    this.updateValues();
    this.renderAll();
    this.trigger('clear');
  }

  /**
   * Handling parameters passed by the user
   */
  private handleOptions() {
    if (!(this.options.element instanceof HTMLElement)) {
      this.options.element = this.options.doc.querySelector(this.options.element) as HTMLElement;
    }

    if (typeof this.options.documentClick === 'function') {
      document.addEventListener('click', this.options.documentClick, true);
    }

    if (this.options.element instanceof HTMLInputElement) {
      this.options.element.readOnly = this.options.readonly;
    }

    if (this.options.date) {
      this.calendars[0] = new DateTime(this.options.date, this.options.format);
    } else {
      this.calendars[0] = new DateTime();
    }
  }

  /**
   * Apply CSS passed by the user
   */
  private handleCSS(): void {
    if (Array.isArray(this.options.css)) {
      this.options.css.forEach(cssLink => {
        const link = document.createElement('link');
        link.href = cssLink;
        link.rel = 'stylesheet';
        const onReady = () => {
          this.cssLoaded++;

          if (this.cssLoaded === this.options.css.length) {
            this.ui.wrapper.style.display = '';
          }
        };
        link.addEventListener('load', onReady);
        link.addEventListener('error', onReady);

        this.ui.shadowRoot.append(link);
      });
    } else if (typeof this.options.css === 'string') {
      const style = document.createElement('style') as HTMLStyleElement;
      const styleText = document.createTextNode(this.options.css);
      style.appendChild(styleText);

      this.ui.shadowRoot.append(style);
      this.ui.wrapper.style.display = '';
    } else if (typeof this.options.css === 'function') {
      this.options.css.call(this, this);
      this.ui.wrapper.style.display = '';
    }
  }

  /**
   * Calculate the position of the picker
   * 
   * @param element 
   * @returns { top, left }
   */
  private adjustPosition(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const wrapper = this.ui.wrapper.getBoundingClientRect();
  
    this.ui.container.classList.add('calc');
    const container = this.ui.container.getBoundingClientRect();
    this.ui.container.classList.remove('calc');
  
    let top = rect.bottom - wrapper.bottom;
    let left = rect.left - wrapper.left;
  
    if (typeof window !== 'undefined') {
      if (window.innerHeight < top + container.height && top - container.height >= 0) {
        top = rect.top - wrapper.top - container.height;
      }
  
      if (window.innerWidth < left + container.width && rect.right - container.width >= 0) {
        left = rect.right - wrapper.right - container.width;
      }
  
      // Fix: Clamp the left position to stay within the viewport's width
      if (left + (container.width + rect.left) > window.innerWidth) {
        left = window.innerWidth - (container.width + rect.left);
      }
    }
  
    return {
      left,
      top,
    };
  }
}

export {
  Core as create,
};