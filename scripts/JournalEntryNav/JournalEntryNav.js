import { getJournalEntries, useJournalEntries } from '../JournalEntry/JournalDataProvider.js';
import { JournalEntryNavLink } from './JournalEntryNavLink.js';

const contentTarget = document.querySelector('.entries-nav');
const eventHub = document.querySelector('.container');

let entries = [];

const render = () => {
  const navLinksHTML = entries.map(JournalEntryNavLink).join('');

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
      entries = useJournalEntries();
      render();
    });
};

eventHub.addEventListener('journalEntriesStateChanged', () => {
  entries = useJournalEntries();
  render();
});