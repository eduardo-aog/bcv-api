import { BCVScraper } from './services/scraper';
import { StorageService } from './services/storage';

async function main() {
    const scraper = new BCVScraper();
    const storage = new StorageService();

    try {
        // Obtiene las tasas
        const rates = await scraper.getExchangeRates();

        // Guarda en JSON
        if (rates && rates.length > 0) {
            await storage.saveRates(rates);
        }

    } catch (error) {
        console.error("Fallo en la ejecución. Error:", error);
    }
}

main();