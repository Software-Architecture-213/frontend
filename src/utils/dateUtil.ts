const dateToYYYYMMdd = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export { dateToYYYYMMdd }