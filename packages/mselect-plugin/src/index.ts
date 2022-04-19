import { DateTime } from '@easepick/datetime';
import { BasePlugin, IEventDetail, IPlugin } from '@easepick/base-plugin';
import { IMSelectConfig } from './interface';
import './index.scss';

export class MSelectPlugin extends BasePlugin implements IPlugin {
  public binds = {
    getDates: this.getDates.bind(this),
    setDates: this.setDates.bind(this),
    onView: this.onView.bind(this),
    onClickCalendarDay: this.onClickCalendarDay.bind(this),
    onClickApplyButton: this.onClickApplyButton.bind(this),
    parseValues: this.parseValues.bind(this),
    updateValues: this.updateValues.bind(this),
    clear: this.clear.bind(this),

  }

  public options: IMSelectConfig = {
    delimiter: ';',
    // @TODO
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
    });
    this.picker.on('view', this.binds.onView);
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
      }
    });

    this.picker.off('view', this.binds.onView);
  }

  /**
   * Function `view` event
   * Adds HTML layout of current plugin to the picker layout
   * 
   * @param event 
   */
  private onView(event: CustomEvent) {
    const { view, target }: IEventDetail = event.detail;

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


    }
  }

  private getDates() {
    // @TODO
  }

  private setDates() {
    // @TODO
  }

  /**
   * Parse dates or value of input elements
   */
  private parseValues() {
    // @TODO
  }

  /**
   * Update value of input element
   */
   private updateValues() {
     // @TODO
   }


  /**
   * Clear selection
   */
  private clear() {
    // @TODO
  }


  private onClickCalendarDay(element: HTMLElement) {
    // @TODO
  }


  private onClickApplyButton(element: HTMLElement) {
    // @TODO
  }
}
