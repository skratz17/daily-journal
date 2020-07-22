import { useJournalEntries } from '../JournalEntry/JournalDataProvider.js';
import { JournalEntryNavLink } from './JournalEntryNavLink.js';

export const JournalEntryNav = () => {
  const domNode = document.querySelector('.entries-nav');

  const entries = useJournalEntries();

  const navLinksHTML = entries.map(JournalEntryNavLink).join('\n');

  domNode.innerHTML = `
    <h2 class="entries-nav__header">Past Entries</h2>
    <nav class="entries-nav">
      ${navLinksHTML}
    </nav>
  `;
};