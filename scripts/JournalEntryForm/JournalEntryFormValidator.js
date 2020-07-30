import { isDateInThePast } from '../utilities/validationFunctions.js';

export class JournalEntryFormValidator {
  fields = {
    date: [
      {
        validator: isDateInThePast,
        errorMessage: 'Date of entry cannot be in the future.'
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
   * Given a journalEntry object, run all validator functions defined for each field of the object. 
   * @param {Object} journalEntry The journal entry object that you want to validate.
   * @returns true if all validator tests were passed, otherwise false
   */
  validate = journalEntry => {
    const fields = this.fields;

    Object.keys(fields).forEach(fieldName => {
      fields[fieldName].forEach(validationInfo => {
        const journalEntryValueToValidate = journalEntry[fieldName];
        validationInfo.isValid = validationInfo.validator(journalEntryValueToValidate);
      });
    });

    return this.isValid();
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
}