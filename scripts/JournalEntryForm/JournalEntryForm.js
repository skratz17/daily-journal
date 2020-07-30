import { saveJournalEntry } from '../JournalEntry/JournalDataProvider.js';
import { getMoodEmoji, getDefaultMoodEmoji, getDefaultMoodValue, getEmojisCount } from '../utilities/moodEmojis.js';
import { getTodayDateString } from '../utilities/dateFormatting.js';

const eventHub = document.querySelector('.container');
const entryFormContentTarget = document.querySelector('.entry-form-container');

const render = () => {
  entryFormContentTarget.innerHTML = `
    <h2 class="entry-form__header">What Did You Do Today?</h2>
    <form id="entry-form" class="entry-form">
      <fieldset class="form-group">
        <label for="date" class="entry-form__label entry-form__date-label">Date</label>
        <input type="date" class="entry-form__date" id="date" name="date" value="${getTodayDateString()}">
      </fieldset>
      <div class="entry-form__concept-and-mood-wrapper">
        <fieldset class="form-group">
          <label for="concept" class="entry-form__label entry-form__concept-label">Concepts</label>
          <input type="text" class="entry-form__concept" id="concept" name="concept">
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

export const JournalEntryForm = () => {
  render();
};

/**
 * Event listener to update mood emoji rendered in form for mood input element.
 */
eventHub.addEventListener('input', event => {
  if(event.target.className === 'entry-form__mood') {
    const moodEmojiContentTarget = document.querySelector('.entry-form__mood-emoji');
    moodEmojiContentTarget.innerHTML = getMoodEmoji(event.target.value);
  }
});

/**
 * Event listener to save new journal entry on form submit.
 */
eventHub.addEventListener('submit', event => {
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

/**
 * Event listener to re-render empty and enabled form after successful entry save.
 */
eventHub.addEventListener('journalEntriesStateChanged', JournalEntryForm);