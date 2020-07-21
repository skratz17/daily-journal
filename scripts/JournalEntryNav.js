export const JournalEntryNav = () => {
  const domNode = document.querySelector('.entries-nav');

  domNode.innerHTML = `
    <h2 class="entries-nav__header">Past Entries</h2>
  `;
};