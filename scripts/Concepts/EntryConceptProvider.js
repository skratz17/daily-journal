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

export const saveEntryConcepts = (entry, concepts) => {
  return Promise.all(concepts.map(concept => saveEntryConcept(entry, concept)));
}