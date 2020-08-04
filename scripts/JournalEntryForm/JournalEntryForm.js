import { JournalEntryFormHTML } from './JournalEntryFormHTML.js';
import { getMoodEmoji } from '../utilities/moodEmojis.js';
import { validator } from './JournalEntryFormValidator.js';
import { JournalEntryFormError } from './JournalEntryFormError.js';
import { saveJournalEntry } from '../JournalEntry/JournalDataProvider.js';

const eventHub = document.querySelector('.container');
const entryFormDOMNode = document.querySelector('#entry-form');

export const JournalEntryForm = () => {
  entryFormDOMNode.innerHTML = JournalEntryFormHTML();
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
eventHub.addEventListener('journalEntriesStateChanged', JournalEntryForm);