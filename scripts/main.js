import { getJournalEntries } from './JournalEntry/JournalDataProvider.js';

import { JournalEntryForm } from './JournalEntryForm/JournalEntryForm.js';
import { JournalEntryList } from './JournalEntry/JournalEntryList.js';
import { JournalEntryNav } from './JournalEntryNav/JournalEntryNav.js';

JournalEntryForm();
getJournalEntries()
  .then(() => {
    JournalEntryList();
    JournalEntryNav();
  });