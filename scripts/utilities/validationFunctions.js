import { useMoodById } from '../Moods/MoodProvider.js';

const COHORT_START_DATE_TIMESTAMP = Date.parse('2020-07-06');

export const validateDateIsNotInTheFuture = date => Date.parse(date) - Date.now() <= 0;

export const validateDateIsOnOrAfterCohortStartDate = date => COHORT_START_DATE_TIMESTAMP - Date.parse(date) <= 0;

export const validateIsNotAboutBruceWillis = value => !(value.toLowerCase().includes('bruce willis'));

export const validateIsNotEmpty = value => value.toString().trim().length > 0;

export const validateMoodIsNotWorstPossible = id => useMoodById(id).value > 0;