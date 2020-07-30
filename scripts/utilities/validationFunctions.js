const COHORT_START_DATE_TIMESTAMP = Date.parse('2020-07-06');

export const isDateInThePast = date => Date.parse(date) - Date.now() <= 0;

export const isDateOnOrAfterCohortStartDate = date => COHORT_START_DATE_TIMESTAMP - Date.parse(date) <= 0;

export const isNotAboutBruceWillis = value => !(value.toLowerCase().includes('bruce willis'));

export const isNotEmpty = value => value.toString().length > 0;