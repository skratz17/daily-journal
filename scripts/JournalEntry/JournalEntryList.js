import { getJournalEntries, useJournalEntriesReverseChronological } from './JournalDataProvider.js';
import { JournalEntry } from './JournalEntry.js';

const contentTarget = document.querySelector('.entries');
const eventHub = document.querySelector('.container');

let editingJournalEntry;

const render = entries => {
  const entriesHTML = entries.map(entry => 
    entry.id === editingJournalEntry ? '<div>editing</div>' : JournalEntry(entry)
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
    })
};

/**
 * Event listener to update journal entry list on state changed.
 */
eventHub.addEventListener('journalEntriesStateChanged', () => render(useJournalEntriesReverseChronological()));

eventHub.addEventListener('editEntryButtonClicked', event => {
  const entryId = event.detail.entryId;

  editingJournalEntry = entryId;
  render(useJournalEntriesReverseChronological());
});