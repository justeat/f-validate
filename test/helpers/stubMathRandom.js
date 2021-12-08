const stubMathRandom = () => {
    beforeEach(() => {
        global.Math.random = jest.fn(() => 0.1234);
    });

    afterEach(() => {
        global.Math.random = Math.random;
    });
};

export default stubMathRandom;
