const getRandomColor = () => {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
}

const getRandomColorArray = (length: number) => {
    let colors: string[] = [];
    for (let i = 0; i < length; i++) {
        let color = getRandomColor();
        if (colors.includes(color)) {
            i--;
            continue;
        }
        colors.push(color);
    }
    return colors;
}

export { getRandomColor, getRandomColorArray }