import * as cheerio from 'cheerio';
import axios from 'axios';
import https from 'https';
import { Currency } from '../types/currency.js';
import { parseBCVNumber } from '../utils/helpers.js';

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

            const dateFee = $('.date-display-single').first().text().trim();

            const rates: Currency[] = [
                {
                    symbol: '€',
                    name: 'Euro',
                    price: parseBCVNumber($('#euro strong').text().trim()), 
                    date: dateFee
                },
                {
                    symbol: '$',
                    name: 'Dolar',
                    price: parseBCVNumber($('#dolar strong').text().trim()),
                    date: dateFee
                }
            ];
            return rates;
        } catch (error) {
            throw new Error(`Error fetching exchange rates: ${error}`);
            return [];
        }
    }
}