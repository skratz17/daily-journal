const moodEmojis = ['👿', '🤬', '😡', '😭', '😕', '🙃', '🙂', '😀', '😁', '🤠'];
const DEFAULT_MOOD_VALUE = 6;

export const getMoodEmoji = value => {
  value = parseInt(value);
  if(isNaN(value)) return getDefaultMoodEmoji();
  return moodEmojis[value];
};

export const getDefaultMoodEmoji = () => moodEmojis[DEFAULT_MOOD_VALUE];
export const getDefaultMoodValue = () => DEFAULT_MOOD_VALUE;