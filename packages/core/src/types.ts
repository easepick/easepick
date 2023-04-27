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
  locale?: {
    previousMonth?: string;
    nextMonth?: string;
    cancel?: string;
    apply?: string;
  }
  plugins?: any[];
  documentClick?: boolean | (() => void);
  zIndex?: number;
  inline?: boolean;
  scrollToDate?: boolean;
  setup?(picker: Core): void;
  showOffsetDays?: boolean;
}
