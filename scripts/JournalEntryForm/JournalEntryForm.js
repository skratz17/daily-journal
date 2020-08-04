import { JournalEntryFormHTML } from './JournalEntryFormHTML.js';
import { JournalEntryFormError } from './JournalEntryFormError.js';
import { getMoodEmoji } from '../utilities/moodEmojis.js';
import { validator } from './JournalEntryFormValidator.js';
import { saveJournalEntry, updateJournalEntry } from '../JournalEntry/JournalDataProvider.js';

const eventHub = document.querySelector('.container');
const entryFormDOMNode = document.querySelector('.entry-form-container');

export const JournalEntryForm = (journalEntry = false) => {
  entryFormDOMNode.innerHTML = JournalEntryFormHTML(journalEntry);
};

const getFormSelector = id => {
  let formSelector = '#entry-form';
  if(id) formSelector += `--${id}`;
  return formSelector;
};

/**
 * Factory function to create a journalEntry object from the current data in the form.
 */
const createJournalEntryObjectFromFormData = (id) => {
  const journalEntry = {};

  const { elements } = document.querySelector(getFormSelector(id));
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
const clearErrorMessages = id => {
  document
    .querySelectorAll(`${getFormSelector(id)} .entry-form__errors`)
    .forEach(errorMessageNode => errorMessageNode.innerHTML = '');
};

/**
 * Render validation errors to the DOM.
 * @param {Array} errors Array of error objects from the Validator.
 */
const renderErrors = (errors, id) => {
  clearErrorMessages(id);

  errors.forEach(error => {
    const errorMessageNode = document.querySelector(`${getFormSelector(id)} .entry-form__${error.propertyName}-errors`);
    errorMessageNode.innerHTML += JournalEntryFormError(error.errorMessage);
  });
};

/**
 * Set the disabled attribute for each input in the form to true.
 */
const disableForm = id => {
  for(const element of document.querySelector(getFormSelector(id)).elements) {
    element.disabled = true;
  }
};

/**
 * Event listener to update mood emoji rendered in form for mood input element.
 */
eventHub.addEventListener('input', event => {
  if(event.target.className === 'entry-form__mood') {
    const id = event.target.id.split('--')[1];
    const moodEmojiContentTarget = document.querySelector(`#entry-form__mood-emoji${id ? `--${id}` : ''}`);
    moodEmojiContentTarget.innerHTML = getMoodEmoji(event.target.value);
  }
});

/**
 * Event listener to save new journal entry on form submit.
 * Only saves if the journalEntry object passes all validation tests, renders errors to DOM if errors detected in object.
 */
eventHub.addEventListener('submit', event => {
  if(event.target.getAttribute('id').startsWith('entry-form')) {
    event.preventDefault();

    const id = event.target.getAttribute('id').split('--')[1];

    const journalEntry = createJournalEntryObjectFromFormData(id);

    const errors = validator.validate(journalEntry);

    renderErrors(errors, id);

    if(errors.length === 0) {
      disableForm(id);

      if(id) {
        updateJournalEntry(journalEntry);
      }
      else {
        saveJournalEntry(journalEntry);
      }
    }
  }
});

/**
 * Event listener to re-render empty and enabled form after successful entry save.
 */
eventHub.addEventListener('journalEntriesStateChanged', () => JournalEntryForm());