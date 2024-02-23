import { IBaseConfig } from '@easepick/base-plugin';

export interface ILengthOfStayPluginConfig extends IBaseConfig {
}

declare module '@easepick/core' {
  interface Core {
    getRangeError(): boolean;
    getUnitError(): boolean;
  }
}

declare module '@easepick/core/dist/types' {
  interface IPickerConfig {
    LengthOfStayPlugin?: ILengthOfStayPluginConfig;
  }
}
