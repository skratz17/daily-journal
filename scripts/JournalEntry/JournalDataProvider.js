/*
*   Journal data provider for Daily Journal application
*
*      Holds the raw data about each entry and exports
*      functions that other modules can use to filter
*      the entries for different purposes.
*/

const journal = [
  {
    id: 1,
    date: '07/10/20',
    concept: 'Git & Github',
    entry: 'We spent the whole day working on our first group project. The primary goal of this was to strengthen our understanding and confidence in using git and Github. It was awesome to learn how to collaboratively code with this technology and I also very much enjoyed working with my teammates!',
    mood: 9
  },
  {
    id: 2,
    date: '07/13/20',
    concept: 'JavaScript',
    entry: 'We spent the first half of the day completing and then presenting our first group projects. Ours went great even though our presenter didn\'t show anybody the page that I made. Then we started covering JavaScript.',
    mood: 8
  },
  {
    id: 3,
    date: '07/14/20',
    concept: 'JavaScript',
    entry: 'We spent the entire day learning about JavaScript, and more importantly about how we can apply the Single Responsibility Principle to maximally modularize our JavaScript code. It was extremely interesting to learn about how each module should exist in isolation and achieve exactly one goal, and how these modules can work together to create a full-fledged and functional app.',
    mood: 9
  }
];

export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
    (currentEntry, nextEntry) => Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  );
  return JSON.parse(JSON.stringify(sortedByDate));
};