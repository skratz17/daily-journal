import escape from '../utilities/escapeHTML.js';
import { useMoodById } from '../Moods/MoodProvider.js';

const eventHub = document.querySelector('.container');

export const JournalEntry = journalEntry => {
  const { id, date, concept, entry, moodId } = journalEntry;

  const moodEmoji = useMoodById(moodId).label;

  return `
    <article id="entry--${escape(id)}" class="journal-entry">
      <p class="journal-entry__date">${escape(date)}</p>
      <div class="journal-entry__concept-mood-wrapper">
        <p class="journal-entry__concept">Concepts: ${escape(concept)}</p>
        <p class="journal-entry__mood">Mood: ${moodEmoji}</p>
      </div>
      <p class="journal-entry__entry">${escape(entry)}</p>
      <div class="journal-entry__edit-button-wrapper">
        <button id="edit-entry--${escape(id)}" class="btn btn-blue journal-entry__edit-button">Edit</button>
      </div>
    </article>
  `;
};

eventHub.addEventListener('click', event => {
  if(event.target.id.startsWith('edit-entry--')) {
    const entryId = event.target.id.split('--')[1];

    const editEntryButtonClickedEvent = new CustomEvent('editEntryButtonClicked', {
      detail: { 
        entryId: parseInt(entryId)
      }
    });
    eventHub.dispatchEvent(editEntryButtonClickedEvent);
  }
});