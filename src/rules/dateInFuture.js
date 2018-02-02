import $ from '@justeat/f-dom';
import CONSTANTS from '../constants';

export default {
    condition: field => field.hasAttribute('data-val-dateInFuture'),

    test: (element, current) => {

        const dateToday = new Date();
        const currentMonth = dateToday.getMonth() + 1;
        const currentYear = dateToday.getFullYear();

        const selectedMonthEl = $.first('[data-val-dateInFuture-type="month"]', element);
        const selectedYearEl = $.first('[data-val-dateInFuture-type="year"]', element);
        const selectedMonthVal = Number(selectedMonthEl.value);
        const selectedYearVal = Number(selectedYearEl.value);

        // Only applies to blur/keyup validation
        if (current) {
            const notInErrorState = !current.field.classList.contains(CONSTANTS.cssClasses.hasError);
            const monthNotTouched = selectedMonthVal === 0 && !selectedMonthEl.hasAttribute('data-touched');
            const yearNotTouched = selectedYearVal === 0 && !selectedYearEl.hasAttribute('data-touched');

            // If one select has not been interacted with do not set to invalid
            if (notInErrorState && (monthNotTouched || yearNotTouched)) {
                return true;
            }
        }

        if (selectedYearVal > currentYear && selectedMonthVal > 0) {
            return true;
        }

        return selectedYearVal === currentYear && selectedMonthVal >= currentMonth;

    },

    preCondition: (element, current) => {
        if (!current) {
            return;
        }
        current.childField.setAttribute('data-touched', true);
    },

    defaultMessage: 'This date must be in the future.'
};
