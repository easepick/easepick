export interface IConflict {
  options?: string[];
  plugins?: string[];
}

export interface ISetup {
  npm: string;
  cdn: string;
}

export interface IUsage {
  npm: string;
  cdn: string;
}

export interface IOption {
  name: string;
  default?: unknown;
  value?: unknown;
  values?: any[];
  min?: number;
  max?: number;
  type?: string;
  configurable: boolean;
  modified?: boolean;
  conflict?: IConflict;
  onChange?(picker, value): void;
}

export interface IPackage {
  fillOptions?(): void;
}
