import { BCVScraper } from './services/scraper.js';

async function scraper() {
    const scraper = new BCVScraper();
    console.log("Iniciando prueba del scraper...");
    
    try {
        const rates = await scraper.getExchangeRates();
        console.log("Tasas obtenidas:", rates);
        console.log("✅ Prueba finalizada con éxito.");

    } catch (error) {
        console.error("❌ Falló la prueba:", error);
    }
}

scraper();