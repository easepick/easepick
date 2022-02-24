import { DateTime } from '@easepick/datetime';
import { BasePlugin, IEventDetail, IPlugin } from '@easepick/base-plugin';
import { IPresetConfig } from './interface';
import './index.scss';

export class PresetPlugin extends BasePlugin implements IPlugin {
  public dependencies = ['RangePlugin'];

  public binds = {
    onView: this.onView.bind(this),
    onClick: this.onClick.bind(this),
  }

  public options: IPresetConfig = {
    customLabels: ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month'],
    customPreset: {},
    position: 'left',
  }

  /**
   * Returns plugin name
   * 
   * @returns String
   */
  public getName(): string {
    return 'PresetPlugin';
  }
  
  /**
   * - Called automatically via BasePlugin.attach() -
   * The function execute on initialize the picker
   */
  public onAttach(): void {
    if (!Object.keys(this.options.customPreset).length) {
      const date = new DateTime();
      const thisMonth = () => {
        const d1 = date.clone();
        d1.setDate(1);

        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        return [new DateTime(d1), new DateTime(d2)];
      };

      const lastMonth = () => {
        const d1 = date.clone();
        d1.setMonth(d1.getMonth() - 1);
        d1.setDate(1);

        const d2 = new Date(date.getFullYear(), date.getMonth(), 0);

        return [new DateTime(d1), new DateTime(d2)];
      };

      const ranges = [
        [date.clone(), date.clone()],
        [date.clone().subtract(1, 'day'), date.clone().subtract(1, 'day')],
        [date.clone().subtract(6, 'day'), date.clone()],
        [date.clone().subtract(29, 'day'), date.clone()],
        thisMonth(),
        lastMonth(),
      ];

      this.options.customLabels.forEach((label, key) => {
        this.options.customPreset[label] = ranges[key];
      });
    }

    this.picker.on('view', this.binds.onView);
    this.picker.on('click', this.binds.onClick);
  }

  /**
   * - Called automatically via BasePlugin.detach() -
   */
  public onDetach(): void {
    this.picker.off('view', this.binds.onView);
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
      const container = document.createElement('div');
      container.className = 'preset-plugin-container';

      Object.keys(this.options.customPreset).forEach((itemKey) => {
        if (Object.prototype.hasOwnProperty.call(this.options.customPreset, itemKey)) {
          const values = this.options.customPreset[itemKey];

          const item = document.createElement('button');
          item.className = 'preset-button unit';
          item.innerHTML = itemKey;
          item.dataset.start = values[0].getTime();
          item.dataset.end = values[1].getTime();

          container.appendChild(item);

          this.picker.trigger('view', { view: 'PresetPluginButton', target: item });
        }
      });
      target.appendChild(container);
      target.classList.add(`preset-${this.options.position}`);

      this.picker.trigger('view', { view: 'PresetPluginContainer', target: container });
    }
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

      if (this.isPresetButton(element)) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const startDate = new DateTime(Number(element.dataset.start));
        const endDate = new DateTime(Number(element.dataset.end));

        if (this.picker.options.autoApply) {
          this.picker.setDateRange(startDate, endDate);

          this.picker.trigger('select', {
            start: this.picker.getStartDate(),
            end: this.picker.getEndDate(),
          });

          this.picker.hide();
        } else {
          this.picker.datePicked = [
            startDate,
            endDate,
          ];

          this.picker.renderAll();
        }
      }
    }
  }

  /**
   * Determines if HTMLElement is preset buttons
   * 
   * @param element 
   * @returns Boolean
   */
  private isPresetButton(element: HTMLElement) {
    return element.classList.contains('preset-button');
  }
}
