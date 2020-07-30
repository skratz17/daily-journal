import { getJournalEntries, useJournalEntriesReverseChronological } from '../JournalEntry/JournalDataProvider.js';
import { JournalEntryNavLink } from './JournalEntryNavLink.js';

const contentTarget = document.querySelector('.entries-nav');
const eventHub = document.querySelector('.container');

const render = entries => {
  const navLinksHTML = entries.map(JournalEntryNavLink).join('\n');

  contentTarget.innerHTML = `
    <h2 class="entries-nav__header">Past Entries</h2>
    <nav class="entries-nav">
      ${navLinksHTML}
    </nav>
  `;
}

export const JournalEntryNav = () => {
  getJournalEntries()
    .then(() => {
      const entries = useJournalEntriesReverseChronological();
      render(entries);
    });
};

eventHub.addEventListener('journalEntriesStateChanged', JournalEntryNav);