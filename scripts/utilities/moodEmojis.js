const moodEmojis = ['👿', '🤬', '😡', '😭', '😕', '🙃', '🙂', '😀', '😁', '🤠'];

export const getMoodEmoji = value => {
  value = parseInt(value);
  if(isNaN(value)) return moodEmojis[6];
  return moodEmojis[value];
};