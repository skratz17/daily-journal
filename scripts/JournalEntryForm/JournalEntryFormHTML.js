import { getTodayDateString } from '../utilities/dateFormatting.js';
import { getDefaultMood, getMoodsCount } from '../Moods/MoodProvider.js';
import escapeHTML from '../utilities/escapeHTML.js';

/**
 * Return an object containing DOM IDs to use for various nodes in this form element.
 * @param {Number} id The id of the journal entry object
 */
const getFormInputDomIds = id => {
  const getFormSpecificId = prompt => id ? `${prompt}--${id}` : prompt;

  return {
    form: getFormSpecificId('entry-form'),
    date: getFormSpecificId('date'),
    concepts: getFormSpecificId('concepts'),
    mood: getFormSpecificId('mood'),
    moodEmoji: getFormSpecificId('entry-form__mood-emoji'),
    entry: getFormSpecificId('entry')
  };
}

/**
 * Returns HTML string representing a form to create a new journal entry or edit an existing one.
 * @param {Object} journalEntry Optional journal entry object to populate default values in form 
 */
export const JournalEntryFormHTML = (journalEntry) => {
  const defaultFormValues = {
    date: getTodayDateString(),
    concepts: '',
    mood: getDefaultMood(),
    entry: ''
  };

  const { date, concepts, mood, entry, id } = journalEntry || defaultFormValues;
  const domIds = getFormInputDomIds(id);

  const moodEmoji = mood.label;
  const moodValue = mood.value;

  return `
    <form id="${domIds.form}" class="entry-form">
      <h2 class="entry-form__header">${id ? `Update Entry from ${escapeHTML(date)}` : 'What Did You Do Today?'}</h2>
      <fieldset class="form-group">
        <label for="${domIds.date}" class="entry-form__label entry-form__date-label">Date</label>
        <ul class="entry-form__errors entry-form__date-errors"></ul>
        <input required type="date" class="entry-form__date" id="${domIds.date}" name="date" value="${escapeHTML(date)}">
      </fieldset>
      <div class="entry-form__concepts-and-mood-wrapper">
        <fieldset class="form-group">
          <label for="${domIds.concepts}" class="entry-form__label entry-form__concepts-label">Concepts</label>
          <ul class="entry-form__errors entry-form__concepts-errors"></ul>
          <input type="text" class="entry-form__concepts" id="${domIds.concepts}" name="concepts" value="${escapeHTML(concepts)}">
        </fieldset>
        <fieldset class="form-group">
          <label for="${domIds.mood}" class="entry-form__label entry-form__mood-label">Mood</label>
          <ul class="entry-form__errors entry-form__moodId-errors"></ul>
          <input type="range" class="entry-form__mood" id="${domIds.mood}" name="mood" value="${escapeHTML(moodValue)}" min="0" max="${getMoodsCount() - 1}" step="1">
        </fieldset>
        <div id="${domIds.moodEmoji}" class="entry-form__mood-emoji">${moodEmoji}</div>
      </div>
      <fieldset class="form-group">
        <label for="${domIds.entry}" class="entry-form__label entry-form__entry-label">Journal Entry</label>
        <ul class="entry-form__errors entry-form__entry-errors"></ul>
        <textarea class="entry-form__entry" name="entry" id="${domIds.entry}" cols="30" rows="10">${escapeHTML(entry)}</textarea>
      </fieldset>
      <input type="hidden" name="id" id="entryId" value="${id || ''}">
      <button type="submit" class="entry-form__submit btn btn-green">Record Journal Entry</button>
    </form>
  `;
}