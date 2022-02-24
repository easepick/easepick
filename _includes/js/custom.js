const now = new Date();
const [vYear, vMonth, vDay] = new Date().toISOString().substring(0, 10).split('-');
const allowedDates = [
  `${vYear}-${vMonth}-01`, `${vYear}-${vMonth}-03`, `${vYear}-${vMonth}-07`,
  `${vYear}-${vMonth}-11`, `${vYear}-${vMonth}-17`, `${vYear}-${vMonth}-21`,
];
let bookedDates = [
  `${vYear}-${vMonth}-02`,
  [`${vYear}-${vMonth}-06`, `${vYear}-${vMonth}-11`],
  `${vYear}-${vMonth}-18`,
  `${vYear}-${vMonth}-19`,
  `${vYear}-${vMonth}-20`,
  `${vYear}-${vMonth}-25`,
  `${vYear}-${vMonth}-27`,
];

const demo_cfg = {
  base() {
    return {
      grid: 2,
      calendars: 2,
      setup(picker) {
        picker.ui.wrapper.style.zIndex = 1;
      },
    }
  },
  index() {
    return {
      element: '#index-demo',
      documentClick: false,
      format: 'D MMM YYYY',
      plugins: ['RangePlugin'],
      css: [
        '/assets/css/demo_index.css',
      ],
      setup(picker) {
        picker.ui.wrapper.style.position = 'relative';
      }
    }
  },

  // plugins
  lockplugin() {
    return {
      element: '#input-lockplugin',
      plugins: ['LockPlugin'],
      LockPlugin: {
        minDate: new Date(),
        maxDate: new Date(new Date().getTime() + 86400 * 30 * 1000),
      },
    }
  },
  presetplugin() {
    return {
      element: '#input-presetplugin',
      plugins: ['RangePlugin', 'PresetPlugin'],
      PresetPlugin: {
        position: 'right',
      },
    }
  },
  rangeplugin() {
    return {
      element: '#checkin-rangeplugin',
      plugins: ['RangePlugin'],
      RangePlugin: {
        elementEnd: '#checkout-rangeplugin',
        repick: true
      }
    }
  },
  timeplugin() {
    return {
      element: '#input-timeplugin',
      plugins: ['TimePlugin'],
      TimePlugin: {
        stepMinutes: 10,
      }
    }
  },
  kbdplugin() {
    return {
      element: '#input-kbdplugin',
      plugins: ['KbdPlugin'],
      KbdPlugin: {
        dayIndex: 2,
      }
    }
  },

  // examples
  egbasic() {
    return {
      element: '#eg-basic',
      grid: 1,
      calendars: 1,
    }
  },
  egtooltipnights() {
    return {
      element: '#eg-tooltip-nights',
      plugins: ['RangePlugin'],
      RangePlugin: {
        tooltipNumber(num) {
          return num - 1;
        },
        locale: {
          one: 'night',
          other: 'nights',
        },
      },
    }
  },
  eglang() {
    return {
      element: '#eg-lang',
      lang: 'ru-RU',
      plugins: ['RangePlugin'],
      RangePlugin: {
        locale: {
          one: 'день',
          few: 'дня',
          many: 'дней',
        },
      },
    }
  },
  egalloweddays() {
    return {
      element: '#eg-allowed-days',
      plugins: ['LockPlugin'],
      LockPlugin: {
        filter(date, picked) {
          return !allowedDates.includes(date.format('YYYY-MM-DD'));
        },
      },
    }
  },
  egdaysprices() {
    return {
      element: '#eg-days-prices',
      css: [
        '/assets/css/demo_prices.css',
      ],
      setup(picker) {
        picker.ui.wrapper.style.zIndex = 1;

        const randomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const prices = {};
        allowedDates.forEach(x => {
          prices[x] = randomInt(50, 200);
        });
        picker.on('view', (evt) => {
          const { view, date, target } = evt.detail;
          const d = date ? date.format('YYYY-MM-DD') : null;

          if (view === 'CalendarDay' && prices[d]) {
            const span = target.querySelector('.day-price') || document.createElement('span');
            span.className = 'day-price';
            span.innerHTML = `$ ${prices[d]}`;
            target.append(span);
          }
        });
      }
    }
  },
  eghotelcal() {
    return {
      element: '#eg-hotel-cal',
      plugins: ['RangePlugin', 'LockPlugin'],
      css: [
        '/assets/css/demo_hotelcal.css',
      ],
      autoApply: false,
      setup(picker) {
        picker.ui.wrapper.style.zIndex = 1;

        const DateTime = easepick.DateTime;
        bookedDates = bookedDates.map(d => {
          if (d instanceof Array) {
            const start = new DateTime(d[0], 'YYYY-MM-DD');
            const end = new DateTime(d[1], 'YYYY-MM-DD');

            return [start, end];
          }

          return new DateTime(d, 'YYYY-MM-DD');
        })
      },
      RangePlugin: {
        tooltipNumber(num) {
          return num - 1;
        },
        locale: {
          one: 'night',
          other: 'nights',
        },
      },
      LockPlugin: {
        minDate: new Date(),
        inseparable: true,
        filter(date, picked) {
          if (picked.length === 1) {
            const incl = date.isBefore(picked[0]) ? '[)' : '(]';
            return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
          }

          return date.inArray(bookedDates, '[)');
        },
      },
    }
  },
  egcustomize() {
    return {
      element: '#eg-customize',
      plugins: ['RangePlugin'],
      css: [
        '/assets/css/customize_sample.css',
      ],
    }
  },
}

const collapse = {
  hide(element) {
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(() => {
        element.style.height = 0 + 'px';
      });
    });

    element.setAttribute('data-collapsed', 'false');
  },

  show(element) {
    const sectionHeight = element.scrollHeight;

    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', (e) => {
      element.removeEventListener('transitionend', arguments.callee);

      //element.style.height = null;
    });

    element.setAttribute('data-collapsed', 'true');
  },

  initialize() {
    const btns = Array.from(document.querySelectorAll('.collapse button[type="button"]'));
    btns.forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        evt.preventDefault();

        const content = btn.closest('.collapse').querySelector('.collapse__content');
        const isCollapsed = content.getAttribute('data-collapsed') === 'true';
        btn.blur();

        if (isCollapsed) {
          collapse.hide(content)
        } else {
          collapse.show(content)
        }
      })
    })
  }
}

const utils = {
  tags() {
    const stored = JSON.parse(localStorage.getItem('version'));
    if (stored && stored.d === (new Date).getDate()) {
      return new Promise((resolve, reject) => {
        resolve(stored.v);
      });
    }

    return fetch('https://api.github.com/repos/easepick/easepick/tags')
      .then(r => r.json())
      .then(json => utils.latest_tag(json));
  },
  latest_tag(json) {
    const version = json//.filter(x => !x.name.includes('beta'))
      .map(x => x.name = /^v/.test(x.name) ? x.name : 'v' + x.name)
      .reduce((a, b) => {
        return 0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
          ? a
          : b
      });
    if (version) {
      localStorage.setItem('version', JSON.stringify({ d: (new Date()).getDate(), v: version.replace(/^v/, '') }));

      return version;
    }

    return null;
  },
  add_script(version) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@easepick/bundle@' + version + '/dist/index.umd.min.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function () {
      if (document.readyState === 'complete') {
        utils.initialize(version);
      }
      else {
        document.addEventListener('readystatechange', () => {
          if (document.readyState === 'complete') {
            utils.initialize(version);
          }
        });
      }
    };
    document.head.appendChild(script);
  },
  initialize(version) {
    const elems = Array.from(document.querySelectorAll('.demo-wrapper'));

    elems.forEach((wrapper) => {
      const cfg = Object.assign({}, demo_cfg.base(), demo_cfg[wrapper.dataset.cfg]());

      cfg.element = document.querySelector(cfg.element);

      if (cfg.elementEnd) {
        cfg.elementEnd = document.querySelector(cfg.elementEnd);
      }

      if (!('css' in cfg)) {
        cfg['css'] = [`https://cdn.jsdelivr.net/npm/@easepick/bundle@${version}/dist/index.css`];
      } else {
        cfg['css'].unshift(`https://cdn.jsdelivr.net/npm/@easepick/bundle@${version}/dist/index.css`);
      }

      new easepick.create(cfg);
    });
  },
  favicon() {
    const date = (new Date()).getDate();
    const favicon = document.querySelector('link[rel="shortcut icon"]');

    favicon.setAttribute('href', '/assets/favicon/' + date + '.png');
  },
  toggable_dark_mode() {
    const toggleDarkMode = document.querySelector('.js-promo-color-modes-toggle');

    jtd.addEvent(toggleDarkMode, 'click', () => {
      if (jtd.getTheme() === 'dark') {
        jtd.setTheme('light');
      } else {
        jtd.setTheme('dark');
      }
    });
  }
}

utils.favicon();

utils.tags().then(ver => utils.add_script(typeof ver === 'string' ? ver : ver[0].name));

jtd.onReady(() => {
  //utils.toggable_dark_mode();
  //utils.initialize();
  collapse.initialize();
});