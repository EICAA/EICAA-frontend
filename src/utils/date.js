import { format, set, sub } from 'date-fns';

export const Formats = {
  Date: 'yyyy.MM.dd.',
  DateShort: 'MM.dd',
  Datetime: 'yyyy.MM.dd. HH:mm:ss',
};

export const getEarlierDate = (date, days, startAtMidnight = true) => {
  let earlier = sub(date, { days });

  if (startAtMidnight) {
    earlier = set(earlier, {
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
  return earlier;
};

export const getAsDatetime = (date) => {
  return format(date, Formats.Datetime);
};
