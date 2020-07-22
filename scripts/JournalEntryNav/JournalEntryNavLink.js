import escape from '../utilities/escapeHTML.js';

export const JournalEntryNavLink = entry => {
  const { id, date } = entry;

  return `
    <a href="#entry--${escape(id)}" class="entries-nav__link">${escape(date)}</a>
  `;
};