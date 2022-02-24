import { DateTime } from '@easepick/datetime';
import { IBaseConfig } from '@easepick/base-plugin';

export interface IPresetConfig extends IBaseConfig {
  customPreset?: Record<string, unknown>;
  customLabels?: string[];
  position?: string;
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
    PresetPlugin?: IPresetConfig;
  }
}
