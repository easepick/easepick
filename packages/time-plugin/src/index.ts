import { DateTime } from '@easepick/datetime';
import { BasePlugin, IEventDetail, IPlugin } from '@easepick/base-plugin';
import { RangePlugin } from '@easepick/range-plugin';
import { ITimeConfig } from './interface';
import './index.scss';

export class TimePlugin extends BasePlugin implements IPlugin {
  public options: ITimeConfig = {
    native: false,
    seconds: false,
    stepHours: 1,
    stepMinutes: 5,
    stepSeconds: 5,
    format12: false,
  };

  public rangePlugin: RangePlugin;

  public timePicked = {
    input: null,
    start: null,
    end: null,
  }

  public timePrePicked = {
    input: null,
    start: null,
    end: null,
  }

  public binds = {
    getDate: this.getDate.bind(this),
    getStartDate: this.getStartDate.bind(this),
    getEndDate: this.getEndDate.bind(this),
    onView: this.onView.bind(this),
    onInput: this.onInput.bind(this),
    onChange: this.onChange.bind(this),
    onClick: this.onClick.bind(this),
    setTime: this.setTime.bind(this),
    setStartTime: this.setStartTime.bind(this),
    setEndTime: this.setEndTime.bind(this),
  };


  /**
   * Returns plugin name
   * 
   * @returns String
   */
  public getName(): string {
    return 'TimePlugin';
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    this.binds['_getDate'] = this.picker.getDate;
    this.binds['_getStartDate'] = this.picker.getStartDate;
    this.binds['_getEndDate'] = this.picker.getEndDate;

    Object.defineProperties(this.picker, {
      getDate: {
        configurable: true,
        value: this.binds.getDate,
      },
      getStartDate: {
        configurable: true,
        value: this.binds.getStartDate,
      },
      getEndDate: {
        configurable: true,
        value: this.binds.getEndDate,
      },
      setTime: {
        configurable: true,
        value: this.binds.setTime,
      },
      setStartTime: {
        configurable: true,
        value: this.binds.setStartTime,
      },
      setEndTime: {
        configurable: true,
        value: this.binds.setEndTime,
      },
    });

    this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin');
    this.parseValues();

    this.picker.on('view', this.binds.onView);
    this.picker.on('input', this.binds.onInput);
    this.picker.on('change', this.binds.onChange);
    this.picker.on('click', this.binds.onClick);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    delete this.picker.setTime;
    delete this.picker.setStartTime;
    delete this.picker.setEndTime;

    Object.defineProperties(this.picker, {
      getDate: {
        configurable: true,
        value: this.binds['_getDate']
      },
      getStartDate: {
        configurable: true,
        value: this.binds['_getStartDate']
      },
      getEndDate: {
        configurable: true,
        value: this.binds['_getEndDate']
      },
    });

    this.picker.off('view', this.binds.onView);
    this.picker.off('input', this.binds.onInput);
    this.picker.off('change', this.binds.onChange);
    this.picker.off('click', this.binds.onClick);
  }

  /**
   * Function `view` event
   * Adds HTML layout of current plugin to the picker layout
   * 
   * @param event 
   */
  private onView(event: CustomEvent) {
    const { view, target }: IEventDetail = event.detail;

    if (view === 'Main') {
      this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin');

      const container = document.createElement('div');
      container.className = 'time-plugin-container';

      if (this.rangePlugin) {
        const startInput = this.getStartInput();
        container.appendChild(startInput);
        this.picker.trigger('view', { view: 'TimePluginInput', target: startInput });

        const endInput = this.getEndInput();
        container.appendChild(endInput);
        this.picker.trigger('view', { view: 'TimePluginInput', target: endInput });
      } else {
        const singleInput = this.getSingleInput();
        container.appendChild(singleInput);

        this.picker.trigger('view', { view: 'TimePluginInput', target: singleInput });
      }

      target.appendChild(container);

      this.picker.trigger('view', { view: 'TimePluginContainer', target: container });
    }
  }

  /**
   * 
   * @param event 
   */
  private onInput(event) {
    const target = event.target;

    if (target instanceof HTMLInputElement && target.classList.contains('time-plugin-input')) {
      const date = this.timePicked[target.name] || new DateTime();

      const [hours, minutes] = target.value.split(':');
      date.setHours(Number(hours) || 0, Number(minutes) || 0, 0, 0);

      if (this.picker.options.autoApply) {
        this.timePicked[target.name] = date;
        this.picker.updateValues();
      } else {
        this.timePrePicked[target.name] = date;
      }
    }
  }

  /**
   * Handle `change` event
   * 
   * @param event 
   */
  private onChange(event) {
    const target = event.target;

    if (target instanceof HTMLSelectElement && target.classList.contains('time-plugin-custom-input')) {
      const r = /(\w+)\[(\w+)\]/;
      const [, name, format] = target.name.match(r);
      const value = Number(target.value);
      let date = new DateTime();

      if (!this.picker.options.autoApply && this.timePrePicked[name] instanceof Date) {
        date = this.timePrePicked[name].clone();
      } else if (this.timePicked[name] instanceof Date) {
        date = this.timePicked[name].clone();
      }

      switch (format) {
        case 'HH':
          if (this.options.format12) {
            const period = (target.closest('.time-plugin-custom-block')
              .querySelector(`select[name="${name}[period]"]`) as HTMLSelectElement).value;

            const d = this.handleFormat12(period, date, value);

            date.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), 0);
          } else {
            date.setHours(value, date.getMinutes(), date.getSeconds(), 0);
          }
          break;

        case 'mm':
          date.setHours(date.getHours(), value, date.getSeconds(), 0);
          break;

        case 'ss':
          date.setHours(date.getHours(), date.getMinutes(), value, 0);
          break;

        case 'period':
          if (this.options.format12) {
            const hours = (target.closest('.time-plugin-custom-block')
              .querySelector(`select[name="${name}[HH]"]`) as HTMLSelectElement).value;

            const d = this.handleFormat12(target.value, date, Number(hours));

            date.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), 0);
          }
          break;
      }

      if (this.picker.options.autoApply) {
        this.timePicked[name] = date;
        this.picker.updateValues();
      } else {
        this.timePrePicked[name] = date;
      }
    }
  }

  private onClick(event) {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const element = target.closest('.unit') as HTMLElement;

      if (!(element instanceof HTMLElement)) return;

      if (this.picker.isApplyButton(element)) {
        Object.keys(this.timePicked).forEach(x => {
          if (this.timePrePicked[x] instanceof Date) {
            this.timePicked[x] = this.timePrePicked[x].clone();
          }
        });
        this.picker.updateValues();

        this.timePrePicked = {
          input: null,
          start: null,
          end: null,
        }
      }

      if (this.picker.isCancelButton(element)) {
        this.timePrePicked = {
          input: null,
          start: null,
          end: null,
        }

        this.picker.renderAll();
      }
    }
  }

  /**
   * Set time programmatically
   * 
   * @param value 
   * @param keyName 
   */
  private setTime(value: string): void {
    const d = this.handleTimeString(value);
    this.timePicked.input = d.clone();
    this.picker.renderAll();
    this.picker.updateValues();
  }

  /**
   * Set start time programmatically
   * 
   * @param value 
   * @param keyName 
   */
  private setStartTime(value: string): void {
    const d = this.handleTimeString(value);
    this.timePicked.start = d.clone();
    this.picker.renderAll();
    this.picker.updateValues();
  }

  /**
   * Set end time programmatically
   * 
   * @param value 
   * @param keyName 
   */
  private setEndTime(value: string): void {
    const d = this.handleTimeString(value);
    this.timePicked.end = d.clone();
    this.picker.renderAll();
    this.picker.updateValues();
  }

  private handleTimeString(value: string): DateTime {
    const d = new DateTime();
    const [h, m, s] = value.split(':').map(x => Number(x));
    const hours = h && !Number.isNaN(h) ? h : 0;
    const minutes = m && !Number.isNaN(m) ? m : 0;
    const seconds = s && !Number.isNaN(s) ? s : 0;
    d.setHours(hours, minutes, seconds, 0);

    return d;
  }
  /**
   * Adds time to DateTime object
   * Replaces the original `getDate` function 
   * 
   * @returns DateTime
   */
  private getDate(): DateTime {
    if (this.picker.options.date instanceof Date) {
      const date = new DateTime(this.picker.options.date, this.picker.options.format);

      if (this.timePicked.input instanceof Date) {
        const t = this.timePicked.input;
        date.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), 0);
      }

      return date;
    }

    return null;
  }

  /**
   * Adds time to DateTime object
   * Replaces the original `getStartDate` function 
   * 
   * @returns DateTime
   */
  private getStartDate(): DateTime {
    if (this.rangePlugin.options.startDate instanceof Date) {
      const date = new DateTime(this.rangePlugin.options.startDate, this.picker.options.format);

      if (this.timePicked.start instanceof Date) {
        const t = this.timePicked.start;
        date.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), 0);
      }

      return date;
    }

    return null;
  }

  /**
   * Adds time to DateTime object
   * Replaces the original `getEndDate` function 
   * 
   * @returns DateTime
   */
  private getEndDate(): DateTime {
    if (this.rangePlugin.options.endDate instanceof Date) {
      const date = new DateTime(this.rangePlugin.options.endDate, this.picker.options.format);

      if (this.timePicked.end instanceof Date) {
        const t = this.timePicked.end;
        date.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), 0);
      }

      return date;
    }

    return null;
  }

  /**
   * 
   * @returns HTMLElement
   */
  private getSingleInput(): HTMLElement {
    if (this.options.native) {
      return this.getNativeInput('input');
    }

    return this.getCustomInput('input');
  }

  /**
   * 
   * @returns HTMLElement
   */
  private getStartInput(): HTMLElement {
    if (this.options.native) {
      return this.getNativeInput('start');
    }

    return this.getCustomInput('start');
  }

  /**
   * 
   * @returns HTMLElement
   */
  private getEndInput(): HTMLElement {
    if (this.options.native) {
      return this.getNativeInput('end');
    }

    return this.getCustomInput('end');
  }

  /**
   * Returns `input[type="time"]` element
   * 
   * @param name 
   * @returns HTMLElement
   */
  private getNativeInput(name: string): HTMLElement {
    const element = document.createElement('input');
    element.type = 'time';
    element.name = name;
    element.className = 'time-plugin-input unit';

    const t = this.timePicked[name];
    if (t) {
      const HH = `0${t.getHours()}`.slice(-2);
      const mm = `0${t.getMinutes()}`.slice(-2);
      element.value = `${HH}:${mm}`;
    }

    return element;
  }

  /**
   * Returns `select` element 
   * 
   * @param name 
   * @returns HTMLElement
   */
  private getCustomInput(name: string): HTMLElement {
    const block = document.createElement('div');
    block.className = 'time-plugin-custom-block';

    const hSelect = document.createElement('select');
    hSelect.className = 'time-plugin-custom-input unit';
    hSelect.name = `${name}[HH]`;
    const hStart = this.options.format12 ? 1 : 0;
    const hLimit = this.options.format12 ? 13 : 24;
    let date = null;

    if (!this.picker.options.autoApply && this.timePrePicked[name] instanceof Date) {
      date = this.timePrePicked[name].clone();
    } else if (this.timePicked[name] instanceof Date) {
      date = this.timePicked[name].clone();
    }

    for (let i = hStart; i < hLimit; i += this.options.stepHours) {
      const hOption = document.createElement('option');
      hOption.value = String(i);
      hOption.text = String(i);

      if (date) {
        if (this.options.format12) {
          const hours = date.getHours() % 12 ? date.getHours() % 12 : 12;
          if (hours === i) {
            hOption.selected = true;
          }
        } else if (date.getHours() === i) {
          hOption.selected = true;
        }
      }

      hSelect.appendChild(hOption);
    }
    block.appendChild(hSelect);

    const mSelect = document.createElement('select');
    mSelect.className = 'time-plugin-custom-input unit';
    mSelect.name = `${name}[mm]`;
    const mLimit = 60;

    for (let i = 0; i < mLimit; i += this.options.stepMinutes) {
      const mOption = document.createElement('option');
      mOption.value = `0${String(i)}`.slice(-2);
      mOption.text = `0${String(i)}`.slice(-2);

      if (date && date.getMinutes() === i) {
        mOption.selected = true;
      }

      mSelect.appendChild(mOption);
    }
    block.appendChild(mSelect);

    if (this.options.seconds) {
      const sSelect = document.createElement('select');
      sSelect.className = 'time-plugin-custom-input unit';
      sSelect.name = `${name}[ss]`;
      const sLimit = 60;

      for (let i = 0; i < sLimit; i += this.options.stepSeconds) {
        const sOption = document.createElement('option');
        sOption.value = `0${String(i)}`.slice(-2);
        sOption.text = `0${String(i)}`.slice(-2);

        if (date && date.getSeconds() === i) {
          sOption.selected = true;
        }

        sSelect.appendChild(sOption);
      }
      block.appendChild(sSelect);
    }

    if (this.options.format12) {
      const pSelect = document.createElement('select');
      pSelect.className = 'time-plugin-custom-input unit';
      pSelect.name = `${name}[period]`;

      ['AM', 'PM'].forEach(x => {
        const pOption = document.createElement('option');
        pOption.value = x;
        pOption.text = x;

        if (date && x === 'PM' && date.getHours() >= 12) {
          pOption.selected = true;
        }

        pSelect.appendChild(pOption);
      })
      block.appendChild(pSelect);
    }

    return block;
  }

  /**
   * Handle 12H time
   * 
   * @param period 
   * @param date 
   * @param value 
   * @returns DateTime
   */
  private handleFormat12(period: string, date: DateTime, value: number): DateTime {
    const d = date.clone();

    switch (period) {
      case 'AM':
        if (value === 12) {
          d.setHours(0, d.getMinutes(), d.getSeconds(), 0);
        } else {
          d.setHours(value, d.getMinutes(), d.getSeconds(), 0);
        }
        break;

      case 'PM':
        if (value !== 12) {
          d.setHours(value + 12, d.getMinutes(), d.getSeconds(), 0);
        } else {
          d.setHours(value, d.getMinutes(), d.getSeconds(), 0);
        }
        break;
    }

    return d;
  }

  private parseValues() {
    if (this.rangePlugin) {
      if (this.rangePlugin.options.strict) {
        if (this.rangePlugin.options.startDate && this.rangePlugin.options.endDate) {
          const d1 = new DateTime(this.rangePlugin.options.startDate, this.picker.options.format);
          const d2 = new DateTime(this.rangePlugin.options.endDate, this.picker.options.format);

          this.timePicked.start = d1.clone();
          this.timePicked.end = d2.clone();
        }
      } else {
        if (this.rangePlugin.options.startDate) {
          const d = new DateTime(this.rangePlugin.options.startDate, this.picker.options.format);
          this.timePicked.start = d.clone();
        }

        if (this.rangePlugin.options.endDate) {
          const d = new DateTime(this.rangePlugin.options.endDate, this.picker.options.format);
          this.timePicked.end = d.clone();
        }
      }

      if (this.rangePlugin.options.elementEnd) {
        if (this.rangePlugin.options.strict) {
          if (this.picker.options.element instanceof HTMLInputElement
            && this.picker.options.element.value.length
            && this.rangePlugin.options.elementEnd instanceof HTMLInputElement
            && this.rangePlugin.options.elementEnd.value.length) {
            const d1 = new DateTime(this.picker.options.element.value, this.picker.options.format);
            const d2 = new DateTime(this.rangePlugin.options.elementEnd.value, this.picker.options.format);

            this.timePicked.start = d1.clone();
            this.timePicked.end = d2.clone();
          }
        } else {
          if (this.picker.options.element instanceof HTMLInputElement
            && this.picker.options.element.value.length) {
            const d = new DateTime(this.picker.options.element.value, this.picker.options.format);
            this.timePicked.start = d.clone();
          }

          if (this.rangePlugin.options.elementEnd instanceof HTMLInputElement
            && this.rangePlugin.options.elementEnd.value.length) {
            const d = new DateTime(this.rangePlugin.options.elementEnd.value, this.picker.options.format);
            this.timePicked.start = d.clone();
          }
        }
      } else if (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length) {
        const [_start, _end] = this.picker.options.element.value.split(this.rangePlugin.options.delimiter);

        if (this.rangePlugin.options.strict) {
          if (_start && _end) {
            const d1 = new DateTime(_start, this.picker.options.format);
            const d2 = new DateTime(_end, this.picker.options.format);

            this.timePicked.start = d1.clone();
            this.timePicked.end = d2.clone();
          }
        } else {
          if (_start) {
            const d = new DateTime(_start, this.picker.options.format);
            this.timePicked.start = d.clone();
          }
          if (_end) {
            const d = new DateTime(_end, this.picker.options.format);
            this.timePicked.start = d.clone();
          }
        }
      }
    } else {
      if (this.picker.options.date) {
        const d = new DateTime(this.picker.options.date, this.picker.options.format);
        this.timePicked.input = d.clone();
      }

      if (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length) {
        const d = new DateTime(this.picker.options.element.value, this.picker.options.format);
        this.timePicked.input = d.clone();
      }
    }
  }
}
