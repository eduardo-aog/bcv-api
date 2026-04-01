# BCV API

API desarrollada en TypeScript para la extracción automatizada (scraping) de las tasas de cambio oficiales publicadas por el Banco Central de Venezuela (BCV).

## Características

- **API REST**: Provee endpoints mediante Express.js para acceder fácilmente a las tasas de cambio.
- **Tecnologías**: Construido con TypeScript para mayor robustez y tipado estático.
- **Scraping**: Utiliza `cheerio` para el parseo de HTML y `axios` para las peticiones HTTP.
- **Validaciones**: Verifica que las tasas extraídas sean valores numéricos y estén disponibles.
- **Gestor de Paquetes**: Utiliza `pnpm` para la instalación de dependencias, como cambio representativo en la nueva versión.

## Requisitos Previos

- **Node.js**: Versión 18.0.0 o superior.
- **pnpm**: Gestor de paquetes rápido y eficiente.

## Instalación

1.  Clona este repositorio.
2.  Entra al directorio del proyecto.
3.  Instala las dependencias empleando `pnpm`:
    ```bash
    git clone https://github.com/eduardo-aog/bcv-script
    ```
2.  Entra al directorio del proyecto:
    ```bash
    cd bcv-script
    ```
3.  Instala las dependencias:
    ```bash
    pnpm install
    ```

## Uso

### Modo Desarrollo

Para iniciar el servidor en modo de desarrollo (utilizando `ts-node`):

```bash
pnpm run dev
```

Para ejecutar en modo observador (reinicia automáticamente al detectar cambios con `nodemon`):

```bash
pnpm run dev:watch
```

### Modo Producción

Para compilar y ejecutar la versión optimizada de JavaScript:

1.  **Compilar el código TypeScript:**

    ```bash
    pnpm run build
    ```

    Esto generará los archivos JavaScript en la carpeta `dist/`.

2.  **Ejecutar el servidor compilado:**
    ```bash
    pnpm start
    ```

### Comandos Adicionales

- `pnpm run clean`: Elimina la carpeta `dist`.
- `pnpm run lint`: Ejecuta la verificación de tipos (TypeScript check).

## Endpoints

Una vez iniciado el servidor (por defecto en el puerto 3000), los siguientes endpoints estarán disponibles:

### `GET /rates`
Retorna las tasas de cambio oficiales del BCV en formato JSON.

**Ejemplo de Respuesta:**
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

### `GET /health`
Verifica el estado de salud de la API. Principalmente usado en despliegues (como Render).

**Ejemplo de Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2023-10-27T12:00:00.000Z"
}
```

### `GET /`
Endpoint principal. Muestra un texto indicando cómo utilizar la API y acceder a la ruta de tasas de cambio.

## Estructura del Proyecto

```text
bcv-api/
├── src/
│   ├── services/
│   │   ├── scraper.ts  # Lógica de scraping con Cheerio
│   │   └── storage.ts  # Servicio de almacenamiento de datos para guardado local
│   ├── types/
│   │   └── currency.ts # Interfaces de TypeScript (Currency)
│   ├── utils/
│   │   └── helpers.ts  # Funciones utilitarias (parseBCVNumber)
│   └── index.ts        # Punto de entrada, configuración de Express y endpoints
├── store/              # Directorio heredado de la versión script
├── dist/               # Código compilado (generado por pnpm run build)
├── package.json        # Dependencias y metadata
├── pnpm-lock.yaml      # Lockfile asegurando consistencia con pnpm
├── tsconfig.json       # Configuración de TypeScript
└── README.md           # Documentación
```

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `package.json` para más detalles.
