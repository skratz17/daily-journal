import { getOrCreateConcepts } from './ConceptProvider.js';

let entryConcepts = [];

const eventHub = document.querySelector('.container');

/**
 * Broadcast event announcing there is a new entryConcepts state
 */
const broadcastEntryConceptsStateChanged = () => {
  const entryConceptsStateChanged = new CustomEvent('entryConceptsStateChanged');
  eventHub.dispatchEvent(entryConceptsStateChanged);
};

/**
 * POST a new entryConcept to the API
 * @param {Object} entry The journal entry object to create a new entryConcept object for
 * @param {Object} concept The concept object to create a new entryConcept object for
 */
const saveEntryConcept = (entry, concept) => {
  const entryConcept = {
    entryId: entry.id,
    conceptId: concept.id
  };

  return fetch('http://localhost:8088/entryConcepts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entryConcept)
  });
};

/**
 * GET entryConcepts from API
 */
export const getEntryConcepts = () => {
  return fetch ('http://localhost:8088/entryConcepts')
    .then(res => res.json())
    .then(entryConceptsData => entryConcepts = entryConceptsData);
};

/**
 * Returns a copy of the entryConcepts application state array.
 */
export const useEntryConcepts = () => entryConcepts.slice();

/**
 * DELETE an entryConcept by ID
 * @param {Number} id The ID of the entryConcept to delete
 */
const deleteEntryConcept = id => {
  return fetch(`http://localhost:8088/entryConcepts/${id}`, {
    method: 'DELETE'
  });
};

/**
 * Given a journal entry object and an array of conceptName strings representing all concepts that should be associated with this journal entry:
 *  1) Transform the array of concept name strings into an array of Concept objects, creating new Concept objects in the database where necessary
 *  2) Create and save to database all new entryConcept objects representing new concepts that are to be associated with this journal entry
 *  3) Delete all entryConcept objects in the database that representing entry-concept relationships that no longer exist
 * @param {Object} entry The journal entry object to update entryConcepts for
 * @param {Array} concepts Array of conceptName strings to be associated with this entry
 */
export const updateEntryConcepts = (entry, concepts) => {
  let conceptObjects;

  return getOrCreateConcepts(concepts)
    .then(conceptData => conceptObjects = conceptData)
    .then(() => saveNewEntryConceptsForEntry(entry, conceptObjects))
    .then(() => deleteUnusedEntryConcepts(entry, conceptObjects))
    .then(getEntryConcepts)
    .then(broadcastEntryConceptsStateChanged);
};

/**
 * Given a journal entry object and an array of concept objects representing all concepts associated with this journal entry, create and save new entryConcept objects in the database for each concept in the concepts array that is not already associated with this journal entry in an entryConcept object.
 * @param {Object} entry The Journal Entry object to potentially save new entryconcepts for
 * @param {Array} concepts Array of Concept objects that are associated with this entry
 */
const saveNewEntryConceptsForEntry = (entry, concepts) => {
  const entryConceptsForEntry = entryConcepts
    .filter(entryConcept => entryConcept.entryId === entry.id);

  const newConcepts = concepts.filter(concept => 
    !(entryConceptsForEntry.some(entryConcept => entryConcept.conceptId === concept.id))
  );

  return Promise.all(newConcepts.map(concept => saveEntryConcept(entry, concept)));
};

/**
 * Given a journal entry object and an array of concept objects representing all concepts associated with this journal entry, delete all entryConcept objects currently saved in the database that refer to this entryId but refer to conceptIds that are not present in the supplied concepts array.
 * @param {Object} entry The journal entry to potentially delete entryConcepts for
 * @param {Array} concepts Array of Concept objects that are associated with this entry
 */
const deleteUnusedEntryConcepts = (entry, concepts) => {
  const unusedEntryConcepts = entryConcepts
    .filter(entryConcept => entryConcept.entryId === entry.id)
    .filter(entryConcept => !(concepts.some(concept => concept.id === entryConcept.conceptId)));

  return Promise.all(unusedEntryConcepts.map(entryConcept => deleteEntryConcept(entryConcept.id)));
};