import { BasePkg } from './packages/base-pkg';
import { IOption } from './packages/interface';

export class Html {
  public packages = document.getElementById('app-packages');
  public pickerLayout = document.getElementById('app-picker-layout');
  public config = document.getElementById('app-config');

  public pkg(pkg: BasePkg, picker) {
    const pkgForm = document.createElement('form');
    pkgForm.className = 'pkg-form';
    pkgForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    pkgForm.addEventListener('input', (e) => {
      const target = e.target;

      console.log(target['state']);
      //if (!(target.name in picker.options)) return;
      if (target instanceof HTMLInputElement) {
        switch (target.type) {
          case 'range':
            picker.options[target.name] = target.valueAsNumber;
            target.nextElementSibling.innerHTML = target.value;
            picker.renderAll();
            break;
        }
      }
    });

    pkgForm.addEventListener('change', (e) => {
      const target = e.target;
      if (target instanceof HTMLSelectElement) {
        picker.options[target.name] = /^\d+$/.test(target.value) ? Number(target.value) : target.value;
        picker.renderAll();
      }
    });

    const name = document.createElement('div');
    name.className = 'pkg-name';
    const pkgChecked = pkg.included ? 'checked' : '';
    name.innerHTML = `<input type="checkbox" id="${pkg.id}" ${pkgChecked}/> <label for="${pkg.id}">${pkg.name}</label>`;
    pkgForm.appendChild(name);

    const options = document.createElement('div');
    options.className = 'pkg-options';

    pkg.options.forEach(opt => {
      const optBlock = document.createElement('div');
      optBlock.className = 'pkg-option';

      const optName = document.createElement('div');
      optName.className = 'pkg-option-name';
      optName.innerHTML = opt.name;
      optBlock.appendChild(optName);

      if (typeof this[`control_${opt.type}`] == 'function') {
        const control = this[`control_${opt.type}`](opt);
        optBlock.appendChild(control);
      }

      options.appendChild(optBlock);
    });
    pkgForm.appendChild(options);

    this.packages.appendChild(pkgForm);
  }

  private control_range(opt: IOption) {
    const control = document.createElement('div');
    control.className = `pkg-option-control pkg-option-${opt.type}`;
    const el = document.createElement('input');
    el.type = 'range';
    el.value = String(opt.value);
    el.min = String(opt.min);
    el.max = String(opt.max);
    el.name = opt.name;
    control.appendChild(el);

    const span = document.createElement('span');
    span.innerText = String(opt.value);
    control.appendChild(span);

    return control;
  }

  private control_dropdown(opt: IOption) {
    const control = document.createElement('div');
    control.className = `pkg-option-control pkg-option-${opt.type}`;
    const el = document.createElement('select');
    el.name = opt.name;

    opt.values.forEach(v => {
      const optionItem = document.createElement('option');
      if (typeof v === 'object') {
        optionItem.text = v.text;
        optionItem.value = v.value;
      } else {
        optionItem.text = v;
        optionItem.value = v;
      }
      el.appendChild(optionItem);
    });

    control.appendChild(el);

    return control;
  }
}