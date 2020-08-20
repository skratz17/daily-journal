import escape from '../utilities/escapeHTML.js';

const eventHub = document.querySelector('.container');

export const ConceptTag = (concept, featuredConcept) => {
  const { id, name } = concept;

  return `
    <button class="btn concept-button ${featuredConcept === id ? 'concept-button--featured' : ''}" id="concept-button--${escape(id)}">
      ${escape(name)}
    </button>
  `;
};

eventHub.addEventListener('click', event => {
  if(event.target.classList.contains('concept-button')) {
    const id = event.target.id.split('--')[1];

    const conceptButtonClicked = new CustomEvent('conceptButtonClicked', {
      detail: { 
        conceptId: parseInt(id)
      }
    });

    eventHub.dispatchEvent(conceptButtonClicked);
  }
});