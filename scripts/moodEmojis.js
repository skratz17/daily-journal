const moodEmojis = ['👿', '🤬', '😡', '😭', '😕', '🙃', '🙂', '😀', '😁', '🤠'];

export const getMoodEmoji = value => {
  value = parseInt(value);
  if(isNaN(value)) return moodEmojis[5];
  return moodEmojis[value];
};