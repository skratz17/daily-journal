import { useJournalEntries } from './JournalDataProvider.js';
import { JournalEntry } from './JournalEntry.js';

const domNode = document.querySelector('.entries');

export const JournalEntryList = () => {
  const entries = useJournalEntries();

  const entriesHTML = entries.map(JournalEntry).join('\n');

  domNode.innerHTML = `
    <h2 class="entries__header">My Journal</h2>
    ${entriesHTML}
  `;
};