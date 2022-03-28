import { easepick } from '@easepick/bundle';
import { CorePkg } from './packages/core-pkg';
import './scss/index.scss';

const app = document.getElementById('app');
app.innerHTML = `
  <div id="app-picker-layout">
    <input id="app-picker"/>
  </div>
  <div id="app-package">
    <div id="app-package-names"></div>
    <div id="app-package-options"></div>
  </div>
  <div id="app-config"></div>
`;

const picker = new easepick.create({
  element: '#app-picker',
  css: [
    'https://cdn.jsdelivr.net/npm/@easepick/core@1.0.1/dist/index.css',
  ],
})

const core = new CorePkg();
//console.log(core.toOptions());