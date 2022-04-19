import { DateTime } from '@easepick/datetime';
import { IBaseConfig } from '@easepick/base-plugin';

export interface IMSelectConfig extends IBaseConfig {
  dates?: DateTime[];
  max?: number;
  delimiter?: string;
}

declare module '@easepick/core' {
  interface Core {
    setDates(array: Date[] | string[] | number[]): void;
    getDates(): DateTime[];
  }
}
declare module '@easepick/core/dist/types' {
  interface IPickerConfig {
    MSelectPlugin?: IMSelectConfig;
  }
}
