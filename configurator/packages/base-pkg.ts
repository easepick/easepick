import { IConflict, IOption, ISetup, IUsage } from './interface';

export class BasePkg {
  public name: string;
  public id: string;
  public included: boolean = false;
  public options: IOption[] = [];
  public confict: IConflict;
  public setup: ISetup;
  public usage: IUsage;

  constructor() {
    if (typeof this['fillOptions'] === 'function') {
      this['fillOptions']();
    }
  }
}