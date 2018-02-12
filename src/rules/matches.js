export default {
    condition: field => field.hasAttribute('data-val-equalto'),

    test: field => {
        const matchedFieldName = field.getAttribute('data-val-equalto').replace('*.', '');

        if (matchedFieldName) {
            const input = document.querySelector(`input[name=${matchedFieldName}]`);

            return matchedFieldName && input && field.value === input.value;
        }

        return false;
    },

    defaultMessage: 'This field does not match the {0} field.',

    defaultMessageValue: field => field.getAttribute('data-val-equalto').replace('*.', '')
};
