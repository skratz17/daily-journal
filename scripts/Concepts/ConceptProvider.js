let concepts = [];

const eventHub = document.querySelector('.container');

/**
 * Broadcast an event indicating the application state concepts has changed
 */
const broadcastConceptsStateChanged = () => {
  const conceptsStateChanged = new CustomEvent('conceptsStateChanged');
  eventHub.dispatchEvent(conceptsStateChanged);
};

/**
 * Returns a copy of the concepts application state array
 */
export const useConcepts = () => concepts.slice();

/**
 * GET concepts from API
 */
export const getConcepts = () => {
  return fetch ('http://localhost:8088/concepts')
    .then(res => res.json())
    .then(conceptsData => concepts = conceptsData);
};

/**
 * Given a concept name string, POST a new concept object to the database with that name.
 * @param {String} conceptName The concept name to create a new concept object for
 */
const saveConcept = conceptName => {
  const conceptObj = { name: conceptName };

  return fetch('http://localhost:8088/concepts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(conceptObj)
  });
};

/**
 * Given an array of concept name strings, determine which concept names are not already reflected by concept objects in the database, create new concept objects in the database for each of those names, and then return array of concept objects for each concept name string in the array passed in as argument.
 * @param {Array} conceptNames Array of strings representing concept names
 */
export const getOrCreateConcepts = conceptNames => {
  const conceptsToCreate = conceptNames.filter(conceptString => 
    !(concepts.some(concept => concept.name === conceptString))
  );

  if(!conceptsToCreate.length) {
    return Promise.resolve(concepts.filter(concept => conceptNames.includes(concept.name)));
  }

  return Promise.all(conceptsToCreate.map(saveConcept))
    .then(getConcepts)
    .then(broadcastConceptsStateChanged)
    .then(() => concepts.filter(concept => conceptNames.includes(concept.name)));
};