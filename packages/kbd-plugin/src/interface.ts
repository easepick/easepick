import { IBaseConfig } from '@easepick/base-plugin';

export interface IKbdPlugin extends IBaseConfig {
  unitIndex?: number;
  dayIndex?: number;
  html?: string;
}

declare module '@easepick/core/dist/types' {
  interface IKbdPlugin {
    KbdPlugin?: IKbdPlugin;
  }
}
