const DEFAULT_MOOD_VALUE = 6;

let moods = [];

export const getMoods = () => {
  return fetch('http://localhost:8088/moods')
    .then(res => res.json())
    .then(moodsData => moods = moodsData);
};

export const useMoods = () => moods.slice();

export const useMoodByValue = value => {
  value = parseInt(value);
  return moods.find(mood => mood.value === value);
};

export const useMoodById = id => {
  id = parseInt(id);
  return moods.find(mood => mood.id === id);
};

export const getDefaultMoodEmoji = () => {
  return moods.find(mood => mood.value === DEFAULT_MOOD_VALUE);
};

export const getDefaultMoodValue = () => DEFAULT_MOOD_VALUE;

export const getMoodsCount = () => moods.length;