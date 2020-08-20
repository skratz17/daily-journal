import escape from '../utilities/escapeHTML.js';
import { deleteJournalEntry } from './JournalDataProvider.js';
import { ConceptTag } from '../Concepts/ConceptTag.js';

const eventHub = document.querySelector('.container');

export const JournalEntry = (journalEntry, featuredConcept) => {
  const { id, date, concepts, entry, mood } = journalEntry;

  const moodEmoji = mood.label;
  const isFeatured = concepts.some(concept => concept.id === featuredConcept);

  return `
    <article id="entry--${escape(id)}" class="journal-entry ${isFeatured ? 'journal-entry--featured' : ''}">
      <p class="journal-entry__date">${escape(date)}</p>
      <div class="journal-entry__concept-mood-wrapper">
        <p class="journal-entry__concept">Concepts: ${concepts.map(concept => ConceptTag(concept, featuredConcept)).join('')}</p>
        <p class="journal-entry__mood">Mood: ${moodEmoji}</p>
      </div>
      <p class="journal-entry__entry">${escape(entry)}</p>
      <div class="journal-entry__buttons-wrapper">
        <button id="edit-entry--${escape(id)}" class="btn btn-blue journal-entry__edit-button">Edit</button>
        <button id="delete-entry--${escape(id)}" class="btn btn-red journal-entry__delete-button">Delete</button>
      </div>
    </article>
  `;
};

eventHub.addEventListener('click', event => {
  const [ prompt, entryId ] = event.target.id.split('--');

  if(prompt === 'edit-entry') {
    const editEntryButtonClickedEvent = new CustomEvent('editEntryButtonClicked', {
      detail: { 
        entryId: parseInt(entryId)
      }
    });
    eventHub.dispatchEvent(editEntryButtonClickedEvent);
  }

  else if(prompt === 'delete-entry') {
    deleteJournalEntry(entryId);
  }
});