export const timeRelativeGreeting = name => {
  let TIME_OF_DAY = '';
  let time = new Date().getHours();

  // if (time >= 5 && time < 12) {
  if (time >= 0 && time < 12) {
    TIME_OF_DAY = 'morning';
  } else if (time >= 12 && time < 17) {
    TIME_OF_DAY = 'afternoon';
    // } else if (time >= 17 || time < 5) {
  } else if (time >= 17) {
    TIME_OF_DAY = 'evening';
  }
  return `Good ${TIME_OF_DAY}${name ? ` ${name?.trim()}` : ``}`;

  return;
};

export function getOrdinal(number) {
  if (typeof number !== 'number') {
    return ''; // Return an empty string for invalid inputs
  }

  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  // Special cases for 11, 12, and 13, as they don't follow the usual pattern
  if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
    return number + 'th';
  }

  // Use the appropriate suffix based on the last digit
  const suffix = suffixes[lastDigit] || 'th';

  return number + suffix;
}
