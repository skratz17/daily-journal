const DEFAULT_MOOD_VALUE = 6;

let moods = [];

export const getMoods = () => {
  return fetch('http://localhost:8088/moods')
    .then(res => res.json())
    .then(moodsData => moods = moodsData);
};

export const useMoods = () => moods.slice();

export const getMoodEmojiByValue = value => {
  value = parseInt(value);
  const foundMood = moods.find(mood => mood.value === value);
  return foundMood.label;
}

export const getDefaultMoodEmoji = () => {
  return moods.find(mood => mood.value === DEFAULT_MOOD_VALUE);
}

export const getDefaultMoodValue = () => DEFAULT_MOOD_VALUE

export const getMoodsCount = () => moods.length;