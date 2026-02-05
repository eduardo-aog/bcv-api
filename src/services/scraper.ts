import * as cheerio from 'cheerio';
import axios from 'axios';
import https from 'https';
import { Currency } from '../types/currency';
import { parseBCVNumber } from '../utils/helpers';

export class BCVScraper {
    readonly url = 'https://www.bcv.org.ve/';

    axiosInstance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });

    async getExchangeRates(): Promise<Currency[]> {
        try {
            const { data } = await this.axiosInstance.get(this.url);
            const $ = cheerio.load(data);

            const dateNonFormat = $('.date-display-single').first().attr('content');
            const dateByDayFormat = $('.date-display-single').first().text().trim();

            const formattedDate = dateNonFormat ? dateNonFormat.split('T')[0] : new Date().toISOString().split('T')[0];

            const rates: Currency[] = [
                {
                    symbol: '€',
                    iso4217: 'EUR',
                    name: 'Euro',
                    price: parseBCVNumber($('#euro strong').text().trim()), 
                    date: formattedDate,
                    day: dateByDayFormat
                },
                {
                    symbol: '¥',
                    iso4217: 'CNY',
                    name: 'Yuan',
                    price: parseBCVNumber($('#yuan strong').text().trim()),
                    date: formattedDate,
                    day: dateByDayFormat
                },
                {
                    symbol: '₺',
                    iso4217: 'TRY',
                    name: 'Lira',
                    price: parseBCVNumber($('#lira strong').text().trim()),
                    date: formattedDate,
                    day: dateByDayFormat
                },
                {
                    symbol: '₽',
                    iso4217: 'RUB',
                    name: 'Rublo',
                    price: parseBCVNumber($('#rublo strong').text().trim()),
                    date: formattedDate,
                    day: dateByDayFormat
                },
                {
                    symbol: '$',
                    iso4217: 'USD',
                    name: 'Dolar',
                    price: parseBCVNumber($('#dolar strong').text().trim()),
                    date: formattedDate,
                    day: dateByDayFormat
                }
            ];
            const isValid = rates.every(rate => rate.price > 0);

            if (!isValid) {
                console.error("ERROR: Una o mas tasas tienen valor cero. Revisar script.");
            }
            return rates;

        } catch (error) {
            throw new Error(`Fallo al hallar las tasas. Error: ${error}`);
            return [];
        }
    }
}