import { getOrCreateConcepts } from './ConceptProvider.js';

let entryConcepts = [];

const eventHub = document.querySelector('.container');

const broadcastEntryConceptsStateChanged = () => {
  const entryConceptsStateChanged = new CustomEvent('entryConceptsStateChanged');
  eventHub.dispatchEvent(entryConceptsStateChanged);
};

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
}

const deleteEntryConcept = id => {
  return fetch(`http://localhost:8088/entryConcepts/${id}`, {
    method: 'DELETE'
  });
}

export const useEntryConcepts = () => entryConcepts.slice();

export const getEntryConcepts = () => {
  return fetch ('http://localhost:8088/entryConcepts')
    .then(res => res.json())
    .then(entryConceptsData => entryConcepts = entryConceptsData);
};

export const saveEntryConcepts = (entry, concepts) => {
  return getOrCreateConcepts(concepts)
    .then(conceptObjects => Promise.all(conceptObjects.map(concept => saveEntryConcept(entry, concept))))
    .then(getEntryConcepts)
    .then(broadcastEntryConceptsStateChanged);
}

export const updateEntryConcepts = (entry, concepts) => {
  let conceptObjects;

  return getOrCreateConcepts(concepts)
    .then(conceptData => conceptObjects = conceptData)
    .then(() => identifyNewConceptsForEntry(entry, conceptObjects))
    .then(newConcepts => Promise.all(newConcepts.map(concept => saveEntryConcept(entry, concept))))
    .then(() => deleteUnusedEntryConcepts(entry, conceptObjects))
    .then(getEntryConcepts)
    .then(broadcastEntryConceptsStateChanged);
}

const identifyNewConceptsForEntry = (entry, concepts) => {
  const entryConceptsForEntry = entryConcepts
    .filter(entryConcept => entryConcept.entryId === entry.id);

  return concepts.filter(concept => 
    !(entryConceptsForEntry.some(entryConcept => entryConcept.conceptId === concept.id))
  );
}

const deleteUnusedEntryConcepts = (entry, concepts) => {
  const unusedEntryConcepts = entryConcepts
    .filter(entryConcept => entryConcept.entryId === entry.id)
    .filter(entryConcept => !(concepts.some(concept => concept.id === entryConcept.conceptId)));

  return Promise.all(unusedEntryConcepts.map(entryConcept => deleteEntryConcept(entryConcept.id)));
}

export const deleteEntryConceptsForEntry = id => {
  const entryConceptsToDelete = entryConcepts.filter(entryConcept => entryConcept.entryId === id);

  return Promise.all(entryConceptsToDelete.map(entryConcept => deleteEntryConcept(entryConcept.id)))
    .then(getEntryConcepts)
    .then(broadcastEntryConceptsStateChanged);
}