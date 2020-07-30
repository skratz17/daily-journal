import { isDateInThePast, isDateOnOrAfterCohortStartDate, isNotAboutBruceWillis, isNotEmpty } from '../utilities/validationFunctions.js';

export class JournalEntryFormValidator {
  fields = {
    date: [
      {
        validator: isDateInThePast,
        errorMessage: 'Date of entry cannot be in the future.'
      },
      {
        validator: isDateOnOrAfterCohortStartDate,
        errorMessage: 'I literally don\'t care about what you were doing before this class started.'
      }
    ],
    concept: [
      {
        validator: isNotEmpty,
        errorMessage: 'Concepts cannot be left blank.'
      },
      {
        validator: isNotAboutBruceWillis,
        errorMessage: 'Concepts covered cannot contain Bruce Willis, as this is a forbidden topic.'
      }
    ],
    entry: [
      {
        validator: isNotEmpty,
        errorMessage: 'Journal entry cannot be left blank.'
      }
    ]
  }

  /**
   * Return true if the last time this.validate was called on a journalEntry, all validation tests passed.
   */
  isValid = () => {
    const fields = this.fields;

    for(const fieldName of Object.keys(fields)) {
      for(const validationInfo of fields[fieldName]) {
        if(!validationInfo.isValid) return false;
      }
    }
    return true;
  }

  /**
   * Get an object of the form { <fieldName>: [ array of error message strings for all errors detected for this field on last validate() ]}
   */
  getErrors = () => {
    const fields = this.fields;
    const errors = {};

    Object.keys(fields).forEach(fieldName => {
      errors[fieldName] = 
        fields[fieldName]
          .filter(validationInfo => !validationInfo.isValid)
          .map(validationInfo => validationInfo.errorMessage);
    });

    return errors;
  }

  /**
   * Given a journalEntry object, run all validator functions defined for each field of the object. 
   * @param {Object} journalEntry The journal entry object that you want to validate.
   * @returns Object of the form { isValid: <boolean value representing whether all tests were passed or not>, errors: { object mapping field names to array of error messages for detected errors for that field }}
   */
  validate = journalEntry => {
    const fields = this.fields;

    Object.keys(fields).forEach(fieldName => {
      const journalEntryValueToValidate = journalEntry[fieldName];
      debugger;
      fields[fieldName].forEach(validationInfo => {
        validationInfo.isValid = validationInfo.validator(journalEntryValueToValidate);
      });
    });
    debugger;

    return {
      isValid: this.isValid(),
      errors: this.getErrors()
    };
  }
}