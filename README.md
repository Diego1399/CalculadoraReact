# CalculadoraReact

Calculadora web con diseño minimalista estilo **Deep Ocean**, construida con React 18. Soporta las cuatro operaciones básicas, encadenamiento de operaciones, porcentaje y cambio de signo.

## Vista general

- Interfaz circular con paleta Deep Ocean (azul marino + cyan)
- Botón `0` ancho (estilo iOS), fuente del display adaptable por longitud
- Indicador visual del operador activo
- Lógica separada de la UI en `src/logic/`

## Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | React 18.3 |
| Estilos | CSS plano con custom properties (tokens) |
| Build | Create React App / Webpack |
| Routing | react-router-dom 6 (disponible, sin usar aún) |
| Testing | Jest + @testing-library/react |

## Estructura del proyecto

```
src/
├── App.js                        # Componente raíz
├── App.css                       # Layout centrado
├── index.css                     # Tokens de diseño (colores, tamaños)
├── index.js                      # Entry point React
├── components/
│   ├── classic.js                # Calculadora: estado y grid principal
│   ├── classic.css               # Estilos del contenedor y display
│   ├── header.js                 # Header (disponible, sin usar)
│   └── buttons/
│       ├── button.js             # Componente botón (variantes: number, operator, special)
│       └── button.css            # Estilos de botones por variante
└── logic/
    ├── calculate.js              # Operaciones aritméticas (+, -, ×, ÷)
    ├── display.js                # Formateador del valor en pantalla
    └── isNumber.js               # Utilidad: detecta si un caracter es dígito
```

## Tokens de diseño

Todos los colores y tamaños se definen como CSS custom properties en `src/index.css`:

```css
:root {
    --color-bg: #0d1117;           /* Fondo azul marino */
    --color-btn-number: #1e2d3d;   /* Botones numéricos */
    --color-btn-operator: #00b4d8; /* Botones operadores (cyan) */
    --color-btn-special: #2d4a6b;  /* Botones especiales (AC, ±, %) */
    --color-text: #e0f7fa;         /* Texto general */
    --color-text-special: #e0f7fa; /* Texto botones especiales */
    --btn-size: 80px;
    --btn-gap: 14px;
    --btn-border-radius: 50%;
    --display-font-size: 80px;
}
```

Para cambiar la paleta completa basta con editar estos valores.

## Ramas

| Rama | Contenido |
|---|---|
| `main` | Código estable integrado |
| `feature/frontend` | UI, componentes y estilos |
| `feature/logic` | Lógica de cálculo y display |

## Instalación

**Requisitos:** Node.js 16+ y npm.

```bash
# Clonar el repositorio
git clone https://github.com/Diego1399/CalculadoraReact.git
cd CalculadoraReact/calculator

# Instalar dependencias
npm install
```

## Comandos

```bash
# Servidor de desarrollo (http://localhost:3000)
npm start

# Ejecutar tests
npm test

# Build de producción (carpeta /build)
npm run build
```

## Versiones

| Versión | Descripción |
|---|---|
| `v0.1.0` | Primera versión: UI Deep Ocean + lógica de cálculo completa |
