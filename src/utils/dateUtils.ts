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
    return new Date(date).toLocaleString('en-US', { day: '2-digit', year: 'numeric', month: "2-digit" });
}


export const yyyy_mm_dd = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}