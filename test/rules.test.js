import testDefinitions from '../src/rules';

describe('rule definitions', () => {

    it('required rule should exist', () => {

        expect(testDefinitions).toHaveProperty('required');

    });

    it('maxlength rule should exist', () => {

        expect(testDefinitions).toHaveProperty('maxlength');

    });

    it('minlength rule should exist', () => {

        expect(testDefinitions).toHaveProperty('minlength');

    });

    it('pattern rule should exist', () => {

        expect(testDefinitions).toHaveProperty('pattern');

    });

    it('email rule should exist', () => {

        expect(testDefinitions).toHaveProperty('email');

    });

    it('matches rule should exist', () => {

        expect(testDefinitions).toHaveProperty('matches');

    });

    it('requiredIfOtherInputNotchecked rule should exist', () => {

        expect(testDefinitions).toHaveProperty('requiredIfOtherInputNotchecked');

    });

    it('custom rule should exist', () => {

        expect(testDefinitions).toHaveProperty('custom');

    });

});


describe('rule structure', () => {

    const definitionKeys = Object.keys(testDefinitions);

    it('Each rule definition should have a "condition" property', () => {

        // Arrange
        definitionKeys.forEach(key => {

            expect(testDefinitions[key]).toHaveProperty('condition');

        });

    });

    it('Each rule definition should have a "test" property', () => {

        // Arrange
        definitionKeys.forEach(key => {

            expect(testDefinitions[key]).toHaveProperty('test');

        });

    });

});
