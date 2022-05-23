/* eslint-disable no-console */
/* eslint-disable no-useless-escape */

export const VALID_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const VALID_NAME = /^[^\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+(\s+[^\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+)*$/;
export const VALID_PHONE = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
export const IS_EMPTY = /^\s*$/;
export const IS_NOT_EMPTY = /(.|\s)*\S(.|\s)*/;

export const REGEX_MISSING = 'REGEX_MISSING';
export const INVALID_DOM_ELEMENT = 'INVALID_DOM_ELEMENT';
export const REQUIRED_FIELD = 'REQUIRED_FIELD';
export const INVALID_VALUE = 'INVALID_VALUE';

const allowedDomElements = ['INPUT', 'TEXTAREA'];

function isValidRegexInput(regex) {
    if (!regex) {
        console.error('no regex provided');
        return false;
    }
    return true;
}

function isValidDomElementInput(domElement) {
    if (domElement && allowedDomElements.indexOf(domElement.nodeName) > -1) {
        return true;
    }
    console.error(`domElement: '${domElement}' is not supported. Allowed are: ${allowedDomElements.join(', ')}`);
    return false;
}

export const validate = ({ domElement, value = null, isRequired = false, regex = null }) => {
    let errors = [];
    if (!isValidRegexInput(regex)) {
        errors.push(REGEX_MISSING);
    }

    if (domElement) {
        if (isValidDomElementInput(domElement)) {
            value = domElement.value;
        } else {
            errors.push(INVALID_DOM_ELEMENT);
        }
    }

    if (isRequired && isEmpty(value)) {
        errors.push(REQUIRED_FIELD);
    }

    const isValid = regex.test(value);
    if (!isValid) {
        errors.push(INVALID_VALUE);
    }

    return {
        domElement,
        value,
        errors,
        regex
    };
};

export const isValidName = ({ value, domElement }) => {
    return validate({
        regex: VALID_NAME,
        value,
        domElement
    });
};

export const isValidPhone = ({ value, domElement }) => {
    return validate({
        regex: VALID_PHONE,
        value,
        domElement
    });
};

export const isValidEmail = ({ value, domElement }) => {
    return validate({
        regex: VALID_EMAIL,
        value,
        domElement
    });
};

export const isEmpty = ({ value, domElement }) => {
    return validate({
        regex: IS_EMPTY,
        value,
        domElement
    });
};

export const isNotEmpty = ({ value, domElement }) => {
    return validate({
        regex: IS_NOT_EMPTY,
        value,
        domElement
    });
};

export const validationGroup = (raw) => {
    const errors = Object.keys(raw).filter((key) => raw[key].errors.length >= 1);

    return {
        items: raw,
        errors
    };
};
