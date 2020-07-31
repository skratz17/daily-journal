import { getTodayDateString } from '../utilities/dateFormatting.js';
import { getMoodEmoji, getDefaultMoodEmoji, getDefaultMoodValue, getEmojisCount } from '../utilities/moodEmojis.js';
import { validator } from './JournalEntryFormValidator.js';
import { JournalEntryFormError } from './JournalEntryFormError.js';
import { saveJournalEntry } from '../JournalEntry/JournalDataProvider.js';

const eventHub = document.querySelector('.container');
const entryFormDOMNode = document.querySelector('#entry-form');

const render = () => {
  entryFormDOMNode.innerHTML = `
    <h2 class="entry-form__header">What Did You Do Today?</h2>
    <fieldset class="form-group">
      <label for="date" class="entry-form__label entry-form__date-label">Date</label>
      <ul class="entry-form__errors entry-form__date-errors"></ul>
      <input required type="date" class="entry-form__date" id="date" name="date" value="${getTodayDateString()}">
    </fieldset>
    <div class="entry-form__concept-and-mood-wrapper">
      <fieldset class="form-group">
        <label for="concept" class="entry-form__label entry-form__concept-label">Concepts</label>
        <ul class="entry-form__errors entry-form__concept-errors"></ul>
        <input type="text" class="entry-form__concept" id="concept" name="concept">
      </fieldset>
      <fieldset class="form-group">
        <label for="mood" class="entry-form__label entry-form__mood-label">Mood</label>
        <ul class="entry-form__errors entry-form__mood-errors"></ul>
        <input type="range" class="entry-form__mood" id="mood" name="mood" value="${getDefaultMoodValue()}" min="0" max="${getEmojisCount() - 1}" step="1">
      </fieldset>
      <div class="entry-form__mood-emoji">${getDefaultMoodEmoji()}</div>
    </div>
    <fieldset class="form-group">
      <label for="entry" class="entry-form__label entry-form__entry-label">Journal Entry</label>
      <ul class="entry-form__errors entry-form__entry-errors"></ul>
      <textarea class="entry-form__entry" name="entry" id="entry" cols="30" rows="10"></textarea>
    </fieldset>
    <button type="submit" class="entry-form__submit btn btn-green">Record Journal Entry</button>
  `;
};

export const JournalEntryForm = () => {
  render();
};

/**
 * Factory function to create a journalEntry object from the current data in the form.
 */
const createJournalEntryObjectFromFormData = () => {
  const journalEntry = {};

  const { elements } = entryFormDOMNode;
  for(const element of elements) {
    if(element.nodeName.toLowerCase() !== 'button' && element.nodeName.toLowerCase() !== 'fieldset') {
      journalEntry[element.name] = element.value;
    }
  }

  return journalEntry;
};

/**
 * Clear out all error messages from the DOM
 */
const clearErrorMessages = () => {
  document
    .querySelectorAll('.entry-form__errors')
    .forEach(errorMessageNode => errorMessageNode.innerHTML = '');
};

/**
 * Render validation errors to the DOM.
 * @param {Array} errors Array of error objects from the Validator.
 */
const renderErrors = errors => {
  clearErrorMessages();

  errors.forEach(error => {
    const errorMessageNode = document.querySelector(`.entry-form__${error.propertyName}-errors`);
    errorMessageNode.innerHTML += JournalEntryFormError(error.errorMessage);
  });
};

/**
 * Set the disabled attribute for each input in the form to true.
 */
const disableForm = () => {
  for(const element of entryFormDOMNode.elements) {
    element.disabled = true;
  }
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
 * Only saves if the journalEntry object passes all validation tests, renders errors to DOM if errors detected in object.
 */
eventHub.addEventListener('submit', event => {
  if(event.target.id === 'entry-form') {
    event.preventDefault();

    const journalEntry = createJournalEntryObjectFromFormData();

    const errors = validator.validate(journalEntry);

    renderErrors(errors);

    if(errors.length === 0) {
      disableForm();
      saveJournalEntry(journalEntry);
    }
  }
});

/**
 * Event listener to re-render empty and enabled form after successful entry save.
 */
eventHub.addEventListener('journalEntriesStateChanged', render);