import { saveJournalEntry } from '../JournalEntry/JournalDataProvider.js';
import { getMoodEmoji, getDefaultMoodEmoji, getDefaultMoodValue, getEmojisCount } from '../utilities/moodEmojis.js';
import { getTodayDateString } from '../utilities/dateFormatting.js';

/**
 * Event listener to update mood emoji rendered in form for mood input element
 */
document.addEventListener('input', event => {
  if(event.target.className === 'entry-form__mood') {
    const moodEmoji = getMoodEmoji(event.target.value);
    document
      .querySelector('.entry-form__mood-emoji')
      .innerHTML = moodEmoji;
  }
});

/**
 * Event listener to save new journal entry on form submit
 */
document.addEventListener('submit', event => {
  if(event.target.id === 'entry-form') {
    event.preventDefault();

    const journalEntry = {};

    const { elements } = event.target;
    for(const element of elements) {
      element.disabled = true;

      if(element.nodeName.toLowerCase() !== 'button' && element.nodeName.toLowerCase() !== 'fieldset') {
        journalEntry[element.name] = element.value;
      }
    }

    saveJournalEntry(journalEntry);
  }
});

export const JournalEntryForm = () => {
  const domNode = document.querySelector('.entry-form-container');

  domNode.innerHTML = `
    <h2 class="entry-form__header">What Did You Do Today?</h2>
    <form id="entry-form" class="entry-form">
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
          <input type="range" class="entry-form__mood" id="mood" name="mood" value="${getDefaultMoodValue()}" min="0" max="${getEmojisCount() - 1}" step="1">
        </fieldset>
        <p class="entry-form__mood-emoji">${getDefaultMoodEmoji()}</p>
      </div>
      <fieldset class="form-group">
        <label for="entry" class="entry-form__label entry-form__entry-label">Journal Entry</label>
        <textarea class="entry-form__entry" name="entry" id="entry" cols="30" rows="10"></textarea>
      </fieldset>
      <button type="submit" class="entry-form__submit btn btn-green">Record Journal Entry</button>
    </form>
  `;
};