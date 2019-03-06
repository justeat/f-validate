import TestUtils from 'js-test-buddy';
import FormValidation from '../src';

describe('hybridMode', () => {

    it('should throw error if hyrbid mode is used with a validateOn event', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                        <input required>
                                    </form>`);
        const form = document.querySelector('form');

        // Act & Assert
        expect(() => {
            // eslint-disable-next-line no-new
            new FormValidation(form, {
                hybridMode: true,
                validateOn: 'blur'
            });
        }).toThrowError('f-validate: hybridMode cannot be used with the validateOn option');

    });

    it('should throw error if hyrbid mode is used with grouped errors', () => {

        // Arrange
        TestUtils.setBodyHtml(`<form>
                                        <input required value="x" />
                                        <input required>
                                    </form>`);
        const form = document.querySelector('form');

        // Act & Assert
        expect(() => {
            // eslint-disable-next-line no-new
            new FormValidation(form, {
                hybridMode: true,
                groupErrorPlacement: true
            });
        }).toThrowError('f-validate: hybridMode cannot be used if errors are grouped');

    });
});
