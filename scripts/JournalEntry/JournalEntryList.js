import { getJournalEntries, useJournalEntriesReverseChronological } from './JournalDataProvider.js';
import { JournalEntry } from './JournalEntry.js';
import { JournalEntryFormHTML } from '../JournalEntryForm/JournalEntryFormHTML.js';
import { getMoods } from '../Moods/MoodProvider.js';
import { getConcepts, useConcepts } from '../Concepts/ConceptProvider.js';
import { getEntryConcepts, useEntryConcepts } from '../Concepts/EntryConceptProvider.js';

const contentTarget = document.querySelector('.entries');
const eventHub = document.querySelector('.container');

let editingJournalEntryId;

let entries = [];
let concepts = [];
let entryConcepts = [];

const render = () => {
  entries.forEach(entry => {
    entry.concepts = entryConcepts
      .filter(entryConcept => entryConcept.entryId === entry.id)
      .map(entryConcept => concepts.find(concept => entryConcept.conceptId === concept.id))
  });

  const entriesHTML = entries.map(entry => 
    entry.id === editingJournalEntryId ? JournalEntryFormHTML(entry) : JournalEntry(entry)
  ).join('');

  contentTarget.innerHTML = `
    <h2 class="entries__header">My Journal</h2>
    ${entriesHTML}
  `;
};

export const JournalEntryList = () => {
  getJournalEntries()
    .then(getMoods)
    .then(getConcepts)
    .then(getEntryConcepts)
    .then(() => {
      entries = useJournalEntriesReverseChronological();
      concepts = useConcepts();
      entryConcepts = useEntryConcepts();
      render();
    });
};

/**
 * Event listener to update journal entry list on state changed.
 */
eventHub.addEventListener('journalEntriesStateChanged', () => {
  editingJournalEntryId = 0;
  entries = useJournalEntriesReverseChronological();
  render();
});

eventHub.addEventListener('conceptsStateChanged', () => {
  concepts = useConcepts();
  render();
});

eventHub.addEventListener('entryConceptsStateChanged', () => {
  entryConcepts = useEntryConcepts();
  render();
});

eventHub.addEventListener('editEntryButtonClicked', event => {
  const entryId = event.detail.entryId;

  editingJournalEntryId = entryId;
  render();
});