(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@easepick/bundle')) :
    typeof define === 'function' && define.amd ? define(['@easepick/bundle'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.easepick));
})(this, (function (bundle) { 'use strict';

    class PackageManager {
        app;
        packages = [];
        constructor() {
            this.app = document.getElementById('app');
        }
        add(pkg) {
            this.packages.push(pkg);
        }
        get(optionKey) {
            const idx = this.packages.findIndex(x => x.optionKey === optionKey);
            return this.packages[idx];
        }
        render() {
            this.packages.forEach(pkg => {
                pkg.createTab();
                pkg.createTabContent();
            });
        }
    }

    class Control {
        range(opt) {
            const control = document.createElement('div');
            control.className = `pkg-option-control pkg-option-${opt.type}`;
            const el = document.createElement('input');
            el.type = 'range';
            el.value = String(opt.default);
            el.min = String(opt.min);
            el.max = String(opt.max);
            el.name = opt.name;
            control.appendChild(el);
            const span = document.createElement('span');
            span.innerText = String(opt.default);
            control.appendChild(span);
            return control;
        }
        dropdown(opt) {
            const control = document.createElement('div');
            control.className = `pkg-option-control pkg-option-${opt.type}`;
            const el = document.createElement('select');
            el.name = opt.name;
            opt.values.forEach(v => {
                const optionItem = document.createElement('option');
                optionItem.selected = optionItem.value === opt.default;
                if (typeof v === 'object') {
                    optionItem.text = v.text;
                    optionItem.value = v.value;
                }
                else {
                    optionItem.text = v;
                    optionItem.value = v;
                }
                el.appendChild(optionItem);
            });
            control.appendChild(el);
            return control;
        }
        boolean(opt) {
            const control = document.createElement('div');
            control.className = `pkg-option-control pkg-option-${opt.type}`;
            const toggle = document.createElement('input');
            toggle.id = `option-${opt.name}`;
            toggle.type = 'checkbox';
            toggle.checked = Boolean(opt.default);
            control.appendChild(toggle);
            const label = document.createElement('label');
            label.setAttribute('for', `option-${opt.name}`);
            control.appendChild(label);
            return control;
        }
        number(opt) {
            const control = document.createElement('div');
            control.className = `pkg-option-control pkg-option-${opt.type}`;
            const left = document.createElement('button');
            left.innerText = '-';
            control.appendChild(left);
            const input = document.createElement('input');
            input.type = 'text';
            input.pattern = '[0-9]';
            input.value = String(opt.default);
            control.appendChild(input);
            const right = document.createElement('button');
            right.innerText = '+';
            control.appendChild(right);
            left.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target instanceof HTMLElement && e.target.nextElementSibling instanceof HTMLInputElement) {
                    let value = Number(e.target.nextElementSibling.value);
                    if (e.target.nextElementSibling.value === 'null') {
                        value = 0;
                    }
                    const v = Number(value) - 1;
                    input.value = isNaN(v) ? 'null' : String(v);
                    control.dispatchEvent(new Event('input'));
                }
            });
            right.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target instanceof HTMLElement && e.target.previousElementSibling instanceof HTMLInputElement) {
                    let value = Number(e.target.previousElementSibling.value);
                    if (e.target.previousElementSibling.value === 'null') {
                        value = 0;
                    }
                    const v = Number(value) + 1;
                    input.value = isNaN(v) ? 'null' : String(v);
                    control.dispatchEvent(new Event('input'));
                }
            });
            return control;
        }
        string(opt) {
            const control = document.createElement('div');
            control.className = `pkg-option-control pkg-option-${opt.type}`;
            control.innerHTML = String(opt.value);
            return control;
        }
        text(opt) {
            const control = document.createElement('div');
            control.className = `pkg-option-control pkg-option-${opt.type}`;
            const el = document.createElement('input');
            el.type = 'text';
            el.value = opt.default === null ? '' : String(opt.default);
            control.appendChild(el);
            return control;
        }
    }

    class BasePkg {
        name;
        optionKey;
        url;
        included = false;
        options = [];
        confict;
        dependencies = [];
        setup;
        usage;
        app;
        constructor() {
            if (typeof this['fillOptions'] === 'function') {
                this['fillOptions']();
            }
            this.app = document.getElementById('app');
        }
        id() {
            return this.name.replace(/^@/, '').replace(/\//, '-');
        }
        createConfig() {
            let config = {};
            this.options.forEach(opt => {
                if (opt.modified) {
                    config[opt.name] = opt.value;
                }
            });
            if (this.optionKey) {
                const configCopy = { ...config };
                config = {};
                config[this.optionKey] = { ...configCopy };
            }
            return config;
        }
        createTab() {
            const tab = document.createElement('div');
            tab.className = 'pkg-tab';
            tab.classList.toggle('active', this.name === '@easepick/core');
            tab.classList.toggle('included', this.included);
            tab.addEventListener('click', (e) => {
                if (e.target instanceof HTMLElement && e.target.nodeName !== 'INPUT') {
                    [...this.app.querySelectorAll('.pkg-tab')].forEach(x => x.classList.remove('active'));
                    tab.classList.add('active');
                    [...this.app.querySelectorAll('.pkg-options')].forEach(x => x.classList.remove('active'));
                    const options = this.app.querySelector(`.${this.id()}-options`);
                    options.classList.add('active');
                }
            });
            const tabName = document.createElement('div');
            tabName.className = 'pkg-tab-name';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = this.id();
            input.checked = this.included;
            input.disabled = this.name === '@easepick/core';
            input.className = 'pkg-checkbox';
            input.addEventListener('change', (e) => {
                this.included = input.checked;
                tab.classList.toggle('included', input.checked);
                this.app.dispatchEvent(new CustomEvent('options'));
            });
            tabName.appendChild(input);
            const span = document.createElement('span');
            span.innerText = this.name;
            tabName.appendChild(span);
            tab.appendChild(tabName);
            const tabInfo = document.createElement('div');
            tabInfo.className = 'pkg-tab-info';
            tabInfo.innerText = `${this.options.filter(x => x.modified).length}`;
            tab.appendChild(tabInfo);
            this.app.querySelector('.packages-list').appendChild(tab);
        }
        createTabContent() {
            const options = document.createElement('div');
            options.className = `pkg-options ${this.id()}-options`;
            options.classList.toggle('active', this.name === '@easepick/core');
            const control = new Control();
            for (let opt of this.options) {
                if (!opt.configurable)
                    continue;
                const optBlock = document.createElement('div');
                optBlock.className = 'pkg-option';
                const optName = document.createElement('div');
                optName.className = 'pkg-option-name';
                optName.innerHTML = opt.name;
                optBlock.appendChild(optName);
                if (typeof control[opt.type] == 'function') {
                    const controlElement = control[opt.type](opt);
                    switch (opt.type) {
                        case 'range':
                            controlElement.addEventListener('input', (e) => {
                                const el = e.target;
                                opt.modified = el.valueAsNumber !== opt.default;
                                opt.value = el.valueAsNumber;
                                el.nextElementSibling.innerText = el.value;
                                const detail = { pkg: this.name, key: this.optionKey };
                                this.app.dispatchEvent(new CustomEvent('options', { detail }));
                            });
                            break;
                        case 'dropdown':
                            controlElement.addEventListener('change', (e) => {
                                const el = e.target;
                                opt.modified = el.value !== opt.default;
                                opt.value = el.value;
                                const detail = { pkg: this.name, key: this.optionKey };
                                this.app.dispatchEvent(new CustomEvent('options', { detail }));
                            });
                            break;
                        case 'number':
                            controlElement.addEventListener('input', (e) => {
                                const el = e.target.nodeName === 'INPUT' ? e.target : e.target.querySelector('input');
                                opt.modified = typeof opt.default === 'string' ? el.value !== opt.default : Number(el.value) !== opt.default;
                                opt.value = typeof opt.default === 'string' ? el.value : Number(el.value);
                                const detail = { pkg: this.name, key: this.optionKey };
                                this.app.dispatchEvent(new CustomEvent('options', { detail }));
                            });
                            break;
                        case 'boolean':
                            controlElement.addEventListener('change', (e) => {
                                const el = e.target;
                                opt.modified = el.checked !== opt.default;
                                opt.value = el.checked;
                                const detail = { pkg: this.name, key: this.optionKey };
                                this.app.dispatchEvent(new CustomEvent('options', { detail }));
                            });
                            break;
                        case 'text':
                            controlElement.addEventListener('input', (e) => {
                                const el = e.target;
                                opt.modified = el.value !== opt.default;
                                opt.value = el.value;
                                const detail = { pkg: this.name, key: this.optionKey };
                                this.app.dispatchEvent(new CustomEvent('options', { detail }));
                            });
                            break;
                    }
                    optBlock.appendChild(controlElement);
                }
                options.appendChild(optBlock);
            }
            this.app.querySelector('.package-options').appendChild(options);
        }
    }

    class CorePkg extends BasePkg {
        name = '@easepick/core';
        url = 'https://easepick.com/packages/core';
        included = true;
        fillOptions() {
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
                    default: 10,
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
            ];
        }
    }

    class LockPkg extends BasePkg {
        name = '@easepick/lock-plugin';
        url = 'https://easepick.com/packages/lock-plugin';
        optionKey = 'LockPlugin';
        fillOptions() {
            this.options = [
                {
                    name: 'minDate',
                    default: null,
                    type: 'date',
                    configurable: true,
                },
                {
                    name: 'maxDate',
                    default: null,
                    type: 'date',
                    configurable: true,
                },
                {
                    name: 'minDays',
                    default: null,
                    type: 'number',
                    configurable: true,
                },
                {
                    name: 'maxDays',
                    default: null,
                    type: 'number',
                    configurable: true,
                },
                {
                    name: 'selectForward',
                    default: false,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'selectBackward',
                    default: false,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'presets',
                    default: true,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'inseparable',
                    default: false,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'filter',
                    configurable: false,
                },
            ];
        }
    }

    class PresetPkg extends BasePkg {
        name = '@easepick/preset-plugin';
        url = 'https://easepick.com/packages/preset-plugin';
        optionKey = 'PresetPlugin';
        dependencies = ['RangePlugin'];
        fillOptions() {
            this.options = [
                {
                    name: 'customPreset',
                    configurable: false,
                },
                {
                    name: 'customLabels',
                    configurable: false,
                },
                {
                    name: 'position',
                    default: 'left',
                    type: 'dropdown',
                    values: [
                        'left',
                        'top',
                        'right',
                        'bottom',
                    ],
                    configurable: true,
                },
            ];
        }
    }

    class RangePkg extends BasePkg {
        name = '@easepick/range-plugin';
        url = 'https://easepick.com/packages/range-plugin';
        optionKey = 'RangePlugin';
        fillOptions() {
            this.options = [
                {
                    name: 'elementEnd',
                    default: false,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'startDate',
                    configurable: false,
                },
                {
                    name: 'endDate',
                    configurable: false,
                },
                {
                    name: 'repick',
                    default: false,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'strict',
                    default: true,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'delimiter',
                    default: ' - ',
                    type: 'text',
                    configurable: true,
                },
                {
                    name: 'tooltip',
                    default: true,
                    type: 'boolean',
                    configurable: true,
                },
                {
                    name: 'tooltipNumber',
                    configurable: false,
                },
                {
                    name: 'locale',
                    configurable: false,
                },
            ];
        }
    }

    const app = document.getElementById('app');
    app.innerHTML = `
  <div class="app-picker-layout">
    <div> 
    <input id="app-picker"/>
    <input id="app-picker-end"/>
    </div>
  </div>
  <div class="app-wrapper">
    <div class="packages-list"></div>
    <div class="package-options"></div>
  </div>
  <div class="config-wrapper"></div>
`;
    let picker = new bundle.easepick.create({
        element: document.getElementById('app-picker'),
        css: [
            'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.0.2/dist/index.css',
        ],
        zIndex: 10,
    });
    const baseConfig = { ...picker.options };
    const baseConfigPlugin = {};
    const packageManager = new PackageManager();
    packageManager.add(new CorePkg());
    packageManager.add(new RangePkg());
    packageManager.add(new LockPkg());
    packageManager.add(new PresetPkg());
    app.addEventListener('options', (e) => {
        //const { pkg, key } = e.detail;
        const packages = packageManager.packages.filter(x => x.included);
        let config = {};
        packages.forEach(pkg => {
            const pkgConfig = pkg.createConfig();
            config = { ...config, ...pkgConfig };
        });
        const pickerLayout = packageManager.app.querySelector('.app-picker-layout');
        if ('RangePlugin' in config) {
            if ('elementEnd' in config['RangePlugin']) {
                config['RangePlugin']['elementEnd'] = document.getElementById('app-picker-end');
                pickerLayout.classList.add('element-end');
            }
            else {
                pickerLayout.classList.remove('element-end');
            }
        }
        else {
            pickerLayout.classList.remove('element-end');
        }
        picker.options.plugins.forEach(plugin => {
            picker.PluginManager.removeInstance(plugin);
        });
        picker.options.plugins = [];
        const plugins = Object.keys(config).filter(x => /Plugin$/.test(x));
        [...packageManager.app.querySelectorAll('.pkg-tab-name input[type="checkbox"]')].forEach((c) => {
            if (c.id !== 'easepick-core') {
                c.disabled = false;
            }
        });
        if (plugins.length) {
            plugins.forEach(plugin => {
                const pkg = packageManager.get(plugin);
                if (pkg && pkg.dependencies.length) {
                    pkg.dependencies.forEach(d => {
                        const dPkg = packageManager.get(d);
                        dPkg.included = true;
                        const pkgCheckbox = document.querySelector(`input#${dPkg.id()}`);
                        pkgCheckbox.checked = true;
                        pkgCheckbox.disabled = true;
                        if (!plugins.includes(d)) {
                            plugins.unshift(d);
                            picker.options.plugins.push(d);
                            picker.PluginManager.addInstance(d);
                        }
                    });
                }
                picker.options.plugins.push(plugin);
                picker.PluginManager.addInstance(plugin);
                // update plugin options
                const instance = picker.PluginManager.getInstance(plugin);
                if (!(plugin in baseConfigPlugin)) {
                    baseConfigPlugin[plugin] = { ...instance['options'] };
                }
                instance['options'] = { ...baseConfigPlugin[plugin], ...config[plugin] };
            });
            config['plugins'] = plugins;
        }
        picker.options = { ...baseConfig, ...config };
        if ('inline' in config) {
            picker.ui.container.classList.add('inline');
            picker.ui.container.style.removeProperty('position');
            picker.ui.container.style.removeProperty('top');
            picker.ui.container.style.removeProperty('left');
            picker.ui.wrapper.style.position = 'relative';
        }
        else {
            picker.ui.container.classList.remove('inline');
            picker.ui.wrapper.style.position = 'absolute';
        }
        picker.options.element.readOnly = !('readonly' in config);
        if ('zIndex' in config) {
            picker.ui.container.style.zIndex = config['zIndex'];
        }
        console.log(picker);
        picker.renderAll();
    });
    packageManager.render();

}));
