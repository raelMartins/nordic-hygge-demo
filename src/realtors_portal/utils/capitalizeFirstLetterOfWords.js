const capitalizeFirstLetterOfWords = str => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
};

export default capitalizeFirstLetterOfWords;
