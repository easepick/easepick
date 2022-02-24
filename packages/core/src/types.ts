import { DateTime } from '@easepick/datetime';
import { Core } from './core';

export interface IEventDetail {
  view?: string;
  date?: DateTime;
  target?: HTMLElement;
  index?: number;
}

export interface IPickerElements {
  container: HTMLElement;
  shadowRoot: ShadowRoot;
  wrapper: HTMLElement;
}

export interface IPickerLocales {
  previousMonth?: string;
  nextMonth?: string;
  cancel?: string;
  apply?: string;
}

export interface IPickerConfig {
  element: HTMLElement | string;
  doc?: Document | ShadowRoot;
  css?: string | string[] | ((picker: Core) => void);
  firstDay?: number;
  lang?: string;
  date?: Date | string | number;
  format?: string;
  grid?: number;
  calendars?: number;
  readonly?: boolean;
  autoApply?: boolean;
  header?: boolean | string | HTMLElement;
  locale?: IPickerLocales;
  plugins?: any[];
  documentClick?: boolean | (() => void);
  setup?(picker: Core): void;
}
