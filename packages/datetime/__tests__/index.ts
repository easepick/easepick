import { DateTime } from '../src/index';

// 23 Nov, 2019 - repository creation date
const date = new DateTime(new Date(2019, 10, 23, 0, 0, 0, 0));
const dateRange = [
  ['2019-11-20', '2019-11-24']
].map(x => {
  if (x instanceof Array) {
    const start = new DateTime(x[0]);
    const end = new DateTime(x[1]);

    return [start, end];
  }

  return new DateTime(x);
});


test('instance', () => {
  const d = new DateTime();

  expect(d instanceof DateTime && !isNaN(d.getTime())).toBe(true);
});

test('clone', () => {
  const d = date.clone();

  expect(d && !isNaN(d.getTime())).toBe(true);
});

test('toJSDate', () => {
  const d = date.toJSDate();

  expect(d instanceof Date).toBe(true);
});

test('add', () => {
  const d = date.clone();
  const tomorrow = date.clone().add(1, 'day');
  const nextMonth = date.clone().add(1, 'month');

  d.setDate(d.getDate() + 1);
  d.setMonth(d.getMonth() + 1);
  expect(d.getDate() === tomorrow.getDate()).toBe(true);
  expect(d.getMonth() === nextMonth.getMonth()).toBe(true);
});

test('subtract', () => {
  const d = date.clone();
  const yesterday = date.clone().subtract(1, 'day');
  const prevMonth = date.clone().subtract(1, 'month');

  d.setDate(d.getDate() - 1);
  d.setMonth(d.getMonth() - 1);
  expect(d.getDate() === yesterday.getDate()).toBe(true);
  expect(d.getMonth() === prevMonth.getMonth()).toBe(true);
});

test('isBetween', () => {
  const start = date.clone().subtract(3, 'day');
  const end = date.clone().add(1, 'day');

  expect(date.isBetween(start, end)).toBe(true);
  expect(start.isBetween(start, end)).toBe(false);
  expect(end.isBetween(start, end)).toBe(false);
  expect(start.isBetween(start, end, '[)')).toBe(true);
  expect(end.isBetween(start, end, '(]')).toBe(true);
});

test('isBefore', () => {
  const d = date.clone().subtract(1, 'day');

  expect(d.isBefore(date)).toBe(true);
});

test('isSameOrBefore', () => {
  const d = date.clone();

  expect(d.isSameOrBefore(date)).toBe(true);
});

test('isAfter', () => {
  const d = date.clone().add(1, 'day');

  expect(d.isAfter(date)).toBe(true);
});

test('isSameOrAfter', () => {
  const d = date.clone();

  expect(d.isSameOrAfter(date)).toBe(true);
});

test('isSame', () => {
  const d = date.clone();

  expect(d.isSame(date)).toBe(true);
});

test('diff', () => {
  const d = date.clone().subtract(1, 'day');

  expect(date.diff(d) === 1).toBe(true);
});

test('format', () => {
  const d = date.clone();

  expect(d.format('D MMM YYYY') === '23 Nov 2019').toBe(true);
});

test('inArray', () => {
  const d = date.clone();

  expect(d.inArray(dateRange)).toBe(true);
});