import { BasePkg } from './base-pkg';
import { IPackage } from './interface';

export class CorePkg extends BasePkg implements IPackage {
  public name = '@easepick/core';
  public id = 'core-pkg';
  public included = true;

  public fillOptions() {
    this.options = [
      {
        name: 'element',
        configurable: false,
      },
      {
        name: 'doc',
        configurable: false,
      },
      {
        name: 'css',
        configurable: false,
      },
      {
        name: 'firstDay',
        default: 1,
        type: 'dropdown',
        values: [
          { text: 'Monday', value: 1 },
          { text: 'Tuesday', value: 2 },
          { text: 'Wednesday', value: 3 },
          { text: 'Thursday', value: 4 },
          { text: 'Friday', value: 5 },
          { text: 'Saturday', value: 6 },
          { text: 'Sunday', value: 0 },
        ],
        configurable: true,
      },
      {
        name: 'lang',
        default: 'en-US',
        type: 'dropdown',
        values: [
          'en-US',
          'ru-RU',
          'fr-FR',
          'de-DE',
          'ja-JP',
        ],
        configurable: true,
      },
      {
        name: 'date',
        value: null,
        configurable: false,
      },
      {
        name: 'format',
        default: 'YYYY-MM-DD',
        type: 'dropdown',
        values: [
          'YYYY-MM-DD',
          'DD MMM YYYY',
          'DD MMMM YYYY',
        ],
        configurable: true,
      },
      {
        name: 'grid',
        default: 1,
        type: 'range',
        min: 1,
        max: 12,
        configurable: true,
      },
      {
        name: 'calendars',
        default: 1,
        type: 'range',
        min: 1,
        max: 12,
        configurable: true,
      },
      {
        name: 'readonly',
        default: true,
        type: 'boolean',
        onChange: (picker, value) => {
          picker.options.element.readonly = value;
        },
        configurable: true,
      },
      {
        name: 'autoApply',
        default: true,
        type: 'boolean',
        configurable: true,
      },
      {
        name: 'zIndex',
        default: null,
        type: 'number',
        configurable: true,
      },
      {
        name: 'inline',
        default: false,
        type: 'boolean',
        configurable: true,
      },
      {
        name: 'header',
        default: null,
        type: 'text',
        configurable: true,
      },
      {
        name: 'locale',
        configurable: false,
      },
      {
        name: 'documentClick',
        configurable: false,
      },
      {
        name: 'setup',
        configurable: false,
      },
      {
        name: 'plugins',
        configurable: false,
      },
    ]
  }
}