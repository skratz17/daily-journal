/**
 * Get a string representing the current date in YYYY-MM-DD format.
 */
export const getTodayDateString = () => {
  const now = new Date(Date.now());
  return now.getFullYear() +
    '-' + padWithLeadingZeroesToTwoDigits(now.getMonth() + 1) +
    '-' + padWithLeadingZeroesToTwoDigits(now.getDate());
}

/**
 * Given a string value, pad it with leading zeroes until it is two digits in length
 * E.g.: 6 => 06, 12 => 12
 * If the string is longer than two characters, will return the last two characters of the string.
 * @param {String} value 
 */
const padWithLeadingZeroesToTwoDigits = value => ('00' + value).slice(-2);