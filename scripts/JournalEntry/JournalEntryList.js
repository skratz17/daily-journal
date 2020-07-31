import { getJournalEntries, useJournalEntriesReverseChronological } from './JournalDataProvider.js';
import { JournalEntry } from './JournalEntry.js';

const contentTarget = document.querySelector('.entries');
const eventHub = document.querySelector('.container');

const render = entries => {
  const entriesHTML = entries.map(JournalEntry).join('');

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