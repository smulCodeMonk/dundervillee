import isEmail from 'isemail';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';

function getRequiredKeys(validation) {
    const requiredObject = {};
    for (let key in validation) {
        let validationProps = validation[key].split('|');
        let isRequired = validationProps.indexOf('required') > -1;
        if (isRequired) {
            requiredObject[key] = '';
        }
    }
    return requiredObject;
}

function validateRequired(key, value, validationObject) {
    const isValid = !isEmpty(value);
    if (!isValid) {
        validationObject.errors = validationObject.errors || {};
        validationObject.errors[key] = validationObject.errors[key] || [];
        validationObject.errors[key].push({
            error: 'REQUIRED'
        });
        return false;
    }
    return true;
}

function validateEmail(key, value, validationObject) {
    const isValid = isEmail.validate(value);
    if (!isValid) {
        validationObject.errors = validationObject.errors || {};
        validationObject.errors[key] = validationObject.errors[key] || [];
        validationObject.errors[key].push({
            error: 'INVALID_EMAIL'
        });
        return false;
    }
    return true;
}

function checkIsValid(validationObject) {
    if (validationObject.errors) {
        return false;
    }
    return true;
}

function validateBodyIsObject(req, res, reject, rawInput) {
    if (!isObject(rawInput)) {
        const response = { error: 'UNEXPECTED_INPUT' };
        res.status(422).json(response);
        return reject(response);
    }
}

export function validateBody(req, res, validation) {
    return new Promise((resolve, reject) => {
        const rawInput = req.body;
        validateBodyIsObject(req, res, reject, rawInput);
        const input = Object.assign({}, getRequiredKeys(validation), rawInput);

        let validationObject = { data: rawInput };
        for (let key in input) {
            if (validation[key]) {
                let value = input[key];

                let validationProps = validation[key].split('|');
                if (validationProps.indexOf('required') > -1) {
                    validateRequired(key, value, validationObject);
                }
                if (validationProps.indexOf('email') > -1) {
                    validateEmail(key, value, validationObject);
                }
            } else {
                validationObject[key] = {
                    isValid: true,
                    value: req.body[key]
                };
            }
        }

        const isValid = checkIsValid(validationObject);
        if (isValid) {
            return resolve();
        }
        const response = { error: 'VALIDATION_ERROR', ...validationObject };
        res.status(422).json(response);
        return reject(response);
    });
}
