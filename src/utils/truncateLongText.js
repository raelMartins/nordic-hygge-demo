export const truncateLongText = (txt, lens) => {
  const length = lens ?? 17;
  const textToTruncate = txt?.toString();

  return {
    truncatedText:
      textToTruncate?.length <= length ? textToTruncate : textToTruncate?.slice(0, length) + '...',
    originalText: textToTruncate,
    isTruncated: textToTruncate?.length > length,
  };
};

export const capitalizeTextFormat = str => {
  return str?.charAt(0).toUpperCase() + str?.toLowerCase().slice(1);
};

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
  return `Good ${TIME_OF_DAY}${name ? `, ${name?.trim()}` : ``}`;

  return;
};

export const pluralizeText = (text, count) => {
  return count === 1 ? text : `${text}s`;
};
