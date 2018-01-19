import testDefinitions from './rules';

export const getInlineErrorElement = field => {
    const nextSibling = field.nextElementSibling;

    if (nextSibling && nextSibling.classList.contains('form-error')) {

        return nextSibling;
    }

    return false;
};

export const displayInlineMessage = (errorElement, customMessage, field) => {

    let updateElement = errorElement;

    if (!errorElement) {
        updateElement = document.createElement('p');
        updateElement.classList.add('form-error');
        field.parentNode.insertBefore(updateElement, field.nextSibling);
    }

    updateElement.textContent = customMessage;
    updateElement.classList.remove('is-hidden');

};

export const hideMessage = errorElement => {
    if (!errorElement) {
        return;
    }

    errorElement.classList.add('is-hidden');
    errorElement.innerHTML = '';

};

export const getMessage = (field, ruleName) => field.getAttribute(`data-${ruleName}-error`) || testDefinitions[ruleName].defaultMessage;

