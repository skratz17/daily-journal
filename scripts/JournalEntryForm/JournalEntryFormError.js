import escapeHTML from '../utilities/escapeHTML.js';

export const JournalEntryFormError = errorMessage => (
  `<li class="entry-form__error">${escapeHTML(errorMessage)}</li>`
);