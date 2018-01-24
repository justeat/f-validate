import $ from '@justeat/f-dom';

export default {
    condition: field => field.hasAttribute('data-val-date-in-future'),

    test: element => {

        const dateToday = new Date();
        const currentMonth = dateToday.getMonth() + 1;
        const currentYear = dateToday.getFullYear();

        const selectedMonth = Number($.first('[data-val-custom-type="month"]', element).value);
        const selectedYear = Number($.first('[data-val-custom-type="year"]', element).value);

        if (selectedYear > currentYear && selectedMonth > 0) {
            return true;
        }

        return selectedYear === currentYear && selectedMonth > currentMonth;

    },

    defaultMessage: 'This date must be in the future.'
};
