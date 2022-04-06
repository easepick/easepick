import { IBaseConfig } from '@easepick/base-plugin';

export interface IAmpPlugin extends IBaseConfig {
  dropdown?: {
    minYear?: number;
    maxYear?: number;
    months?: boolean;
    years?: boolean | string;
  }
  resetButton?: (() => boolean) | boolean;
  darkMode?: boolean;
  locale?: {
    resetButton?: string;
  }
}

declare module '@easepick/core/dist/types' {
  interface IAmpPlugin {
    AmpPlugin?: IAmpPlugin;
  }
}
