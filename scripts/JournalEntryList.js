import { useJournalEntries } from './JournalDataProvider.js';
import { JournalEntry } from './JournalEntry.js';

const domNode = document.querySelector('.entries');

export const JournalEntryList = () => {
  const entries = useJournalEntries();

  const entriesHTML = entries.map(JournalEntry).join('\n');

  domNode.innerHTML += entriesHTML;
};