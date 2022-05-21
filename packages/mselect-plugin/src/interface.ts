import { DateTime } from '@easepick/datetime';
import { IBaseConfig } from '@easepick/base-plugin';

export interface IMSelectConfig extends IBaseConfig {
  dates?: DateTime[];
  max?: number;
  delimiter?: string;
  sort?: string;
  inputFormat?: string;
  useWrapper?: boolean;
  locale?: {
    remove?: string,
  },
  itemTemplate?: (date: DateTime) => HTMLElement;
}

declare module '@easepick/core' {
  interface Core {
    addDates(array: Date[] | string[] | number[], format?: string): void;
    setDates(array: Date[] | string[] | number[], format?: string): void;
    getDates(format?: string): DateTime[];
    addDate(date: Date | string | number, format?: string): void;
    removeDate(date: Date | string | number, format?: string): void;
  }
}
declare module '@easepick/core/dist/types' {
  interface IPickerConfig {
    MSelectPlugin?: IMSelectConfig;
  }
}
