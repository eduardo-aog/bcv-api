import express from 'express';
import cors from 'cors';
import { BCVScraper } from './services/scraper';
import { StorageService } from './services/storage';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middlewares
app.use(cors());
app.use(express.json());

// Instanciar servicios
const scraper = new BCVScraper();
const storage = new StorageService();

// El endpoint se basa en la URL original de Render
app.get('', async (req, res) => {
    res.send('BCV API is running. Access /rates to get exchange rates.');
});

app.get('/rates', async (req, res) => {
    try {
        console.log(`[${new Date().toISOString()}] Petición GET a /api/rates`);
        
        // Ejecuta el scraper
        const rates = await scraper.getExchangeRates();

        if (rates && rates.length > 0) {
            // Guarda en disco sin bloquear la respuesta
            storage.saveRates(rates).catch(error => {
                console.error("Error guardando tasas en archivo:", error);
            });
            
            // Retorna los datos como JSON a la misma solicitud
            res.json(rates);
        } else {
            res.status(500).json({ error: "No se pudieron obtener las tasas de cambio o la lista está vacía." });
        }
    } catch (error) {
        console.error("Error al procesar la petición /api/rates:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener las tasas." });
    }
});

// Endpoint de salud / status para Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de BCV Scraper corriendo en el puerto ${PORT}`);
    console.log(`- Endpoint principal: http://localhost:${PORT}/`);
    console.log(`- Tasas de cambio: http://localhost:${PORT}/rates`);
    console.log(`- Health Check: http://localhost:${PORT}/health`);
});