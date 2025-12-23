export const getPastEvents = (activities) => {
    const today = new Date();
    return activities.filter(a => new Date(a.date) < today).sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getFutureEvents = (activities) => {
    const today = new Date();
    return activities.filter(a => new Date(a.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const getNextEvent = (activities) => {
    const futureEvents = getFutureEvents(activities);
    return futureEvents.length > 0 ? futureEvents[0] : null;
};
