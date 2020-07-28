let journal = [];

export const getJournalEntries = () => {
  return fetch('http://localhost:8088/entries')
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