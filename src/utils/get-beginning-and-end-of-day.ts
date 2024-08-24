import { DateTime } from 'luxon';

export function getBeginningAndEndOfDay(date: string) {
  const jsDate = new Date(date);
  const luxonDate = DateTime.fromJSDate(jsDate);

  return {
    beginningOfDay: luxonDate.startOf('day').toISO(),
    endOfDay: luxonDate.endOf('day').toISO(),
  };
}
