const moodEmojis = ['👿', '🤬', '😡', '😭', '😕', '🙃', '🙂', '😀', '😁', '🤠'];
const DEFAULT_MOOD_VALUE = 6;

/**
 * Given a value, attempt to parse it as an integer and return the emoji corresponding to that integer index in the moodEmojis array.
 * @param {any} value Value to get emoji for
 */
export const getMoodEmoji = value => {
  value = parseInt(value);

  // verify that value is a number and is in the range of possible emojis
  if(isNaN(value)) return getDefaultMoodEmoji();
  if(value >= moodEmojis.length) value = moodEmojis.length - 1;
  if(value < 0) value = 0;

  return moodEmojis[value];
};

/**
 * Get the default mood emoji.
 */
export const getDefaultMoodEmoji = () => moodEmojis[DEFAULT_MOOD_VALUE];

/**
 * Get the integer mood value of the default mood emoji.
 */
export const getDefaultMoodValue = () => DEFAULT_MOOD_VALUE;

/**
 * Get the count of emojis in the moodEmojis array.
 */
export const getEmojisCount = () => moodEmojis.length;