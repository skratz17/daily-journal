import { getOrCreateConcepts } from './ConceptProvider.js';

let entryConcepts = [];

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

export const useEntryConcepts = () => entryConcepts.slice();

export const getEntryConcepts = () => {
  return fetch ('http://localhost:8088/entryConcepts')
    .then(res => res.json())
    .then(entryConceptsData => entryConcepts = entryConceptsData);
};

export const saveEntryConcepts = (entry, concepts) => {
  return getOrCreateConcepts(concepts)
    .then(conceptObjects => Promise.all(conceptObjects.map(concept => saveEntryConcept(entry, concept))))
}