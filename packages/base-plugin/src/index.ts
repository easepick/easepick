import { Core } from '@easepick/core';
import { IBaseConfig, IPlugin, IEventDetail } from './interface';

export class BasePlugin {
  public picker: Core;
  public options: IBaseConfig;
  public priority = 0;
  public dependencies: string[] = [];

  /**
   * - Called automatically via PluginManager.initialize() or PluginManager.addInstance() -
   * Add plugin to the picker
   * 
   * @param picker 
   */
  public attach(picker: Core): void {
    this.options = {
      ...this.options,
      ...(picker.options[this['getName']()] || {}),
    };

    this.picker = picker;

    if (this.dependenciesNotFound()) {
      const deps = this.dependencies.filter(x => !this.pluginsAsStringArray().includes(x));
      console.warn(`${this['getName']()}: required dependencies (${deps.join(', ')}).`);
      return;
    }

    const pluginClass = this.camelCaseToKebab(this['getName']());
    this.picker.ui.container.classList.add(pluginClass);

    this['onAttach']();
  }

  /**
   * - Called automatically via PluginManager.removeInstance() -
   * Remove plugin from the picker
   */
  public detach(): void {
    const pluginClass = this.camelCaseToKebab(this['getName']());
    this.picker.ui.container.classList.remove(pluginClass);

    if (typeof this['onDetach'] === 'function') {
      this['onDetach']();
    }
  }

  /**
   * Check dependencies for plugin
   * 
   * @returns Boolean
   */
  private dependenciesNotFound(): boolean {
    return this.dependencies.length
      && !this.dependencies.every(v => this.pluginsAsStringArray().includes(v));
  }

  /**
   * Return plugins list as string array
   * 
   * @returns []
   */
  private pluginsAsStringArray(): string[] {
    return this.picker.options.plugins
      .map(x => typeof x === 'function' ? (new x).getName() : x);
  }

  /**
   * Return camelCase in kebab-case
   * Eg.: `userName` -> `user-name`
   * 
   * @param str 
   * @returns String
   */
  private camelCaseToKebab (str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
  }
}

export { IBaseConfig, IPlugin, IEventDetail };