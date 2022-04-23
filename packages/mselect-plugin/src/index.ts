import { DateTime } from '@easepick/datetime';
import { RangePlugin } from '@easepick/range-plugin';
import { BasePlugin, IEventDetail, IPlugin } from '@easepick/base-plugin';
import { IMSelectConfig } from './interface';
import './index.scss';

export class MSelectPlugin extends BasePlugin implements IPlugin {
  public binds = {
    getDates: this.getDates.bind(this),
    addDates: this.addDates.bind(this),
    setDates: this.setDates.bind(this),
    addDate: this.addDate.bind(this),
    removeDate: this.removeDate.bind(this),
    onView: this.onView.bind(this),
    onHide: this.onHide.bind(this),
    onClickCalendarDay: this.onClickCalendarDay.bind(this),
    onClickApplyButton: this.onClickApplyButton.bind(this),
    parseValues: this.parseValues.bind(this),
    updateValues: this.updateValues.bind(this),
    clear: this.clear.bind(this),
  }

  public rangePlugin: RangePlugin;
  public unpicked: DateTime[] = [];

  public options: IMSelectConfig = {
    dates: [],
    delimiter: ';',
    inputFormat: 'YYYY-MM-DD',
  }

  /**
   * Returns plugin name
   * 
   * @returns String
   */
  public getName(): string {
    return 'MSelectPlugin';
  }

  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    this.binds['_parseValues'] = this.picker.parseValues;
    this.binds['_updateValues'] = this.picker.updateValues;
    this.binds['_clear'] = this.picker.clear;
    this.binds['_onClickCalendarDay'] = this.picker.onClickCalendarDay;
    this.binds['_onClickApplyButton'] = this.picker.onClickApplyButton;

    Object.defineProperties(this.picker, {
      setDates: {
        configurable: true,
        value: this.binds.setDates,
      },
      getDates: {
        configurable: true,
        value: this.binds.getDates,
      },
      parseValues: {
        configurable: true,
        value: this.binds.parseValues,
      },
      updateValues: {
        configurable: true,
        value: this.binds.updateValues,
      },
      clear: {
        configurable: true,
        value: this.binds.clear,
      },
      onClickCalendarDay: {
        configurable: true,
        value: this.binds.onClickCalendarDay,
      },
      onClickApplyButton: {
        configurable: true,
        value: this.binds.onClickApplyButton,
      },
    });

    this.picker.on('view', this.binds.onView);
    this.picker.on('hide', this.binds.onHide);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    Object.defineProperties(this.picker, {
      parseValues: {
        configurable: true,
        value: this.binds['_parseValues'],
      },
      updateValues: {
        configurable: true,
        value: this.binds['_updateValues'],
      },
      clear: {
        configurable: true,
        value: this.binds['_clear'],
      },
      onClickCalendarDay: {
        configurable: true,
        value: this.binds['_onClickCalendarDay'],
      },
      onClickApplyButton: {
        configurable: true,
        value: this.binds['_onClickApplyButton'],
      },
    });

    this.picker.off('view', this.binds.onView);
    this.picker.off('hide', this.binds.onHide);
  }

  /**
   * Fired on `view` event
   * 
   * @param event 
   */
  private onView(event: CustomEvent) {
    const { view, target }: IEventDetail = event.detail;

    if (view === 'CalendarDay') {
      const date = new DateTime(target.dataset.time);

      if (this.dateIsSelected(date)) {
        target.classList.add('selected');
      } else if (this.dateIsPreSelected(date)) {
        target.classList.add('selected');
      } else if (this.options.max && this.options.max === this.options.dates.length) {
        target.classList.add('not-available');
      }
    }

    if (view === 'Footer') {
      const applyButton = target.querySelector('.apply-button') as HTMLButtonElement;
      applyButton.disabled = this.options.dates.length === 0 && this.picker.datePicked.length === 0;
    }
  }

  /**
   * Fired on `hide` event
   */
  private onHide() {
    this.unpicked.forEach(d => {
      if (!this.dateIsSelected(d)) {
        this.options.dates.push(d);
      }
    });
    this.unpicked.length = 0;

    this.picker.renderAll();
  }

  /**
   * 
   * @param format 
   * @returns DateTime[] | String[]
   */
  private getDates(format?: string) {
    if (format) {
      return [...this.options.dates].map(d => d.format(format));
    }

    return [...this.options.dates];
  }

  /**
   * 
   * @param array 
   * @param format 
   */
  private addDates(array: Date[] | string[] | number[], format?: string) {
    format = format || this.options.inputFormat;

    if (this.rangePlugin) {
      // @TODO
    } else {
      this.options.dates.push(...array.map(d => new DateTime(d, format)));
    }

    if (this.options.max && this.options.dates.length > this.options.max) {
      this.options.dates.length = this.options.max;
    }

    this.updateValues();
    this.picker.renderAll();
  }

  /**
   * 
   * @param array 
   * @param format 
   */
  private setDates(array: Date[] | string[] | number[], format?: string) {
    format = format || this.options.inputFormat;

    if (this.rangePlugin) {
      // @TODO
    } else {
      this.options.dates = array.map(d => new DateTime(d, format));
    }

    if (this.options.max && this.options.dates.length > this.options.max) {
      this.options.dates.length = this.options.max;
    }

    this.updateValues();
    this.picker.renderAll();
  }

  /**
   * 
   * @param date 
   * @param format 
   */
  private addDate(date: Date | string | number, format?: string) {
    format = format || this.options.inputFormat;

    if (this.rangePlugin) {
      // @TODO
    } else {
      this.options.dates.push(new DateTime(date, format))
    }

    if (this.options.max && this.options.dates.length > this.options.max) {
      this.options.dates.length = this.options.max;
    }

    this.updateValues();
    this.picker.renderAll();
  }

  /**
   * 
   * @param date 
   * @param format 
   */
  private removeDate(date: Date | string | number, format?: string) {
    format = format || this.options.inputFormat;

    if (this.rangePlugin) {
      // @TODO
    } else {
      const x = new DateTime(date, format);
      this.options.dates = this.options.dates.filter(d => d.format('YYYY-MM-DD') !== x.format('YYYY-MM-DD'));
    }

    this.updateValues();
    this.picker.renderAll();
  }

  /**
   * Parse dates or value of input elements
   */
  private parseValues() {
    if (this.rangePlugin) {
      // @TODO
    } else {
      if (this.options.dates.length) {
        this.options.dates = this.options.dates.map(d => new DateTime(d, this.options.inputFormat));
      } else if (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length) {
        this.options.dates = this.picker.options.element.value
          .split(this.options.delimiter)
          .map(d => new DateTime(d, this.options.inputFormat));
      }

      if (this.options.max && this.options.dates.length > this.options.max) {
        this.options.dates.length = this.options.max;
      }
    }

    this.updateValues();
  }

  /**
   * Update value of input element
   */
  private updateValues() {
    const el = this.picker.options.element;
    let datesString = '';

    if (this.rangePlugin) {
      //
    } else {
      this.options.dates = this.options.dates.sort((a, b) => {
        switch (this.options.sort) {
          case 'asc':
            return a.getTime() - b.getTime();

          case 'desc':
            return b.getTime() - a.getTime();
        }
        return 0;
      });

      datesString = this.options.dates.map(d => d.format(this.picker.options.format)).join(this.options.delimiter);
    }

    if (el instanceof HTMLInputElement) {
      el.value = datesString;
    } else if (el instanceof HTMLElement) {
      el.innerText = datesString;
    }
  }


  /**
   * Clear selection
   */
  private clear() {
    this.options.dates.length = 0;
    this.picker.datePicked.length = 0;
    this.updateValues();
    this.picker.renderAll();
  }

  /**
   * 
   * @param element 
   */
  private onClickCalendarDay(element: HTMLElement) {
    if (this.picker.isCalendarDay(element)) {
      const date = new DateTime(element.dataset.time);
      this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin');

      if (this.rangePlugin) {
        //
      } else {
        if (this.picker.options.autoApply) {
          if (this.dateIsSelected(date)) {
            this.options.dates = this.options.dates.filter(d => d.format('YYYY-MM-DD') !== date.format('YYYY-MM-DD'));
          } else {
            this.options.dates.push(date);
          }

          this.picker.trigger('select', { dates: [...this.options.dates] });
          this.updateValues();
        } else {
          if (this.dateIsSelected(date)) {
            this.options.dates = this.options.dates.filter(d => d.format('YYYY-MM-DD') !== date.format('YYYY-MM-DD'));
            this.unpicked.push(date);
          } else if (this.dateIsPreSelected(date)) {
            this.picker.datePicked = this.picker.datePicked.filter(d => d.format('YYYY-MM-DD') !== date.format('YYYY-MM-DD'));
          } else {
            this.picker.datePicked.push(date);
          }
        }
      }

      this.picker.renderAll();
    }
  }

  /**
   * 
   * @param element 
   */
  private onClickApplyButton(element: HTMLElement) {
    if (this.picker.isApplyButton(element)) {
      this.rangePlugin = this.picker.PluginManager.getInstance('RangePlugin');

      if (this.rangePlugin) {
        //
      } else {
        this.options.dates.push(...this.picker.datePicked);

        this.updateValues();

        this.picker.trigger('select', { dates: [...this.options.dates] });
        this.picker.hide();
      }

      this.unpicked.length = 0;
    }
  }

  /**
   * 
   * @param date 
   * @returns Boolean
   */
  private dateIsSelected(date) {
    if (this.rangePlugin) {
      // @TODO
    }
    return this.options.dates.map(d => d.format('YYYY-MM-DD')).includes(date.format('YYYY-MM-DD'));
  }

  /**
   * 
   * @param date 
   * @returns Boolean
   */
  private dateIsPreSelected(date) {
    if (this.rangePlugin) {
      // @TODO (?)
    }

    return this.picker.datePicked.map(d => d.format('YYYY-MM-DD')).includes(date.format('YYYY-MM-DD'));
  }
}
