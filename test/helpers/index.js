const createEvent = eventType => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(eventType, true, true);
    return event;
};

const stubDate = date => {

    const stubbedDate = new Date(date);

    beforeEach(() => {
        global.Date = jest.fn(() => stubbedDate);
    });

    afterEach(() => {
        global.Date = Date;
    });

};

export {
    createEvent,
    stubDate
};
