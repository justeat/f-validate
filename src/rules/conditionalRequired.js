export default {
    condition: field => field.hasAttribute('data-val-conditionalRequired'),

    test: field => {
        const input = document.querySelector(`[name='${field.getAttribute('data-val-conditionalRequired')}']`);
        const isChecked = input ? input.checked : true;

        return isChecked || (!isChecked && field.value.length > 0);
    },

    defaultMessage: 'This date must be in the future.'
};
