import escape from './escapeHTML.js';

export const JournalEntry = journalEntry => {
  const { id, date, concept, entry, mood } = journalEntry;

  const moodEmojis = ['👿', '🤬', '😡', '😭', '😕', '🙃', '🙂', '😀', '😁', '🤠'];
  const moodEmoji = moodEmojis[mood - 1];

  return `
    <article id="entry--${escape(id)}" class="journal-entry">
      <p class="journal-entry__date">${escape(date)}</p>
      <div class="journal-entry__concept-mood-wrapper">
        <p class="journal-entry__concept">Concepts: ${escape(concept)}</p>
        <p class="journal-entry__mood">Mood: ${moodEmoji}</p>
      </div>
      <p class="journal-entry__entry">${escape(entry)}</p>
    </article>
  `;
};