export interface Currency {
    symbol: string 
    iso4217: string 
    name: string
    price: number // Tasa del dia en bolívares
    date: string // Fecha en formato YYYY-MM-DD
    day: string // Fecha en formato textual
}