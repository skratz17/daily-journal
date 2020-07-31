import { Validator } from '../utilities/Validator.js';
import { validateDateIsNotInTheFuture, validateDateIsOnOrAfterCohortStartDate, validateIsNotAboutBruceWillis, validateIsNotEmpty, validateMoodIsNotWorstPossible } from '../utilities/validationFunctions.js';

const validator = new Validator();

validator.addValidatorToProperty(validateDateIsNotInTheFuture, 'Date of entry cannot be in the future.', 'date');
validator.addValidatorToProperty(validateDateIsOnOrAfterCohortStartDate, 'I literally don\'t care about what you were doing before this class started.', 'date');
validator.addValidatorToProperty(validateIsNotAboutBruceWillis, 'Text cannot contain a reference to Bruce Willis, as this is a forbidden topic.', 'concept', 'entry');
validator.addValidatorToProperty(validateIsNotEmpty, 'Field cannot be left blank.', 'concept', 'entry');
validator.addValidatorToProperty(validateMoodIsNotWorstPossible, 'Come on, surely you didn\'t have THAT bad of a day, cowpoke.', 'mood');

export { validator };