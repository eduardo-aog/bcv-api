import { BCVScraper } from './services/scraper.js';

async function scraper() {
    const scraper = new BCVScraper();
    console.log("Obteniendo tasas...\n");
    
    try {
        const rates = await scraper.getExchangeRates();
        console.log("Tasas obtenidas:\n", rates);
        console.log("\n✅ Prueba finalizada con éxito.");

    } catch (error) {
        console.error("❌ Fallo en la prueba. Error:", error);
    }
}

scraper();