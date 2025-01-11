
export const toLocaleString = (date: string): string => {
    if (date == null) {
        return ""
    }
    return new Date(date).toLocaleString('en-US');
}

export const mm_dd_yy = (date: string): string => {
    if (date == null) {
        return ""
    }
    return new Date(date).toLocaleString('en-US', {day: '2-digit', year: 'numeric', month: "2-digit"});
}