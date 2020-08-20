import { Validator } from '../utilities/Validator.js';
import { validateDateIsNotInTheFuture, validateDateIsOnOrAfterCohortStartDate, validateIsNotAboutBruceWillis, validateIsNotEmpty, validateMoodIsNotWorstPossible, validateIsNotEmptyArray, validateArrayDoesNotContainDuplicates, validateArrayLengthIsNotGreaterThanThree, validateArrayContainsNoEmptyValues } from '../utilities/validationFunctions.js';

const validator = new Validator();

validator.addValidatorToProperty(validateDateIsNotInTheFuture, 'Date of entry cannot be in the future.', 'date');
validator.addValidatorToProperty(validateDateIsOnOrAfterCohortStartDate, 'I literally don\'t care about what you were doing before this class started.', 'date');
validator.addValidatorToProperty(validateIsNotAboutBruceWillis, 'Text cannot contain a reference to Bruce Willis, as this is a forbidden topic.', 'entry');
validator.addValidatorToProperty(validateIsNotEmpty, 'Field cannot be left blank.', 'entry');
validator.addValidatorToProperty(validateIsNotEmptyArray, 'Field cannot be left blank.', 'concepts');
validator.addValidatorToProperty(validateArrayDoesNotContainDuplicates, 'List of concepts covered cannot contain duplicates.', 'concepts');
validator.addValidatorToProperty(validateArrayLengthIsNotGreaterThanThree, 'Sorry but you you can only tag a post with up to three concepts.', 'concepts');
validator.addValidatorToProperty(validateArrayContainsNoEmptyValues, 'You cannot submit a blank value as a concept.', 'concepts');
validator.addValidatorToProperty(validateMoodIsNotWorstPossible, 'Come on, surely you didn\'t have THAT bad of a day, cowpoke.', 'moodId');

export { validator };