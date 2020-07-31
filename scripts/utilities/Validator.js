export class Validator {
  validators = []
  errors = []

  /**
   * @param {function} validator The validator function to add 
   * @param {String} errorMessage The error message to set for this property's validation if the validator returns false
   * @param  {...any} propertyNames The property names that this validator should apply to
   */
  addValidatorToProperty = (validator, errorMessage, ...propertyNames) => {
    propertyNames.forEach(propertyName => {
      const validationInfo = { propertyName, validator, errorMessage };
      this.validators.push(validationInfo);
    });
  }

  /**
   * Given an object, run all validator functions defined for each property of the object. 
   * @param {Object} object The object that you want to validate.
   * @returns {Array} Array of objects representing validations failed - each object will be of the form { propertyName {String}, errorMessage {String} }
   */
  validate = object => {
    this.errors = [];

    this.validators.forEach(validationInfo => {
      const { propertyName, validator, errorMessage } = validationInfo;
      const valueToValidate = object[propertyName];
      if(!validator(valueToValidate)) {
        this.errors.push({ propertyName, errorMessage });
      }
    });

    return this.errors.slice();
  }
}