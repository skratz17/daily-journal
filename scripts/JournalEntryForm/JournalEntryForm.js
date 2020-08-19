/**
 * JournalEntryForm component - implements logic that handles any the submission of any component added to the page generated by JournalEntryFormHTML component. 
 */

import { JournalEntryFormHTML } from './JournalEntryFormHTML.js';
import { JournalEntryFormError } from './JournalEntryFormError.js';
import { useMoodByValue, getMoods } from '../Moods/MoodProvider.js';
import { validator } from './JournalEntryFormValidator.js';
import { getConcepts, getOrCreateConcepts } from '../Concepts/ConceptProvider.js';
import { saveJournalEntry, updateJournalEntry } from '../JournalEntry/JournalDataProvider.js';

const eventHub = document.querySelector('.container');

/**
 * Render a Journal Entry Form directly to the DOM node with class .entry-form-container
 */
export const JournalEntryForm = () => {
  getMoods()
    .then(getConcepts)
    .then(() => {
      document
        .querySelector('.entry-form-container')
        .innerHTML = JournalEntryFormHTML();
    })
};

/**
 * Factory function to create a journalEntry object from the current data in the form.
 * @param {HTMLElement} formElement The form element whose inputs' values should be used to construct the journal entry object
 */
const createJournalEntryObjectFromFormData = (formElement) => {
  const journalEntry = {};

  const { elements } = formElement;
  for(const element of elements) {
    if(element.nodeName.toLowerCase() !== 'button' && element.nodeName.toLowerCase() !== 'fieldset') {
      switch(element.name) {
        case 'mood':
          journalEntry.moodId = useMoodByValue(element.value).id;
          break;
        case 'concepts':
          journalEntry.concepts = element.value.split(',').map(concept => concept.trim());
          break;
        default:
          journalEntry[element.name] = element.value;
      }
    }
  }

  return journalEntry;
};

/**
 * Clear out all error messages from the DOM
 * @param {HTMLElement} formElement The form element to clear error messages on
 */
const clearErrorMessages = formElement => {
  document
    .querySelectorAll(`#${formElement.getAttribute('id')} .entry-form__errors`)
    .forEach(errorMessageNode => errorMessageNode.innerHTML = '');
};

/**
 * Render validation errors to the DOM.
 * @param {Array} errors Array of error objects from the Validator.
 * @param {HTMLElement} formElement The form element to render errors for
 */
const renderErrors = (errors, formElement) => {
  clearErrorMessages(formElement);

  errors.forEach(error => {
    const errorMessageNode = document.querySelector(`#${formElement.getAttribute('id')} .entry-form__${error.propertyName}-errors`);
    errorMessageNode.innerHTML += JournalEntryFormError(error.errorMessage);
  });
};

/**
 * Set the disabled attribute for each input in the form to true.
 * @param {HTMLElement} formElement The form element to disable inputs on
 */
const disableForm = formElement => {
  for(const element of formElement.elements) {
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
    const moodEmoji = useMoodByValue(event.target.value).label;
    moodEmojiContentTarget.innerHTML = moodEmoji;
  }
});

/**
 * Event listener for form submit. Will either save a new journal entry object, or update an existing edited journal entry object.
 * Only saves if the journalEntry object passes all validation tests, renders errors to DOM if errors detected in object.
 */
eventHub.addEventListener('submit', event => {
  const [ nodeId, entryId ] = event.target.getAttribute('id').split('--');

  if(nodeId === 'entry-form') {
    event.preventDefault();
    const formElement = event.target;

    const journalEntry = createJournalEntryObjectFromFormData(formElement);

    const errors = validator.validate(journalEntry);
    renderErrors(errors, formElement);

    if(errors.length === 0) {
      disableForm(formElement);

      getOrCreateConcepts(journalEntry.concepts)
        .then(concepts => {
          saveJournalEntry(journalEntry);
        });

      if(entryId) {
        // updateJournalEntry(journalEntry);
      }
      else {
        // saveJournalEntry(journalEntry);
      }
    }
  }
});

/**
 * Event listener to re-render empty and enabled form after successful entry save.
 */
eventHub.addEventListener('journalEntriesStateChanged', JournalEntryForm);