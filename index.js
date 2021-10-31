import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

export function getActualHours(periods = [], day) {
  if (isAlwaysOpen(periods)) {
    return [
      {
        open: '0000',
        close: '0000',
      },
    ];
  }

  return periods.reduce((hours, period) => {
    if (
      (
        // normal case: `day` is between `open` and `close`
        (day >= period.open.day && day <= period.close.day)
        || (
          // wrap-around case: period wraps past end of week, so `close` is before `open`
          period.close.day < period.open.day
          && (day >= period.open.day || day <= period.close.day)
        )
      )
      && !(
        // exclude period which ends at midnight, as it is actually from the day before
        day === period.close.day
        && period.close.time === '0000'
      )
    ) {
      hours.push({
        open: day === period.open.day ? period.open.time : '0000',
        close: day === period.close.day ? period.close.time : '0000',
      });
    }

    return hours;
  }, []).sort((a, b) => {
    const openA = dayjs(a.open, 'HHmm');
    const openB = dayjs(b.open, 'HHmm');

    if (openA.isBefore(openB)) {
      return -1;
    }

    if (openA.isAfter(openB)) {
      return 1;
    }

    return 0;
  });
}

export function getHours(periods = [], day) {
  if (isAlwaysOpen(periods)) {
    return [
      {
        open: '0000',
        close: '0000',
      },
    ];
  }

  return periods.reduce((hours, period) => {
    if (
      (
        // normal case: `day` is between `open` and `close`
        (day >= period.open.day && day <= period.close.day)
        || (
          // wrap-around case: period wraps past end of week, so `close` is before `open`
          period.close.day < period.open.day
          && (day >= period.open.day || day <= period.close.day)
        )
      )
      && !(
        // exclude period if it is the morning after, which is included in the day before
        day === period.close.day
        && period.open.day !== period.close.day
        && dayjs(period.close.time, 'HHmm').isBefore(dayjs('1200', 'HHmm'))
      )
    ) {
      hours.push({
        open: day === period.open.day ? period.open.time : '0000',
        close: (
          day === period.close.day
          || (
            // `close` time is the morning after
            dayjs().day(day).add(1, 'day').day() === period.close.day
            && dayjs(period.close.time, 'HHmm').isBefore(dayjs('1200', 'HHmm'))
          )
        ) ? period.close.time : '0000',
      });
    }

    return hours;
  }, []);
}

export function isAlwaysOpen(periods = []) {
  return (
    periods.length === 1
    && periods[0].open.day === 0
    && periods[0].open.time === '0000'
    && periods[0].close === undefined
  );
}

export function isOpen(periods = [], day) {
  return getHours(periods, day).length > 0;
}

export function isOpen24Hours(periods = [], day) {
  const hours = getHours(periods, day);

  return hours[0]?.open === '0000' && hours[0]?.close === '0000';
}
