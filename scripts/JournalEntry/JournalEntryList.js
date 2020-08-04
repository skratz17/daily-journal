import { getJournalEntries, useJournalEntriesReverseChronological } from './JournalDataProvider.js';
import { JournalEntry } from './JournalEntry.js';
import { JournalEntryFormHTML } from '../JournalEntryForm/JournalEntryFormHTML.js';

const contentTarget = document.querySelector('.entries');
const eventHub = document.querySelector('.container');

let editingJournalEntryId;

const render = entries => {
  const entriesHTML = entries.map(entry => 
    entry.id === editingJournalEntryId ? JournalEntryFormHTML(entry) : JournalEntry(entry)
  ).join('');

  contentTarget.innerHTML = `
    <h2 class="entries__header">My Journal</h2>
    ${entriesHTML}
  `;
};

export const JournalEntryList = () => {
  getJournalEntries()
    .then(() => {
      const entries = useJournalEntriesReverseChronological();
      render(entries);
    });
};

/**
 * Event listener to update journal entry list on state changed.
 */
eventHub.addEventListener('journalEntriesStateChanged', () => {
  editingJournalEntryId = 0;
  render(useJournalEntriesReverseChronological());
});

eventHub.addEventListener('editEntryButtonClicked', event => {
  const entryId = event.detail.entryId;

  editingJournalEntryId = entryId;
  render(useJournalEntriesReverseChronological());
});