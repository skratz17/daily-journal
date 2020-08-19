let concepts = [];

const eventHub = document.querySelector('.container');

const broadcastConceptsStateChanged = () => {
  const conceptsStateChanged = new CustomEvent('conceptsStateChanged');
  eventHub.dispatchEvent(conceptsStateChanged);
};

export const useConcepts = () => concepts.slice();

export const getConcepts = () => {
  return fetch ('http://localhost:8088/concepts')
    .then(res => res.json())
    .then(conceptsData => concepts = conceptsData);
};

const saveConcept = conceptName => {
  const conceptObj = { name: conceptName };

  return fetch('http://localhost:8088/concepts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(conceptObj)
  });
}

export const getOrCreateConcepts = conceptNames => {
  const conceptsToCreate = conceptNames.filter(conceptString => 
    !(concepts.some(concept => concept.name.toLowerCase() === conceptString.toLowerCase()))
  );

  return Promise.all(conceptsToCreate.map(saveConcept))
    .then(getConcepts)
    .then(broadcastConceptsStateChanged)
    .then(() => concepts.filter(concept => conceptNames.includes(concept.name)));
};