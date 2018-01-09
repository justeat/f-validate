import testDefinitions from './rules';

const FIELD_VALUES = 'input, select, textarea';
const VALIDATION_KEYS = Object.keys(testDefinitions);

export const defaultOptions = {
    errorClass: 'has-error',
    successClass: 'has-success',
    focus: false
};

const getForm = descriptor => {

    if (!descriptor) {
        throw new Error('f-validate: expected form name or form node parameter');
    }

    const form = typeof descriptor === 'object' && descriptor.tagName === 'FORM' ?
        descriptor : document.forms[descriptor];

    if (!form) {
        throw new Error('f-validate: form not found');
    }

    return form;

};

const addCallBack = (callBacks, callBack, callBackType) => {

    if (typeof callBack !== 'function') {
        throw new Error(`f-validate: ${callBackType} call back must be a function`);
    }

    if (!callBacks[callBackType]) {
        callBacks[callBackType] = [];
    }

    callBacks[callBackType].push(callBack);

};

const runCallbacks = (callBacks, callBackType) => {

    if (!callBacks[callBackType]) {
        return;
    }

    callBacks[callBackType].forEach(callback => {
        callback();
    });

};

export default class FormValidation {

    constructor (nameOrNode, options = {}) {
        this.options = Object.assign({}, defaultOptions, options);
        this.form = getForm(nameOrNode);
        this.form.addEventListener('submit', this.isValid.bind(this));
        this.fields = this.getFields();
        this.customHandlers = {};
        this.callBacks = {};
        if (this.options.onSuccess) {
            this.on('success', this.options.onSuccess);
        }
        if (this.options.onError) {
            this.on('error', this.options.onError);
        }
    }

    on (callBackType, callBack) {
        addCallBack(this.callBacks, callBack, callBackType);
    }

    setSuccess (element) {
        element.classList.remove(this.options.errorClass);
        element.classList.add(this.options.successClass);
    }

    setError (element) {
        element.classList.remove(this.options.successClass);
        element.classList.add(this.options.errorClass);
    }

    isValid (event) {

        let formValid = true;

        this.fields.forEach(field => {

            // This needs to be set outside of the forEach loop, as otherwise only the final rule will apply the state
            let fieldValid = true;

            // This prevents us from applying state classes to fields without rules
            let fieldHasValidation = false;

            VALIDATION_KEYS.forEach(key => {
                const definition = testDefinitions[key];

                if (field.getAttribute('data-val-custom')) {
                    testDefinitions.custom.test = this.customHandlers[field.getAttribute('data-val-custom')];
                }

                if (definition.condition(field)) {
                    fieldHasValidation = true;
                    if (!definition.test(field)) {
                        fieldValid = false;
                    }
                }

            });

            if (fieldHasValidation) {
                if (fieldValid) {
                    this.setSuccess(field);
                } else {
                    formValid = false;
                    this.setError(field);
                }
            }

        });

        if (!formValid) {
            this.setError(this.form);
            runCallbacks(this.callBacks, 'error');
            if (event) {
                event.preventDefault();
            }
        } else {
            this.setSuccess(this.form);
            runCallbacks(this.callBacks, 'success');
        }

        return formValid;

    }

    addCustomValidation (name, handler) {
        if (!name || typeof name !== 'string') {
            throw new Error('f-validate: please provide the name');
        }
        if (!handler || typeof handler !== 'function') {
            throw new Error('f-validate: please provide a custom method');
        }
        this.customHandlers[name] = handler;
    }

    getFields () {
        return Array.from(this.form.querySelectorAll(FIELD_VALUES)).filter(f =>
            !(f.hasAttribute('type') && f.getAttribute('type') === 'hidden') &&
            !f.hasAttribute('disabled') &&
            !f.hasAttribute('data-novalidate')
        );
    }

}


