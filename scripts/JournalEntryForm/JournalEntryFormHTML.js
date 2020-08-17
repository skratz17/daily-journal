import { getTodayDateString } from '../utilities/dateFormatting.js';
import { getDefaultMood, getMoodsCount } from '../Moods/MoodProvider.js';
import escapeHTML from '../utilities/escapeHTML.js';

export const JournalEntryFormHTML = (journalEntry) => {
  const defaults = {
    date: getTodayDateString(),
    concept: '',
    mood: getDefaultMood(),
    entry: ''
  };

  const initialValuesObject = journalEntry || defaults;
  const { date, concept, mood, entry, id } = initialValuesObject;

  const moodEmoji = mood.label;
  const moodValue = mood.value;

  const getFormSpecificId = prompt => id ? `${prompt}--${id}` : prompt;

  return `
    <form id="${getFormSpecificId('entry-form')}" class="entry-form">
      <h2 class="entry-form__header">${id ? `Update Entry from ${escapeHTML(date)}` : 'What Did You Do Today?'}</h2>
      <fieldset class="form-group">
        <label for="${getFormSpecificId('date')}" class="entry-form__label entry-form__date-label">Date</label>
        <ul class="entry-form__errors entry-form__date-errors"></ul>
        <input required type="date" class="entry-form__date" id="${getFormSpecificId('date')}" name="date" value="${escapeHTML(date)}">
      </fieldset>
      <div class="entry-form__concept-and-mood-wrapper">
        <fieldset class="form-group">
          <label for="${getFormSpecificId('concept')}" class="entry-form__label entry-form__concept-label">Concepts</label>
          <ul class="entry-form__errors entry-form__concept-errors"></ul>
          <input type="text" class="entry-form__concept" id="${getFormSpecificId('concept')}" name="concept" value="${escapeHTML(concept)}">
        </fieldset>
        <fieldset class="form-group">
          <label for="${getFormSpecificId('mood')}" class="entry-form__label entry-form__mood-label">Mood</label>
          <ul class="entry-form__errors entry-form__moodId-errors"></ul>
          <input type="range" class="entry-form__mood" id="${getFormSpecificId('mood')}" name="mood" value="${escapeHTML(moodValue)}" min="0" max="${getMoodsCount() - 1}" step="1">
        </fieldset>
        <div id="${getFormSpecificId('entry-form__mood-emoji')}" class="entry-form__mood-emoji">${moodEmoji}</div>
      </div>
      <fieldset class="form-group">
        <label for="${getFormSpecificId('entry')}" class="entry-form__label entry-form__entry-label">Journal Entry</label>
        <ul class="entry-form__errors entry-form__entry-errors"></ul>
        <textarea class="entry-form__entry" name="entry" id="${getFormSpecificId('entry')}" cols="30" rows="10">${escapeHTML(entry)}</textarea>
      </fieldset>
      <input type="hidden" name="id" id="entryId" value="${id || ''}">
      <button type="submit" class="entry-form__submit btn btn-green">Record Journal Entry</button>
    </form>
  `;
}