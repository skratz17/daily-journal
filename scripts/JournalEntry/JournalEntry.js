import escape from '../utilities/escapeHTML.js';
import { getMoodEmoji } from '../utilities/moodEmojis.js';

export const JournalEntry = journalEntry => {
  const { id, date, concept, entry, mood } = journalEntry;

  const moodEmoji = getMoodEmoji(mood);

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