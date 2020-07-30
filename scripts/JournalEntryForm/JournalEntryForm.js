import { JournalEntryFormError } from './JournalEntryFormError.js';
import { JournalEntryFormValidator } from './JournalEntryFormValidator.js';
import { saveJournalEntry } from '../JournalEntry/JournalDataProvider.js';
import { getMoodEmoji, getDefaultMoodEmoji, getDefaultMoodValue, getEmojisCount } from '../utilities/moodEmojis.js';
import { getTodayDateString } from '../utilities/dateFormatting.js';

const eventHub = document.querySelector('.container');
const entryFormDOMNode = document.querySelector('#entry-form');

const validator = new JournalEntryFormValidator();

// will hold reference to DOM node containing mood emoji in form
let moodEmojiContentTarget;

const defaults = {
  date: getTodayDateString(),
  concept: '',
  mood: getDefaultMoodValue(),
  entry: '' 
};

const render = () => {
  entryFormDOMNode.innerHTML = `
    <h2 class="entry-form__header">What Did You Do Today?</h2>
    <fieldset class="form-group">
      <ul class="entry-form__errors entry-form__date-errors"></ul>
      <label for="date" class="entry-form__label entry-form__date-label">Date</label>
      <input type="date" class="entry-form__date" id="date" name="date" value="${defaults.date}">
    </fieldset>
    <div class="entry-form__concept-and-mood-wrapper">
      <fieldset class="form-group">
        <ul class="entry-form__errors entry-form__concept-errors"></ul>
        <label for="concept" class="entry-form__label entry-form__concept-label">Concepts</label>
        <input type="text" class="entry-form__concept" id="concept" name="concept" value=${defaults.concept}>
      </fieldset>
      <fieldset class="form-group">
        <ul class="entry-form__errors entry-form__mood-errors"></ul>
        <label for="mood" class="entry-form__label entry-form__mood-label">Mood</label>
        <input type="range" class="entry-form__mood" id="mood" name="mood" value="${defaults.mood}" min="0" max="${getEmojisCount() - 1}" step="1">
      </fieldset>
      <div class="entry-form__mood-emoji">${getDefaultMoodEmoji()}</div>
    </div>
    <fieldset class="form-group">
      <ul class="entry-form__errors entry-form__entry-errors"></ul>
      <label for="entry" class="entry-form__label entry-form__entry-label">Journal Entry</label>
      <textarea class="entry-form__entry" name="entry" id="entry" cols="30" rows="10" value=${defaults.entry}></textarea>
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
}

/**
 * Render validation errors to the DOM.
 * @param {Object} errors Object of the form { name of input: [array of error messages for that input] }
 */
const renderErrors = errors => {
  Object.keys(errors).forEach(fieldName => {
    const errorMessageNode = document.querySelector(`.entry-form__${fieldName}-errors`);
    errorMessageNode.innerHTML = errors[fieldName].map(JournalEntryFormError).join('');
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
 * Reset entry form to default values for each input, re-enable inputs, and reset displayed mood emoji to its default.
 */
const resetEntryForm = () => {
  const { elements } = entryFormDOMNode;
  for(const element of elements) {
    element.disabled = false;
    element.value = defaults[element.name];
  }

  moodEmojiContentTarget.innerHTML = getDefaultMoodEmoji();
}

/**
 * Event listener to update mood emoji rendered in form for mood input element.
 */
eventHub.addEventListener('input', event => {

  // grab reference to (dynamically created) mood emoji container if not already grabbed. this should only happen once, but should happen here b/c we can only be sure of its existence on the DOM once this runs.
  if(!moodEmojiContentTarget) {
    moodEmojiContentTarget = document.querySelector('.entry-form__mood-emoji');
  }

  if(event.target.className === 'entry-form__mood') {
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

    const isValid = validator.validate(journalEntry);

    renderErrors(validator.getErrors());

    if(isValid) {
      disableForm();
      saveJournalEntry(journalEntry);
    }
  }
});

/**
 * Event listener to re-render empty and enabled form after successful entry save.
 */
eventHub.addEventListener('journalEntriesStateChanged', resetEntryForm);