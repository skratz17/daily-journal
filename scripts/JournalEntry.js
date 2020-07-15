import escape from './escapeHTML.js';

export const JournalEntryComponent = entry => {
  const { id, date, concept, entry, mood } = entry;

  return `
    <section id="entry--${escape(id)}" class="journal-entry>
      <p class="journal-entry__date">${escape(date)}</p>
      <div class="journal-entry__concept-mood-wrapper">
        <p class="journal-entry__concept">${escape(concept)}</p>
        <p class="journal-entry__mood">${escape(mood)}</p>
      </div>
      <p class="journal-entry__entry">${escape(entry)}</p>
    </section>
  `;
};