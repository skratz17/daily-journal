import { getMoodEmoji, getDefaultMoodEmoji, getDefaultMoodValue } from '../utilities/moodEmojis.js';

document.addEventListener('input', event => {
  if(event.target.className === 'entry-form__mood') {
    const moodEmoji = getMoodEmoji(event.target.value);
    document
      .querySelector('.entry-form__mood-emoji')
      .innerHTML = moodEmoji;
  }
});

export const JournalEntryForm = () => {
  const domNode = document.querySelector('.entry-form');

  domNode.innerHTML = `
    <h2 class="entry-form__header">What Did You Do Today?</h2>
    <form class="entry-form__form">
      <fieldset class="form-group">
        <label for="date" class="entry-form__label entry-form__date-label">Date</label>
        <input type="date" class="entry-form__date" id="date" name="date" value="${getTodayDateString()}">
      </fieldset>
      <div class="entry-form__concepts-and-mood-wrapper">
        <fieldset class="form-group">
          <label for="concepts" class="entry-form__label entry-form__concepts-label">Concepts</label>
          <input type="text" class="entry-form__concepts" id="concepts" name="concepts">
        </fieldset>
        <fieldset class="form-group">
          <label for="mood" class="entry-form__label entry-form__mood-label">Mood</label>
          <input type="range" class="entry-form__mood" id="mood" name="mood" vmin="0" max="9" step="1">
        </fieldset>
        <p class="entry-form__mood-emoji">${getDefaultMoodEmoji()}</p>
      </div>
      <fieldset class="form-group">
        <label for="entry" class="entry-form__label entry-form__entry-label">Journal Entry</label>
        <textarea class="entry-form__entry" name="entry" id="entry" cols="30" rows="10"></textarea>
      </fieldset>
      <input type="submit" class="entry-form__submit btn btn-green" value="Record Journal Entry">
    </form>
  `;
};

/**
 * Get a string representing the current date in YYYY-MM-DD format.
 */
const getTodayDateString = () => {
  const now = new Date(Date.now());
  return now.getFullYear() +
    '-' + padWithLeadingZeroesToTwoDigits(now.getMonth() + 1) +
    '-' + padWithLeadingZeroesToTwoDigits(now.getDate());
}

/**
 * Given a string value, pad it with leading zeroes until it is two digits in length
 * E.g.: 6 => 06, 12 => 12
 * @param {String} value 
 */
const padWithLeadingZeroesToTwoDigits = value => ('0' + value).slice(-2);