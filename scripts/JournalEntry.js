import escape from './escapeHTML.js';

export const JournalEntry = journalEntry => {
  const { id, date, concept, entry, mood } = journalEntry;

  return `
    <article id="entry--${escape(id)}" class="journal-entry">
      <p class="journal-entry__date">${escape(date)}</p>
      <div class="journal-entry__concept-mood-wrapper">
        <p class="journal-entry__concept">Concepts: ${escape(concept)}</p>
        <p class="journal-entry__mood">Mood: ${escape(mood)}</p>
      </div>
      <p class="journal-entry__entry">${escape(entry)}</p>
    </article>
  `;
};