import { useJournalEntries } from './JournalDataProvider.js';
import { JournalEntry } from './JournalEntry.js';

const domNode = document.querySelector('.entries');

const render = entries => {
  const entriesHTML = entries.map(JournalEntry).join('\n');

  domNode.innerHTML = `
    <h2 class="entries__header">My Journal</h2>
    ${entriesHTML}
  `;
};

export const JournalEntryList = () => {
  const entries = useJournalEntries();
  render(entries);
};