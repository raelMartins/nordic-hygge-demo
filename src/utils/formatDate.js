import moment from 'moment';

export const formatDate = date => {
  return new Date(date).toDateString().slice(3, -5);
};

export const formatDateToString = date => {
  return new Date(date).toDateString().slice(3);
};

export const changeDateFormat = (string, extra) => {
  try {
    const date = new Date(string);

    if (!string) {
      throw new Error('invalid date format');
    }
    let options = {
      month: 'short',
      year: 'numeric',
    };

    const formattedDay = nosuffix => {
      const day = date.getDate();
      if (nosuffix) {
        return day;
      }

      const suffix = day > 3 && day < 21 ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1] || 'th';
      return day + suffix;
    };

    if (extra === 'add_time') {
      options = {
        ...options,
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
    }
    if (extra === 'full_month') {
      options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'long',
      };
    }
    if (extra === 'm/d') {
      options = {month: 'short'};
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const formattedDate = formatter.format(date);

      const finalFormattedDate = formattedDate + ' ' + formattedDay(true);
      return finalFormattedDate;
    }
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter?.format(date);

    if (extra === 'm&y') {
      return formattedDate;
    }

    let finalFormattedDate = formattedDay() + ' ' + formattedDate.replace(' ', ', ');

    if (extra === 'add_time') {
      finalFormattedDate = finalFormattedDate.replace(/,(?=[^,]*$)/, ' | ');
    }

    return finalFormattedDate;
  } catch (err) {
    return '-';
  }
};

/* For this date format: June 2nd 2023 */

export const monthDayYear = date => {
  return moment(date).format('MMMM Do YYYY');
};

/* For this time format: 11:47AM  */

export const hourMinute = date => {
  return moment(date).format('h:mmA');
};

/* For this date format: 15-06-2023  */

export const dayMonthYear = date => {
  return moment(date).format('DD-MM-YYYY');
};

/* For dates like this 2023-02-17 */

export const reversedDayMonthYear = dateString => {
  // Parse the input date string using moment
  const parsedDate = moment(dateString);

  // Format the date in the desired format
  const formattedDate = parsedDate.format('YYYY-MM-DD');

  return formattedDate;
};

/* For this date format: 15-06-2023  12:30 */

export const dayMonthYearWithTime = date => {
  return moment(date).format('DD-MM-YYYY HH:mm');
};

/* For time like this 15-06-2023 09:27:04 plus 1 hour added to its time */

export const addOneHour = date => {
  return moment(date).add(1, 'hours').format('DD-MM-YYYY h:mmA');
};

export const addOneNoDate = date => {
  return moment(date).add(1, 'hours').format('h:mmA');
};

/* For this time format: 11:47AM  plus 1 hour added to its time */

export const addOneHourToTime = date => {
  return moment(date).add(1, 'hours').format('h:mmA');
};

/* For dates like this Jul 20, 2023 | 08:30 AM */

export const demarcatedDateTime = date => {
  return moment(date).format('MMM DD, YYYY | hh:mm A');
};

export function formatTimestamp(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const timeDifference = now - date;
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return 'Just now';
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
}

/* Date for past continuous */

export const pastContinuous = dateTimeString => {
  const now = moment();
  const inputDate = moment(dateTimeString);

  // If the date is today
  if (now.isSame(inputDate, 'day')) {
    return inputDate.format('HH:mm A');
  }

  // If the date was yesterday
  if (now.isSame(inputDate.clone().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }

  // If the date was the day before yesterday
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const inputDayOfWeek = inputDate.format('dddd');
  const daysAgo = now.diff(inputDate, 'days');

  if (daysAgo <= 4 && daysOfWeek.includes(inputDayOfWeek)) {
    return inputDayOfWeek;
  }

  // If the date is older than those 4 days
  return inputDate.format('DD/MM/YYYY');
};

export const formatPaymentPlanInMonthsString = months => {
  return `${months} month${parseInt(months) === 1 ? `` : `s`} plan`;
};
