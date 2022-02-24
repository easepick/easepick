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
  base: {
    grid: 2,
    calendars: 2,
    css: [
      '/assets/css/easepick.css',
    ],
    setup(picker) {
      picker.ui.wrapper.style.zIndex = 1;
    },
  },
  index: {
    element: '#index-demo',
    documentClick: false,
    format: 'D MMM YYYY',
    plugins: ['RangePlugin'],
    css: [
      '/assets/css/easepick.css',
      '/assets/css/demo_index.css',
    ],
    setup(picker) {
      picker.ui.wrapper.style.position = 'relative';
    }
  },

  // plugins
  lockplugin: {
    element: '#input-lockplugin',
    plugins: ['LockPlugin'],
    LockPlugin: {
      minDate: new Date(),
      maxDate: new Date(new Date().getTime() + 86400 * 30 * 1000),
    },
  },
  presetplugin: {
    element: '#input-presetplugin',
    plugins: ['RangePlugin', 'PresetPlugin'],
    PresetPlugin: {
      position: 'right',
    },
  },
  rangeplugin: {
    element: '#checkin-rangeplugin',
    plugins: ['RangePlugin'],
    RangePlugin: {
      elementEnd: '#checkout-rangeplugin',
      repick: true
    }
  },
  timeplugin: {
    element: '#input-timeplugin',
    plugins: ['TimePlugin'],
    TimePlugin: {
      stepMinutes: 10,
    }
  },
  kbdplugin: {
    element: '#input-kbdplugin',
    plugins: ['KbdPlugin'],
    KbdPlugin: {
      dayIndex: 2,
    }
  },

  // examples
  egbasic: {
    element: '#eg-basic',
    grid: 1,
    calendars: 1,
  },
  egtooltipnights: {
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
  },
  eglang: {
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
  },
  egalloweddays: {
    element: '#eg-allowed-days',
    plugins: ['LockPlugin'],
    LockPlugin: {
      filter(date, picked) {
        return !allowedDates.includes(date.format('YYYY-MM-DD'));
      },
    },
  },
  egdaysprices: {
    element: '#eg-days-prices',
    css: [
      '/assets/css/easepick.css',
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
  },
  eghotelcal: {
    element: '#eg-hotel-cal',
    plugins: ['RangePlugin', 'LockPlugin'],
    css: [
      '/assets/css/easepick.css',
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
  },
  egcustomize: {
    element: '#eg-customize',
    plugins: ['RangePlugin'],
    css: [
      '/assets/css/easepick.css',
      '/assets/css/customize_sample.css',
    ],
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
      .then(json => utils.latestTag(json));
  },
  latestTag(json) {
    const version = json.filter(x => !x.name.includes('beta'))
      .map(x => x.name = /^v/.test(x.name) ? x.name : 'v' + x.name)
      .reduce((a, b) => {
        return 0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
          ? a
          : b
      });
    if (version) {
      localStorage.setItem('version', JSON.stringify({ d: (new Date()).getDate(), v: version }));

      return version;
    }

    return null;
  },
  addScript(version) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/easepick@' + version.replace(/^v/, '') + '/dist/index.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function () {
      if (document.readyState === 'complete') {
        utils.initialize();
      }
      else {
        document.addEventListener('readystatechange', () => {
          if (document.readyState === 'complete') {
            utils.initialize();
          }
        });
      }
    };
    document.head.appendChild(script);
  },
  initialize() {
    const elems = Array.from(document.querySelectorAll('.demo-wrapper'));

    elems.forEach((wrapper) => {
      const cfg = Object.assign({}, demo_cfg.base, demo_cfg[wrapper.dataset.cfg]);

      cfg.element = document.querySelector(cfg.element);

      if (cfg.elementEnd) {
        cfg.elementEnd = document.querySelector(cfg.elementEnd);
      }

      new easepick.create(cfg);
    });
  },
  favicon() {
    const date = (new Date()).getDate();
    const favicon = document.querySelector('link[rel="shortcut icon"]');

    favicon.setAttribute('href', '/assets/favicon/' + date + '.png');
  },
  toggableDarkMode() {
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

utils.tags().then(ver => utils.addScript(ver));

jtd.onReady(() => {
  //utils.toggableDarkMode();
  //utils.initialize();
  collapse.initialize();
});