import { DateTime } from '@easepick/datetime';
import { IBaseConfig } from '@easepick/base-plugin';

export interface ITimeConfig extends IBaseConfig {
  native?: boolean;
  format?: string;
  append?: string;
  seconds?: boolean;
  stepHours?: number;
  stepMinutes?: number;
  stepSeconds?: number;
  format12?: boolean;
}

declare module '@easepick/core' {
  interface Core {
    getStartDate(): DateTime;
    getEndDate(): DateTime;
  }
}

declare module '@easepick/core/dist/types' {
  interface IPickerConfig {
    TimePlugin?: ITimeConfig;
  }
}