import testDefinitions from './rules';

const addMessage = (errorElement, ruleName, field) => {
    const customMessage = field.getAttribute(`data-${ruleName}-error`) || testDefinitions[ruleName].defaultMessage;
    if (errorElement) {
        errorElement.textContent = customMessage;
        errorElement.classList.remove('is-hidden');
    } else {
        const newElement = document.createElement('p');
        newElement.classList.add('form-error');
        newElement.textContent = customMessage;
        field.parentNode.insertBefore(newElement, field.nextSibling);
    }
};

const hideMessage = errorElement => {
    if (errorElement) {
        errorElement.classList.add('is-hidden');
        errorElement.textContent = '';
    }
};

const findErrorMessage = field => {
    const nextSibling = field.nextElementSibling;

    if (nextSibling && nextSibling.classList.contains('form-error')) {
        return nextSibling;
    }

    return false;

};

export default (ruleName, field, isValid) => {

    const errorElement = findErrorMessage(field);

    if (!isValid) {
        addMessage(errorElement, ruleName, field);
    } else {
        hideMessage(errorElement);
    }

};

