const moodEmojis = ['👿', '🤬', '😡', '😭', '😕', '🙃', '🙂', '😀', '😁', '🤠'];
const DEFAULT_MOOD_VALUE = 6;

export const getMoodEmoji = value => {
  value = parseInt(value);

  // verify that value is a number and is in the range of possible emojis
  if(isNaN(value)) return getDefaultMoodEmoji();
  if(value > moodEmojis.length) value = moodEmojis.length - 1;
  if(value < 0) value = 0;

  return moodEmojis[value];
};

export const getDefaultMoodEmoji = () => moodEmojis[DEFAULT_MOOD_VALUE];
export const getDefaultMoodValue = () => DEFAULT_MOOD_VALUE;
export const getEmojisCount = () => moodEmojis.length;