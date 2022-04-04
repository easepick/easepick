import { DateTime } from '@easepick/datetime';
import { IBaseConfig } from '@easepick/base-plugin';

export interface IRangeConfig extends IBaseConfig {
  elementEnd?: HTMLElement | string;
  startDate?: DateTime;
  endDate?: DateTime;
  repick?: boolean;
  strict?: boolean;
  delimiter?: string;
  tooltip?: boolean;
  tooltipNumber?: (num: number) => number;
  locale?: {
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
  }
  documentClick?: boolean | (() => void);
}

declare module '@easepick/core' {
  interface Core {
    setStartDate(date: Date | string | number): void;
    setEndDate(date: Date | string | number): void;
    setDateRange(start: Date | string | number, end: Date | string | number): void;
    getStartDate(): DateTime;
    getEndDate(): DateTime;
  }
}

declare module '@easepick/core/dist/types' {
  interface IPickerConfig {
    RangePlugin?: IRangeConfig;
  }
}
