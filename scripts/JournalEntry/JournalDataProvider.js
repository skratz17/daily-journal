const JOURNAL_ENTRY_FIELDS = [ 'id', 'date', 'moodId', 'entry' ];

let journal = [];

const eventHub = document.querySelector('.container');

const broadcastJournalEntriesStateChanged = () => {
  const journalEntriesStateChanged = new CustomEvent('journalEntriesStateChanged');
  eventHub.dispatchEvent(journalEntriesStateChanged);
};

export const getJournalEntries = () => {
  return fetch('http://localhost:8088/entries?_expand=mood')
    .then(res => res.json())
    .then(journalData => journal = journalData);
};

export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
    (currentEntry, nextEntry) => Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  );
  return JSON.parse(JSON.stringify(sortedByDate));
};

export const useJournalEntriesReverseChronological = () => {
  const sortedReverseChronological = journal.sort(
    (currentEntry, nextEntry) => Date.parse(nextEntry.date) - Date.parse(currentEntry.date)
  );
  return JSON.parse(JSON.stringify(sortedReverseChronological));
};

export const saveJournalEntry = entry => {
  fetch('http://localhost:8088/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  })
    .then(getJournalEntries)
    .then(broadcastJournalEntriesStateChanged);
};

export const updateJournalEntry = entry => {
  const { id } = entry;
  fetch(`http://localhost:8088/entries/${id}` ,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  })
    .then(getJournalEntries)
    .then(broadcastJournalEntriesStateChanged);
};

export const deleteJournalEntry = id => {
  fetch(`http://localhost:8088/entries/${id}`, {
    method: 'DELETE'
  })
    .then(getJournalEntries)
    .then(broadcastJournalEntriesStateChanged);
};