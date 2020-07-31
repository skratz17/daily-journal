/**
 * Class implementing various functions related to validating values of an object.
 * Extend it to create a validator for an arbitrary type of object
 */
export class Validator {
  propertiesToValidate = {}

  /**
   * 
   * @param {function} validator The validator function to add 
   * @param {String} errorMessage The error message to set for this property's validation if the validator returns false
   * @param  {...any} propertyNames The property names that this validator should apply to
   */
  addValidatorToProperty = (validator, errorMessage, ...propertyNames) => {
    propertyNames.forEach(propertyName => {
      if(!this.propertiesToValidate[propertyName]) {
        this.propertiesToValidate[propertyName] = [];
      }
      this.propertiesToValidate[propertyName].push({ validator, errorMessage });
    });
  }

  /**
   * Return true if the last time this.validate was called, all validation tests passed.
   */
  isValid = () => {
    const properties = this.propertiesToValidate;

    for(const propertyName of Object.keys(properties)) {
      for(const validationInfo of properties[propertyName]) {
        if(!validationInfo.isValid) return false;
      }
    }
    return true;
  }

  /**
   * Get an object of the form { <propertyName>: [ array of error message strings for all errors detected for this property on last validate() ]}
   */
  getErrors = () => {
    const properties = this.propertiesToValidate;
    const errors = {};

    Object.keys(properties).forEach(propertyName => {
      errors[propertyName] = 
        properties[propertyName]
          .filter(validationInfo => !validationInfo.isValid)
          .map(validationInfo => validationInfo.errorMessage);
    });

    return errors;
  }

  /**
   * Given an object, run all validator functions defined for each property of the object. 
   * @param {Object} object The object that you want to validate.
   * @returns Object of the form { isValid: <boolean value representing whether all tests were passed or not>, errors: { object mapping property names to array of error messages for detected errors for that property }}
   */
  validate = object => {
    const properties = this.propertiesToValidate;

    Object.keys(properties).forEach(propertyName => {
      const valueToValidate = object[propertyName];
      properties[propertyName].forEach(validationInfo => {
        validationInfo.isValid = validationInfo.validator(valueToValidate);
      });
    });

    return {
      isValid: this.isValid(),
      errors: this.getErrors()
    };
  }
}