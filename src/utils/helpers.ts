export const parseBCVNumber = (value: string): number => {
    // Elimina espacios y cambia la coma por punto
    const cleanValue = value.trim().replace(',', '.');
    const number = parseFloat(cleanValue);
    return isNaN(number) ? 0 : number;
}
