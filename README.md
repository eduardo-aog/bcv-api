# BCV Scraper Script

Script desarrollado en TypeScript para la extracción automatizada (scraping) de las tasas de cambio oficiales publicadas por el Banco Central de Venezuela (BCV).

## Características

- **Tecnologías**: Construido con TypeScript para mayor robustez y tipado estático.
- **Scraping**: Utiliza `cheerio` para el parseo de HTML y `axios` para las peticiones HTTP.
- **Validaciones**: Verifica que las tasas extraídas sean valores numéricos válidos mayores a cero.
- **Almacenamiento Local**: Guarda los resultados automáticamente en un archivo JSON estructurado.
- **Manejo de Errores**: Incluye manejo de excepciones y validaciones de seguridad (SSL/TLS).

## Requisitos Previos

- **Node.js**: Versión 18.0.0 o superior.
- **NPM**: Gestor de paquetes incluido con Node.js.

## Instalación

1.  Clona este repositorio:
    ```bash
    git clone https://github.com/eduardo-aog/bcv-script
    ```
2.  Entra al directorio del proyecto:
    ```bash
    cd bcv-script
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

### Modo Desarrollo

Para ejecutar el script en modo de desarrollo (utilizando `ts-node`):

```bash
npm run dev
```

Para ejecutar en modo observador (reinicia automáticamente al detectar cambios):

```bash
npm run dev:watch
```

### Modo Producción

Para compilar y ejecutar la versión optimizada de JavaScript:

1.  **Compilar el código TypeScript:**

    ```bash
    npm run build
    ```

    Esto generará los archivos JavaScript en la carpeta `dist/`.

2.  **Ejecutar el script compilado:**
    ```bash
    npm start
    ```

### Comandos Adicionales

- `npm run clean`: Elimina la carpeta `dist`.
- `npm run lint`: Ejecuta la verificación de tipos (TypeScript check).

## Estructura de Datos

El script extrae las tasas para las siguientes monedas:

- Euro (€)
- Yuan (¥)
- Lira (₺)
- Rublo (₽)
- Dólar ($)

### Salida (Output)

Los datos se guardan en el archivo `./store/tasas.json` con el siguiente formato:

```json
[
  {
    "symbol": "€", // Simbolo de la divisa
    "iso4217": "EUR", // Codigo ISO 4217 de la divisa
    "name": "Euro", // Nombre de la divisa
    "price": 45.50, // Divisa al cambio en bolívares
    "date": "2023-10-27", // Formato de fecha (YYYY-MM-DD)
    "day": "Viernes, 27 Octubre 2023" // Formato textual
  },
  ...
]
```

## Estructura del Proyecto

```text
bcv-script/
├── src/
│   ├── services/
│   │   ├── scraper.ts  # Lógica de scraping con Cheerio
│   │   └── storage.ts  # Servicio de almacenamiento de archivos
│   ├── types/
│   │   └── currency.ts # Definiciones de interfaces TypeScript
│   ├── utils/          # Utilidades auxiliares
│   └── index.ts        # Punto de entrada de la aplicación
├── store/              # Directorio donde se guardan los resultados (tasas.json)
├── dist/               # Código compilado (generado por npm run build)
├── package.json        # Dependencias y scripts
├── tsconfig.json       # Configuración de TypeScript
└── README.md           # Documentación del proyecto
```

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `package.json` para más detalles.


