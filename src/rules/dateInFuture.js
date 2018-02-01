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
            // Apply dirty class if select has been interacted with
            current.childField.classList.add(CONSTANTS.cssClasses.isDirty);

            // If one select has not been interacted with do not set to invalid
            if (!current.field.classList.contains(CONSTANTS.cssClasses.hasError) &&
                ((selectedMonthVal === 0 && !selectedMonthEl.classList.contains(CONSTANTS.cssClasses.isDirty)) ||
                    (selectedYearVal === 0 && !selectedYearEl.classList.contains(CONSTANTS.cssClasses.isDirty)))) {
                return true;
            }
        }

        if (selectedYearVal > currentYear && selectedMonthVal > 0) {
            return true;
        }

        return selectedYearVal === currentYear && selectedMonthVal >= currentMonth;

    },

    defaultMessage: 'This date must be in the future.'
};
