import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { Currency } from '../types/currency';

export class StorageService {
    private readonly filePath = './store/tasas.json';

    async saveRates(rates: Currency[]): Promise<void> {
        try {
            // Convierte el array a string con formato legible
            const data = JSON.stringify(rates, null, 2);
            
            // Asegurar que el directorio existe
            await mkdir(dirname(this.filePath), { recursive: true });

            // Escribe el archivo en la raíz del proyecto
            await writeFile(this.filePath, data, 'utf-8');
            console.log(`✅ Datos guardados exitosamente en ${this.filePath}`);

        } catch (error) {
            console.error('❌ Error al guardar el archivo JSON:', error);
        }
    }
}