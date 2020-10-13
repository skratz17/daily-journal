import { updateEntryConcepts, deleteEntryConceptsForEntry } from '../Concepts/EntryConceptProvider.js';

const JOURNAL_ENTRY_FIELDS = [ 'id', 'date', 'moodId', 'entry' ];

let journal = [];

const eventHub = document.querySelector('.container');

/**
 * Broadcast an event indicating the the application state of journal entries has changed.
 */
const broadcastJournalEntriesStateChanged = () => {
  const journalEntriesStateChanged = new CustomEvent('journalEntriesStateChanged');
  eventHub.dispatchEvent(journalEntriesStateChanged);
};

/**
 * Given a journal entry object, return an object containing only the properties and values from the given object that should be saved to the database (defined in JOURNAL_ENTRY_FIELDS)
 * @param {Object} journalEntry A journal entry object that potentially includes properties not to save to DB.
 */
const createSaveableJournalEntryObject = journalEntry => {
  return JOURNAL_ENTRY_FIELDS.reduce((obj, field) => {
    if(journalEntry[field]) obj[field] = journalEntry[field];
    return obj;
  }, {});
};

/**
 * GET journal entries from API.
 */
export const getJournalEntries = () => {
  return fetch('http://localhost:8088/entries')
    .then(res => res.json())
    .then(journalData => journal = journalData);
};

/**
 * Returns a copy of all journal entries.
 */
export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
    (currentEntry, nextEntry) => Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  );
  return JSON.parse(JSON.stringify(sortedByDate));
};

/**
 * Returns a copy of all journal entries, sorted reverse chronologically.
 */
export const useJournalEntriesReverseChronological = () => {
  const sortedReverseChronological = journal.sort(
    (currentEntry, nextEntry) => Date.parse(nextEntry.date) - Date.parse(currentEntry.date)
  );
  return JSON.parse(JSON.stringify(sortedReverseChronological));
};

/**
 * Given an entry object, create a new entry object in the database such that its values are equal to the values of the entry object passed-in as argument. Also create new entryConcept objects for this entry object - the .concepts property of the entry argument should hold array of strings of concept names for this entry.
 * @param {Object} entry An object representing the new values to save for the entry.
 */
export const saveJournalEntry = entry => {
  fetch('http://localhost:8088/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createSaveableJournalEntryObject(entry))
  })
    .then(res => res.json())
    .then(entryData => updateEntryConcepts(entryData, entry.concepts))
    .then(getJournalEntries)
    .then(broadcastJournalEntriesStateChanged);
};

/**
 * Given an entry object with id property, update the entry object in the database with that ID such that its values are equal to the values of the entry object passed-in as argument. Also update the entryConcept objects associated with this entry object - the .concepts property of the entry argument should hold array of strings of concept names for this entry.
 * @param {Object} entry An object representing the new values to save for the entry.
 */
export const updateJournalEntry = entry => {
  const { id } = entry;
  fetch(`http://localhost:8088/entries/${id}` ,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createSaveableJournalEntryObject(entry))
  })
    .then(res => res.json())
    .then(entryData => updateEntryConcepts(entryData, entry.concepts))
    .then(getJournalEntries)
    .then(broadcastJournalEntriesStateChanged);
};

/**
 * Delete a journal entry from database. Will also delete all entryConcept objects with this entry ID.
 * @param {Number} id The ID of the journal entry to delete
 */
export const deleteJournalEntry = id => {
  fetch(`http://localhost:8088/entries/${id}`, {
    method: 'DELETE'
  })
    .then(() => deleteEntryConceptsForEntry(id))
    .then(getJournalEntries)
    .then(broadcastJournalEntriesStateChanged);
};