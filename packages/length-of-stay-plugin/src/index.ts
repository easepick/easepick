import { BasePlugin, IEventDetail, IPlugin } from '@easepick/base-plugin';
import './index.scss';
import { ExpectedStayUnit } from './constants';
import { RangePlugin } from '@easepick/range-plugin';
import { DateTime } from '@easepick/datetime';

export class LengthOfStayPlugin extends BasePlugin implements IPlugin {
  public dependencies = ['RangePlugin'];
  public rangePlugin: RangePlugin;

  public isRangeError: boolean = false;
  public isUnitError: boolean = false;
  
  public exactDates: boolean = true;
  public expectedStay: number | null = null;
  public expectedStayUnit: number | null = null;

  public binds = {
    onView: this.onView.bind(this),
    onClick: this.onClick.bind(this),
    updateValues: this.updateValues.bind(this),
    clear: this.clear.bind(this),
    getRangeError: this.getRangeError.bind(this),
    getUnitError: this.getUnitError.bind(this),    
    onClickCalendarDay: this.onClickCalendarDay.bind(this),
  };

  /**
   * Returns plugin name
   * 
   * @returns String
   */
  public getName(): string {
    return 'LengthOfStayPlugin';
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    this.binds['_updateValues'] = this.picker.updateValues;
    this.binds['_getRangeError'] = this.picker.getRangeError;
    this.binds['_getUnitError'] = this.picker.getUnitError;
    this.binds['_clear'] = this.picker.clear;    
    this.binds['_onClickCalendarDay'] = this.picker.onClickCalendarDay;

    Object.defineProperties(this.picker, {
      updateValues: {
        configurable: true,
        value: this.binds.updateValues,
      },
      clear: {
        configurable: true,
        value: this.binds.clear,
      },
      getRangeError: {
        configurable: false,
        value: this.binds.getRangeError
      },
      getUnitError: {
        configurable: false,
        value: this.binds.getUnitError
      },      
      onClickCalendarDay: {
        configurable: true,
        value: this.binds.onClickCalendarDay,
      }
    });    
    this.picker.on('view', this.binds.onView);
    this.picker.on('click', this.binds.onClick);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    Object.defineProperties(this.picker, {
      updateValues: {
        configurable: true,
        value: this.binds['_updateValues'],
      },
      clear: {
        configurable: true,
        value: this.binds['_clear'],
      },
      getRangeError: {
        configurable: false,
        value: this.binds['_getRangeError']
      },
      getUnitError: {
        configurable: false,
        value: this.binds['_getUnitError']
      }
    });

    this.picker.off('view', this.binds.onView);    
    this.picker.off('click', this.binds.onClick);
  }

  public getExactDateIndicator(): boolean {
    return this.exactDates;
  }

  public getExpectedStay(): number | null {
    return this.expectedStay;
  }

  public getExpectedStayUnit(): number | null {
    return this.expectedStayUnit;
  }

  public isExactDatesButton(element: HTMLElement): boolean {
    return element.id == 'exact-dates';
  }

  public onClickExactDatesButton(element: HTMLElement) {
    if (this.isExactDatesButton(element)) {
      var isChecked = element.checked;
      if (isChecked == true) {
        this.exactDates = true;
      } else {
        this.exactDates = false;
      }
      this.picker.renderAll();
    }
  }

  /**
   * Update value of input element
   */
  private updateValues() {
    const el = this.picker.options.element;
    const elEnd = this.rangePlugin.options.elementEnd;
    const start = this.picker.getStartDate();
    const end = this.picker.getEndDate();
    const exactDates = this.getExactDateIndicator();
    const expectedStay = this.getExpectedStay();
    const expectedStayUnit = this.getExpectedStayUnit();

    const startString = start instanceof Date
      ? start.format(this.picker.options.format, this.picker.options.lang)
      : '';
    const endString = end instanceof Date
      ? end.format(this.picker.options.format, this.picker.options.lang)
      : '';

    if (elEnd) {
      if (el instanceof HTMLInputElement) {
        el.value = startString;
      } else if (el instanceof HTMLElement) {
        el.innerText = startString;
      }

      if (elEnd instanceof HTMLInputElement) {
        elEnd.value = endString;
      } else if (elEnd instanceof HTMLElement) {
        elEnd.innerText = endString;
      }
    } else {
      const delimiter = startString || endString ? this.rangePlugin.options.delimiter : '';
      let formatString = ''

      if (!exactDates && !!expectedStay && !!expectedStayUnit) {
        var expectedStayUnitValue = ExpectedStayUnit[expectedStayUnit].toLocaleLowerCase();
        formatString = `${expectedStay}-${expectedStayUnitValue} stay | ${startString}${delimiter}${endString}`;
      } else {
        formatString = `${startString}${delimiter}${endString}`;        
      }

      if (el instanceof HTMLInputElement) {
        el.value = formatString;
      } else if (el instanceof HTMLElement) {
        el.innerText = formatString;
      }
    }
  }

  /**
   * Clear selection
   */
  private clear() {
    this.rangePlugin.options.startDate = null;
    this.rangePlugin.options.endDate = null;
    this.picker.datePicked.length = 0;
    this.exactDates = true;
    this.updateValues();
    this.picker.renderAll();
    this.picker.trigger('clear');
  }

  public isClearButton(element: HTMLElement): boolean {
    return element.classList.contains('clear-button');
  }

  public onClickClearButton(element: HTMLElement) {
    if (this.isClearButton(element)) {
      this.clear();
    }
  }

  /**
   * Function `view` event
   * Adds HTML layout of current plugin to the picker layout
   * 
   * @param event 
   */
  private onView(event: CustomEvent) {
    const { view, target }: IEventDetail = event.detail;
    this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin');

    if (view === 'Main') {
      var container = this.getLengthOfStaySection();
      target.appendChild(container);

      this.picker.trigger('view', { view: 'LengthOfStay', target: container });
    }

    if (view === 'LengthOfStay') {
      var errorRange = target.querySelector('#error-block-range') as HTMLElement;
      errorRange.hidden = !this.isRangeError;
      var errorUnit = target.querySelector('#error-block-unit') as HTMLElement;
      errorUnit.hidden = !this.isUnitError;

      this.exactDates ? this.setupExactDatesOn(target) : this.setupExactDatesOff(target);
      this.handleDropdown(event);
    }
  }

  private getLengthOfStaySection(): HTMLElement {
    const element = document.createElement('div');
    element.id = 'search-type-section';
    element.className = 'row';
    var optionsHtml = '';

    for (var i = 1; i <= 30; i++) {
      optionsHtml += '<option value="' + `${i}` + '">' + `${i}` + '</option>\n';
    }

    const htmlString = `
    <div class="row">
        <div class="col-12">
            <span class="exact-dates-text">Exact Dates</span>

            <label class="switch">
                <input type="checkbox" id="exact-dates" class="unit" checked>
                <span class="slider round"></span>
            </label>

            <span class="exact-dates-label" id="exact-off">Off</span>
            <span class="exact-dates-label" id="exact-on">On</span>

            <button class="pull-right sh-link clear-button unit top-button">Clear</button>
        </div>
    </div>
    <div class="row" id="length-of-stay">
      <div class="col-12">
        <span class="exact-dates-text">Length of Stay</span>
        <select class="form-control" id="expected-stay" name="ExpectedStay">
            <option selected="selected" value="">Any</option>
            ${optionsHtml}
        </select>
        <select class="form-control" id="expected-stay-unit" name="ExpectedStayUnit">
            <option selected="selected" value="">Day/Week/Month</option>            
            <option value="1">Day(s)</option>
            <option value="2">Week(s)</option>
            <option value="3">Month(s)</option>
        </select>
        <div class="bottom-button">
          <button class="pull-right sh-link clear-button unit">Clear</button>
        </div>
      </div>
      <div class="col-12 error" id="error-block-range" name="ExpectedStayRangeError" hidden>
        <p>Please choose a length of stay that is shorter than your selected date range</p>
      </div>
      <div class="col-12 error" id="error-block-unit" name="ExpectedStayUnitError" hidden>
        <p>Please choose either Day, Week, or Month for your length of stay</p>
      </div>
    </div>
    `
    element.insertAdjacentHTML('beforeend', htmlString);
    return element;
  }

  public handleDropdown(evt) {
    const { view, target }: IEventDetail = evt.detail;
    if (view === 'LengthOfStay') {
      const expectedStayDropdown = target.querySelector('#expected-stay');

      expectedStayDropdown.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.expectedStay = Number(target.value);

        const parent = target.parentElement.parentElement;
        this.checkLengthOfStayErrors(parent);
        this.updateValues();
      });

      const expectedStayUnitDropdown = target.querySelector('#expected-stay-unit');
      expectedStayUnitDropdown.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.expectedStayUnit = Number(target.value);

        const parent = target.parentElement.parentElement;
        this.checkLengthOfStayErrors(parent);
        this.updateValues();
      });
    }
  }

  private checkLengthOfStayErrors(target) {
    var noUnitSelectedErrorBlock = target.querySelector('#error-block-unit') as HTMLElement;
    if (!!this.getExpectedStay() && !!!this.getExpectedStayUnit()) {
      this.isUnitError = true;
      noUnitSelectedErrorBlock.hidden = false;
    };
    // Clear unit error
    if (!!this.getExpectedStay() && !!this.getExpectedStayUnit()) {
      this.isUnitError = false;
      noUnitSelectedErrorBlock.hidden = true;
    };

    if (!!this.picker.getStartDate() && !!this.picker.getEndDate() && !!this.getExpectedStay() && !!this.getExpectedStayUnit()) {
      var rangeErrorBlock = target.querySelector('#error-block-range') as HTMLElement;

      var start = this.picker.getStartDate().getTime();
      var end = this.picker.getEndDate().getTime();
      var totalTime = end - start;
      var totalDays = totalTime / (1000 * 60 * 60 * 24);
      totalDays += 1;

      var expectedStay = this.getExpectedStay();
      var unit = this.getExpectedStayUnit();

      switch (unit) {
        case null:
          this.picker.show();
          this.isUnitError = true;
          noUnitSelectedErrorBlock.hidden = false;
          return;
        case 1:
          break;
        case 2:
          expectedStay = expectedStay * 7;
          break;
        case 3:
          expectedStay = expectedStay * 28;
          break;
      }

      if (totalDays < expectedStay) {
        this.isRangeError = true;
        this.picker.show();
        rangeErrorBlock.hidden = false;
      } else {
        this.isRangeError = false;
        rangeErrorBlock.hidden = true;
      }
    }
  }

  private setupExactDatesOn(target) {
    const exactDatesOff = target.querySelector('#exact-off');
    const lengthOfStaySection = target.querySelector('#length-of-stay');
    const exactDatesOn = target.querySelector('#exact-on');
    const exactDatesButton = target.querySelector('#exact-dates');
    const topClear = target.querySelector('.top-button');
    const expectedStay = target.querySelector('#expected-stay');
    const expectedStayUnit = target.querySelector('#expected-stay-unit');

    exactDatesButton.checked = true;
    exactDatesOff.hidden = true;
    lengthOfStaySection.hidden = true;
    exactDatesOn.hidden = false;
    topClear.hidden = false;

    expectedStay.value = '';
    this.expectedStay = null;
    expectedStayUnit.value = '';
    this.expectedStayUnit = null;

    (this.picker.options.element as HTMLInputElement).placeholder = "When is your stay?";
  }

  private setupExactDatesOff(target) {
    const exactDatesOff = target.querySelector('#exact-off');
    const lengthOfStaySection = target.querySelector('#length-of-stay');
    const exactDatesOn = target.querySelector('#exact-on');
    const exactDatesButton = target.querySelector('#exact-dates');
    const topClear = target.querySelector('.top-button');
    const expectedStay = target.querySelector('#expected-stay');
    const expectedStayUnit = target.querySelector('#expected-stay-unit');

    exactDatesButton.checked = false;
    exactDatesOff.hidden = false;
    lengthOfStaySection.hidden = false;
    exactDatesOn.hidden = true;
    topClear.hidden = true;
    expectedStay.value = this.expectedStay ? this.expectedStay : '';
    expectedStayUnit.value = this.expectedStayUnit ? this.expectedStayUnit : '';

    (this.picker.options.element as HTMLInputElement).placeholder = "How long is your stay?";
  }

  public getRangeError(): boolean {
    return this.isRangeError;
  }

  public getUnitError(): boolean {
    return this.isUnitError;
  }

  /**
   * Handle click event
   * 
   * @param event 
   */
  private onClick(event) {
    const target = event.target;
    if (target instanceof HTMLElement) {
      const element = target.closest('.unit') as HTMLElement;

      if (!(element instanceof HTMLElement)) return;

      this.onClickExactDatesButton(element);
      this.onClickClearButton(element);
    }
  }

  /** This section basically recreates Range functionality but with small tweaks.
   * Sets values for Range options.
   */
  private onClickCalendarDay(element: HTMLElement) {
    if (this.picker.isCalendarDay(element)) {

      if (this.picker.datePicked.length === 2) {
        this.picker.datePicked.length = 0;
      }

      const date = new DateTime(element.dataset.time);
      this.picker.datePicked[this.picker.datePicked.length] = date;

      if (this.picker.datePicked.length === 2 && this.picker.datePicked[0].isAfter(this.picker.datePicked[1])) {
        const tempDate = this.picker.datePicked[1].clone();
        this.picker.datePicked[1] = this.picker.datePicked[0].clone();
        this.picker.datePicked[0] = tempDate.clone();
      }

      if (this.picker.datePicked.length === 1 || !this.picker.options.autoApply) {
        this.picker.trigger('preselect', {
          start: this.picker.datePicked[0] instanceof Date ? this.picker.datePicked[0].clone() : null,
          end: this.picker.datePicked[1] instanceof Date ? this.picker.datePicked[1].clone() : null,
        });
      }

      if (this.picker.datePicked.length === 1) {
        if (!this.rangePlugin.options.strict && this.picker.options.autoApply) {
          if (this.picker.options.element === this.rangePlugin.triggerElement) {
            this.setStartDate(this.picker.datePicked[0]);
          }

          if (this.rangePlugin.options.elementEnd === this.rangePlugin.triggerElement) {
            this.setEndDate(this.picker.datePicked[0]);
          }

          this.picker.trigger('select', { start: this.picker.getStartDate(), end: this.picker.getEndDate() });
        }

        this.picker.renderAll();
      }

      if (this.picker.datePicked.length === 2) {
        if (this.picker.options.autoApply) {
          this.setDateRange(this.picker.datePicked[0], this.picker.datePicked[1]);

          this.picker.trigger('select', { start: this.picker.getStartDate(), end: this.picker.getEndDate() });

          // Stopping auto-close to allow length of stay selection
          // this.picker.hide();
        } else {
          this.hideTooltip();

          this.picker.renderAll();
        }
      }

      var parent = element.parentElement.parentElement.parentElement.parentElement;
      var target = parent.querySelector('#length-of-stay');
      this.checkLengthOfStayErrors(target);
      this.picker.renderAll();
    }
  }

  private hideTooltip() {
    this.rangePlugin.tooltipElement.style.visibility = 'hidden';
  }

  private setDateRange(start: Date | string | number, end: Date | string | number) {
    const startDate = new DateTime(start, this.picker.options.format);
    const endDate = new DateTime(end, this.picker.options.format);

    this.rangePlugin.options.startDate = startDate ? startDate.clone() : null;
    this.rangePlugin.options.endDate = endDate ? endDate.clone() : null;

    this.updateValues();

    this.picker.renderAll();
  }

  private setStartDate(date: Date | string | number) {
    const d = new DateTime(date, this.picker.options.format);
    this.rangePlugin.options.startDate = d ? d.clone() : null;

    this.updateValues();

    this.picker.renderAll();
  }

  /**
   * Set endDate programmatically
   * 
   * @param date 
   */
  private setEndDate(date: Date | string | number) {
    const d = new DateTime(date, this.picker.options.format);
    this.rangePlugin.options.endDate = d ? d.clone() : null;

    this.updateValues();

    this.picker.renderAll();
  }
}
