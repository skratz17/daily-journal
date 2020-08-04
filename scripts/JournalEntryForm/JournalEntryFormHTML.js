import { getTodayDateString } from '../utilities/dateFormatting.js';
import { getMoodEmoji, getDefaultMoodValue, getEmojisCount } from '../utilities/moodEmojis.js';
import escapeHTML from '../utilities/escapeHTML.js';

const defaults = {
  date: getTodayDateString(),
  concept: '',
  mood: getDefaultMoodValue(),
  entry: ''
};

export const JournalEntryFormHTML = (journalEntry = false) => {
  const initialValuesObject = journalEntry || defaults;
  const { date, concept, mood, entry, id } = initialValuesObject;

  return `
    <form id="entry-form${id ? `--${id}` : ''}" class="entry-form">
      <h2 class="entry-form__header">What Did You Do Today?</h2>
      <fieldset class="form-group">
        <label for="date" class="entry-form__label entry-form__date-label">Date</label>
        <ul class="entry-form__errors entry-form__date-errors"></ul>
        <input required type="date" class="entry-form__date" id="date" name="date" value="${escapeHTML(date)}">
      </fieldset>
      <div class="entry-form__concept-and-mood-wrapper">
        <fieldset class="form-group">
          <label for="concept" class="entry-form__label entry-form__concept-label">Concepts</label>
          <ul class="entry-form__errors entry-form__concept-errors"></ul>
          <input type="text" class="entry-form__concept" id="concept" name="concept" value="${escapeHTML(concept)}">
        </fieldset>
        <fieldset class="form-group">
          <label for="mood" class="entry-form__label entry-form__mood-label">Mood</label>
          <ul class="entry-form__errors entry-form__mood-errors"></ul>
          <input type="range" class="entry-form__mood" id="mood${id ? `--${id}` : ''}" name="mood" value="${escapeHTML(mood)}" min="0" max="${getEmojisCount() - 1}" step="1">
        </fieldset>
        <div id="entry-form__mood-emoji${id ? `--${id}` : ''}" class="entry-form__mood-emoji">${getMoodEmoji(mood)}</div>
      </div>
      <fieldset class="form-group">
        <label for="entry" class="entry-form__label entry-form__entry-label">Journal Entry</label>
        <ul class="entry-form__errors entry-form__entry-errors"></ul>
        <textarea class="entry-form__entry" name="entry" id="entry" cols="30" rows="10">${escapeHTML(entry)}</textarea>
      </fieldset>
      <input type="hidden" name="id" id="entryId" value="${id || ''}">
      <button type="submit" class="entry-form__submit btn btn-green">Record Journal Entry</button>
    </form>
  `;
}