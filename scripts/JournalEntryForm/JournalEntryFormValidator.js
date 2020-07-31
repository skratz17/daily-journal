import { Validator } from '../utilities/Validator.js';
import { isDateInThePast, isDateOnOrAfterCohortStartDate, isNotAboutBruceWillis, isNotEmpty } from '../utilities/validationFunctions.js';

const validator = new Validator();

validator.addValidatorToProperty(isDateInThePast, 'Date of entry cannot be in the future', 'date');
validator.addValidatorToProperty(isDateOnOrAfterCohortStartDate, 'I literally don\'t care about what you were doing before this class started.', 'date');
validator.addValidatorToProperty(isNotAboutBruceWillis, 'Text cannot contain a reference to Bruce Willis, as this is a forbidden topic.', 'concept', 'entry');
validator.addValidatorToProperty(isNotEmpty, 'Field cannot be left blank', 'concept', 'entry');

export { validator };