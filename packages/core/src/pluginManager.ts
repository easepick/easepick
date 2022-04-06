import { Core } from './core';

export default class PluginManager {
  public picker: Core;
  public instances = {};

  constructor(picker: Core) {
    this.picker = picker;
  }

  /**
   * Initialize user-supplied plugins (if any)
   */
  public initialize(): void {
    const list = [];

    this.picker.options.plugins.forEach((plugin: any) => {
      if (typeof plugin === 'function') {
        list.push(new plugin);
      } else if (typeof plugin === 'string'
        && typeof easepick !== 'undefined'
        && Object.prototype.hasOwnProperty.call(easepick, plugin)) {
        list.push(new easepick[plugin]);
      } else {
        console.warn(`easepick: ${plugin} not found.`);
      }
    });

    list.sort((a, b) => {
      if (a.priority > b.priority) return -1;
      if (a.priority < b.priority) return 1;

      if (a.dependencies.length > b.dependencies.length) return 1;
      if (a.dependencies.length < b.dependencies.length) return -1;

      return 0;
    });

    list.forEach(plugin => {
      plugin.attach(this.picker);
      this.instances[plugin.getName()] = plugin;
    });
  }

  /**
   * Return instance of plugin
   * 
   * @param name 
   * @returns Plugin
   */
  public getInstance<T>(name: string): T {
    return this.instances[name];
  }

  /**
   * Add plugin «on the fly» to the picker
   * 
   * @param name 
   */
  public addInstance<T>(name: string): T {
    if (!Object.prototype.hasOwnProperty.call(this.instances, name)) {
      if (typeof easepick !== 'undefined' && Object.prototype.hasOwnProperty.call(easepick, name)) {
        const plugin = new easepick[name];
        plugin.attach(this.picker);
        this.instances[plugin.getName()] = plugin;

        return plugin;
      } else if (this.getPluginFn(name) !== 'undefined') {
        const plugin = new (this.getPluginFn(name));
        plugin.attach(this.picker);
        this.instances[plugin.getName()] = plugin;

        return plugin;
      } else {
        console.warn(`easepick: ${name} not found.`);
      }
    } else {
      console.warn(`easepick: ${name} already added.`);
    }

    return null;
  }

  /**
   * Remove plugin from the picker
   * 
   * @param name 
   */
  public removeInstance(name: string): boolean {
    if (name in this.instances) {
      this.instances[name].detach();
    }

    return (delete this.instances[name]);
  }

  /**
   * Reload plugin
   * 
   * @param name 
   */
  public reloadInstance<T>(name: string): T {
    this.removeInstance(name);

    return this.addInstance(name);
  }

  /**
   * Find plugin function by the name
   * 
   * @param name 
   * @returns Plugin
   */
  private getPluginFn(name: string): any {
    return [...this.picker.options.plugins]
      .filter(x => typeof x === 'function' && (new x).getName() === name)
      .shift();
  }
}