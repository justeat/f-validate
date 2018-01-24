import TestUtils from 'js-test-buddy';
import FormValidation from '../../src';

describe('dateInFuture validation rules', () => {

    const stubbedDate = new Date('Oct 16, 2020');

    beforeEach(() => {
        global.Date = jest.fn(() => stubbedDate);
    });

    afterEach(() => {
        global.Date = Date;
    });

    it('should return true if year selected is beyond current year', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-date-in-future>
                                     <select data-val-custom-type="year">
                                        <option value="" ></option>
                                        <option value="2021" selected></option>
                                    </select>
                                    <select data-val-custom-type="month">
                                        <option value="" ></option>
                                        <option value="01" selected></option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return false if year selected is current year, and month is current month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <div class="validation-group"
                                        data-val-date-in-future>
                                    <select data-val-custom-type="year">
                                        <option value="" ></option>
                                        <option value="2020" selected></option>
                                    </select>
                                    <select data-val-custom-type="month">
                                        <option value="" ></option>
                                        <option value="10" selected></option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return true if year selected is current year, and month selected is future month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                    <div class="validation-group"
                                        data-val-date-in-future>
                                        <select data-val-custom-type="year">
                                            <option value="" ></option>
                                            <option value="2020" selected></option>
                                        </select>
                                        <select data-val-custom-type="month">
                                            <option value="" ></option>
                                            <option value="11" selected></option>
                                        </select>
                                    </div>
                                </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(true);

    });

    it('should return false if year selected is current year, and month selected is previous month', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-date-in-future>
                                    <select data-val-custom-type="year">
                                        <option value="" ></option>
                                        <option value="2020" selected></option>
                                    </select>
                                    <select data-val-custom-type="month">
                                        <option value="" ></option>
                                        <option value="9" selected></option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

    it('should return false if year selected is next year, and month is not selected', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                <div class="validation-group"
                                    data-val-date-in-future>
                                    <select data-val-custom-type="year">
                                        <option value="" ></option>
                                        <option value="2021" selected></option>
                                    </select>
                                    <select data-val-custom-type="month">
                                        <option value="" ></option>
                                        <option value="0" selected></option>
                                    </select>
                                </div>
                            </form>`);

        const form = document.querySelector('form');
        const validateForm = new FormValidation(form);

        // Act
        const isFormValid = validateForm.isValid();

        // Assert
        expect(isFormValid).toBe(false);

    });

});
