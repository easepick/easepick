export class DateTime extends Date {
  public static parseDateTime(
    date: unknown,
    format = 'YYYY-MM-DD',
    lang = 'en-US'): Date {
    if (!date) return new Date(new Date().setHours(0, 0, 0, 0));

    if (date instanceof DateTime) return date.toJSDate();
    if (date instanceof Date) return date;

    if (/^-?\d{10,}$/.test(String(date))) {
      return new Date(Number(date));
    }

    if (typeof date === 'string') {
      const matches = [];
      let m = null;

      while ((m = DateTime.regex.exec(format)) != null) {
        if (m[1] === '\\') continue; // delete when regexp lookbehind

        matches.push(m);
      }

      if (matches.length) {
        const datePattern = {
          year: null,
          month: null,
          shortMonth: null,
          longMonth: null,
          day: null,
          hour: 0,
          minute: 0,
          second: 0,
          ampm: null,
          value: '',
        };

        if (matches[0].index > 0) {
          datePattern.value += '.*?';
        }

        for (const [k, match] of Object.entries(matches)) {
          const key = Number(k);

          const { group, pattern } = DateTime.formatPatterns(match[0], lang);

          datePattern[group] = key + 1;
          datePattern.value += pattern;

          datePattern.value += '.*?'; // any delimiters
        }

        const dateRegex = new RegExp(`^${datePattern.value}$`);

        if (dateRegex.test(date)) {
          const d = dateRegex.exec(date);

          const year = Number(d[datePattern.year]);
          let month = null;

          if (datePattern.month) {
            month = Number(d[datePattern.month]) - 1;
          } else if (datePattern.shortMonth) {
            month = DateTime.shortMonths(lang).indexOf(d[datePattern.shortMonth]);
          } else if (datePattern.longMonth) {
            month = DateTime.longMonths(lang).indexOf(d[datePattern.longMonth]);
          }

          const day = Number(d[datePattern.day]) || 1;

          const h = Number(d[datePattern.hour]);
          let hours = !Number.isNaN(h) ? h : 0;

          const m = Number(d[datePattern.minute]);
          const minutes = !Number.isNaN(m) ? m : 0;

          const s = Number(d[datePattern.second]);
          const seconds = !Number.isNaN(s) ? s : 0;

          const ampm = d[datePattern.ampm];
          if (ampm && ampm === 'PM') {
            hours += 12;

            if (hours === 24) {
              hours = 0;
            }
          }

          return new Date(year, month, day, hours, minutes, seconds, 0);
        }
      }
    }

    return new Date(new Date().setHours(0, 0, 0, 0));
  }

  // @TODO
  // replace to regexp lookbehind when Safari support
  // https://caniuse.com/#feat=js-regexp-lookbehind
  // /(?<!\\)(Y{2,4}|M{1,4}|D{1,2}|H{1,2}|m{1,2}|s{1,2}])/g
  private static regex = /(\\)?(Y{2,4}|M{1,4}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|A|a)/g;

  private static readonly MONTH_JS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  private static shortMonths(lang): string[] {
    return DateTime.MONTH_JS
      .map(x => new Date(2019, x).toLocaleString(lang, { month: 'short' }));
  }

  private static longMonths(lang): string[] {
    return DateTime.MONTH_JS
      .map(x => new Date(2019, x).toLocaleString(lang, { month: 'long' }));
  }

  /**
   * Returns group and pattern for match function
   * 
   * @param token 
   * @param lang 
   * @returns { group, pattern }
   */
  private static formatPatterns(token: string, lang: string) {
    switch (token) {
      case 'YY':
      case 'YYYY':
        return {
          group: 'year',
          pattern: `(\\d{${token.length}})`,
        };

      case 'M':
        return {
          group: 'month',
          pattern: '(\\d{1,2})',
        };

      case 'MM':
        return {
          group: 'month',
          pattern: '(\\d{2})',
        };

      case 'MMM':
        return {
          group: 'shortMonth',
          pattern: `(${DateTime.shortMonths(lang).join('|')})`,
        };

      case 'MMMM':
        return {
          group: 'longMonth',
          pattern: `(${DateTime.longMonths(lang).join('|')})`,
        };

      case 'D':
        return {
          group: 'day',
          pattern: '(\\d{1,2})',
        };

      case 'DD':
        return {
          group: 'day',
          pattern: '(\\d{2})',
        };

      case 'h':
      case 'H':
        return {
          group: 'hour',
          pattern: '(\\d{1,2})',
        };

      case 'hh':
      case 'HH':
        return {
          group: 'hour',
          pattern: '(\\d{2})',
        };

      case 'm':
        return {
          group: 'minute',
          pattern: '(\\d{1,2})',
        };

      case 'mm':
        return {
          group: 'minute',
          pattern: '(\\d{2})',
        };

      case 's':
        return {
          group: 'second',
          pattern: '(\\d{1,2})',
        };

      case 'ss':
        return {
          group: 'second',
          pattern: '(\\d{2})',
        };

      case 'a':
      case 'A':
        return {
          group: 'ampm',
          pattern: '(AM|PM|am|pm)',
        };
    }
  }

  protected lang: string;

  constructor(
    date: unknown = null,
    format = 'YYYY-MM-DD',
    lang = 'en-US') {
    super(DateTime.parseDateTime(date, format, lang));

    this.lang = lang;
  }

  /**
   * Returns the week number
   * 
   * @param firstDay 
   * @returns Number
   */
  public getWeek(firstDay: number): number {
    const target = new Date(this.midnight_ts(this));
    const dayNr = (this.getDay() + (7 - firstDay)) % 7;
    target.setDate(target.getDate() - dayNr);
    const startWeekday = target.getTime();
    target.setMonth(0, 1);
    if (target.getDay() !== firstDay) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((startWeekday - target.getTime()) / 604800000);
  }

  /**
   * Duplicate the date
   * 
   * @returns DateTime
   */
  public clone(): DateTime {
    return new DateTime(this);
  }

  /**
   * Convert DateTime to Date object
   * 
   * @returns Date
   */
  public toJSDate(): Date {
    return new Date(this);
  }

  /**
   * Find DateTime object (this) in passed DateTime array
   * 
   * @param array 
   * @param inclusivity 
   * @returns Boolean
   */
  public inArray(
    array: Array<DateTime | DateTime[]>,
    inclusivity = '[]',
  ): boolean {
    return array.some((d: DateTime | DateTime[]) => {
      if (d instanceof Array) {
        return this.isBetween(d[0], d[1], inclusivity);
      }

      return this.isSame(d, 'day');
    });
  }

  /**
   * Check if a DateTime is between two other DateTime, optionally looking at unit scale
   * 
   * @param date1 
   * @param date2 
   * @param inclusivity 
   * @returns Boolean
   */
  public isBetween(date1: DateTime, date2: DateTime, inclusivity = '()'): boolean {
    switch (inclusivity) {
      default:
      case '()':
        return this.midnight_ts(this) > this.midnight_ts(date1)
          && this.midnight_ts(this) < this.midnight_ts(date2);

      case '[)':
        return this.midnight_ts(this) >= this.midnight_ts(date1)
          && this.midnight_ts(this) < this.midnight_ts(date2);

      case '(]':
        return this.midnight_ts(this) > this.midnight_ts(date1)
          && this.midnight_ts(this) <= this.midnight_ts(date2);

      case '[]':
        return this.midnight_ts() >= this.midnight_ts(date1)
          && this.midnight_ts() <= this.midnight_ts(date2);
    }
  }

  /**
   * Check if a DateTime is before another DateTime.
   * 
   * @param date 
   * @param unit 
   * @returns Boolean
   */
  public isBefore(date: DateTime, unit = 'days'): boolean {
    switch (unit) {
      case 'day':
      case 'days':
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
          > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(date.getFullYear(), date.getMonth(), 1).getTime()
          > new Date(this.getFullYear(), this.getMonth(), 1).getTime();

      case 'year':
      case 'years':
        return date.getFullYear() > this.getFullYear();
    }

    throw new Error('isBefore: Invalid unit!');
  }

  /**
   * Check if a DateTime is before or the same as another DateTime.
   * 
   * @param date 
   * @param unit 
   * @returns Boolean
   */
  public isSameOrBefore(date: DateTime, unit = 'days'): boolean {
    switch (unit) {
      case 'day':
      case 'days':
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
          >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(date.getFullYear(), date.getMonth(), 1).getTime()
          >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
    }

    throw new Error('isSameOrBefore: Invalid unit!');
  }

  /**
   * Check if a DateTime is after another DateTime.
   * 
   * @param date 
   * @param unit 
   * @returns Boolean
   */
  public isAfter(date: DateTime, unit = 'days'): boolean {
    switch (unit) {
      case 'day':
      case 'days':
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
          > new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
          > new Date(date.getFullYear(), date.getMonth(), 1).getTime();

      case 'year':
      case 'years':
        return this.getFullYear() > date.getFullYear();
    }

    throw new Error('isAfter: Invalid unit!');
  }

  /**
   * Check if a DateTime is after or the same as another DateTime.
   * 
   * @param date 
   * @param unit 
   * @returns Boolean
   */
  public isSameOrAfter(date: DateTime, unit = 'days'): boolean {
    switch (unit) {
      case 'day':
      case 'days':
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
          >= new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
          >= new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    }

    throw new Error('isSameOrAfter: Invalid unit!');
  }

  /**
   * Check if a DateTime is the same as another DateTime.
   * 
   * @param date 
   * @param unit 
   * @returns Boolean
   */
  public isSame(date: DateTime, unit = 'days'): boolean {
    switch (unit) {
      case 'day':
      case 'days':
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime()
          === new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

      case 'month':
      case 'months':
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime()
          === new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    }

    throw new Error('isSame: Invalid unit!');
  }

  /**
   * Mutates the original DateTime by adding time.
   * 
   * @param duration 
   * @param unit 
   */
  public add(duration: number, unit = 'days'): DateTime {
    switch (unit) {
      case 'day':
      case 'days':
        this.setDate(this.getDate() + duration);
        break;

      case 'month':
      case 'months':
        this.setDate(1);
        this.setMonth(this.getMonth() + duration);
        break;
    }

    return this;
  }

  /**
   * Mutates the original DateTime by subtracting time.
   * 
   * @param duration 
   * @param unit 
   */
  public subtract(duration: number, unit = 'days'): DateTime {
    switch (unit) {
      case 'day':
      case 'days':
        this.setDate(this.getDate() - duration);
        break;

      case 'month':
      case 'months':
        this.setDate(1);
        this.setMonth(this.getMonth() - duration);
        break;
    }

    return this;
  }

  /**
   * Returns diff between two DateTime
   * 
   * @param date 
   * @param unit 
   * @returns Number
   */
  public diff(date: DateTime, unit = 'days'): number {
    const oneDay = 1000 * 60 * 60 * 24;

    switch (unit) {
      default:
      case 'day':
      case 'days':
        return Math.round((this.midnight_ts() - this.midnight_ts(date)) / oneDay);

      case 'month':
      case 'months':
        // eslint-disable-next-line no-case-declarations
        let months = (date.getFullYear() - this.getFullYear()) * 12;
        months -= date.getMonth();
        months += this.getMonth();
        return months;
    }
  }

  /**
   * Format output
   * 
   * @param format 
   * @param lang 
   * @returns String
   */
  public format(format: string, lang = 'en-US'): string {
    let response = '';

    const matches = [];
    let m = null;

    while ((m = DateTime.regex.exec(format)) != null) {
      if (m[1] === '\\') continue; // delete when regexp lookbehind

      matches.push(m);
    }

    if (matches.length) {
      // add start line of tokens are not at the beginning
      if (matches[0].index > 0) {
        response += format.substring(0, matches[0].index);
      }

      for (const [k, match] of Object.entries(matches)) {
        const key = Number(k);
        response += this.formatTokens(match[0], lang);

        if (matches[key + 1]) {
          response += format.substring(match.index + match[0].length, matches[key + 1].index);
        }

        // add end line if tokens are not at the ending
        if (key === matches.length - 1) {
          response += format.substring(match.index + match[0].length);
        }
      }
    }

    // remove escape characters
    return response.replace(/\\/g, '');
  }

  /**
   * Returns the midnight timestamp of a date
   * 
   * @param date 
   * @returns Date
   */
  private midnight_ts(date?: Date): number {
    if (date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime();
    }

    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
  }

  /**
   * Returns the formatted string of the passed token
   * 
   * @param token 
   * @param lang 
   * @returns String
   */
  private formatTokens(token: string, lang: string) {
    switch (token) {
      case 'YY': return String(this.getFullYear()).slice(-2);
      case 'YYYY': return String(this.getFullYear());

      case 'M': return String(this.getMonth() + 1);
      case 'MM': return `0${this.getMonth() + 1}`.slice(-2);
      case 'MMM': return DateTime.shortMonths(lang)[this.getMonth()];
      case 'MMMM': return DateTime.longMonths(lang)[this.getMonth()];

      case 'D': return String(this.getDate());
      case 'DD': return `0${this.getDate()}`.slice(-2);

      case 'H': return String(this.getHours());
      case 'HH': return `0${this.getHours()}`.slice(-2);

      case 'h': return String(this.getHours() % 12 || 12);
      case 'hh':
        // eslint-disable-next-line no-case-declarations
        const h = this.getHours() % 12 || 12;
        return `0${h}`.slice(-2);

      case 'm': return String(this.getMinutes());
      case 'mm': return `0${this.getMinutes()}`.slice(-2);

      case 's': return String(this.getSeconds());
      case 'ss': return `0${this.getSeconds()}`.slice(-2);

      case 'a': return (this.getHours() < 12 || this.getHours() === 24) ? 'am' : 'pm';
      case 'A': return (this.getHours() < 12 || this.getHours() === 24) ? 'AM' : 'PM';

      default: return '';
    }
  }

}
