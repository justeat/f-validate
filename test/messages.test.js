import TestUtils from 'js-test-buddy';
import FormValidation from '../src';

describe('error messages', () => {

    describe('custom', () => {

        it('should apply error class to invalid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required data-required-error="custom required error message" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should not apply error class to valid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required value="x" data-required-error="custom required error message" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should replace existing error message with new', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input 
                                        required 
                                        maxlength="3" 
                                        data-required-error="custom required error message"
                                        data-maxlength-error="custom maxlength error message"
                                    /> 
                                </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input invalid due to maxlength exceeded
            input.value = 'xxxx';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should hide error message if field is now valid', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required data-required-error="custom required error message" />
                                    </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input valid
            input.value = 'x';

            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

        });

    });

    describe('default', () => {

        it('should apply error class to invalid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should not apply error class to valid field', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required value="x" />
                                </form>`);
            const form = document.querySelector('form');
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should replace existing error message with new', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required maxlength="3" />
                                </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input invalid due to maxlength exceeded
            input.value = 'xxxx';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should hide error message if field is now valid', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                        <input required />
                                    </form>`);
            const form = document.querySelector('form');
            const input = form.querySelector('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input valid
            input.value = 'x';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

    });

    describe('grouped', () => {

        it('should display error messages grouped at the bottom (default)', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" value="x" />
                                </form>`);
            const form = document.querySelector('form', {
                groupErrors: true
            });
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should display error messages grouped at the top', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" value="x" />
                                </form>`);
            const form = document.querySelector('form', {
                groupErrors: true,
                errorPlacementTopOfForm: true
            });
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should not display error messages on valid form', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required value="x" />
                                    <input required minlength="2" value="xx" />
                                </form>`);
            const form = document.querySelector('form', {
                groupErrors: true
            });
            const validateForm = new FormValidation(form);

            // Act
            validateForm.isValid();

            // Assert
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should replace existing group error messages', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" />
                                </form>`);
            const form = document.querySelector('form', {
                groupErrors: true
            });
            const inputs = form.querySelectorAll('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make input invalid due to maxlength exceeded
            inputs[0].value = 'x';
            inputs[1].value = 'x';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

        it('should hide existing group error message if group is now valid', () => {

            // Arrange
            TestUtils.setBodyHtml(`<form>
                                    <input required />
                                    <input required minlength="2" />
                                </form>`);
            const form = document.querySelector('form', {
                groupErrors: true
            });
            const inputs = form.querySelectorAll('input');
            const validateForm = new FormValidation(form);

            // Act & Assert
            validateForm.isValid();
            expect(TestUtils.getBodyHtml()).toMatchSnapshot();

            // Make inputs valid
            inputs[0].value = 'x';
            inputs[1].value = 'xx';

            validateForm.isValid();
            const html = TestUtils.getBodyHtml();
            expect(html).toMatchSnapshot();

        });

    });
});
