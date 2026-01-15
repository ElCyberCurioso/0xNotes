# 🎨 Guía de Diseño - 0xNotes

## Paleta de Colores

### Verde - Adaptado por Modo

#### Modo Claro (Alto Contraste)
- **Light Green**: `#059669` - Verde oscuro para títulos y enlaces
- **Light Green Dark**: `#047857` - Hover states
- **Light Green Hover**: `#10b981` - Estados interactivos
- Estos tonos más oscuros aseguran **excelente legibilidad** sobre fondo blanco

#### Modo Oscuro (Neón Vibrante)
- **Primary Green**: `#00ff88` - Verde neón para títulos y enlaces
- **Primary Green Dark**: `#00cc6f` - Hover states y acentos
- **Secondary Green**: `#00d978` - Elementos secundarios
- **Accent Green**: `#00ff9d` - Detalles y highlights
- Estos tonos brillantes crean la estética "terminal hacker"

### Gris y Fondos

#### Modo Claro
- **Background**: `#ffffff` - Fondo blanco limpio
- **Secondary Background**: `#f8f9fa` - Fondos alternativos
- **Sidebar**: `#f8fafc` - Gris muy claro (mejorado contraste)
- **Sidebar Text**: `#334155` - Gris oscuro (alta legibilidad)
- **Text**: `#1a202c` - Texto principal negro
- **Border**: `#e2e8f0` - Bordes sutiles
- **Code Blocks**: `#2d3748` - Gris oscuro para código

#### Modo Oscuro
- **Background**: `#0d1117` - Negro suave estilo GitHub
- **Secondary Background**: `#161b22` - Fondos alternativos
- **Sidebar**: `#010409` - Negro profundo
- **Sidebar Text**: `#c9d1d9` - Texto claro
- **Text**: `#e6edf3` - Texto claro
- **Border**: `#30363d` - Bordes sutiles
- **Code Blocks**: `#1c2128` - Negro con tinte azul

## Características del Diseño

### 💻 Logo Terminal

**Diseño:**
- Fuente: `'Courier New', monospace`
- Tamaño: 24px
- Letter-spacing: 2px
- Formato: `> 0xNotes_`
  - `> ` - Prompt de terminal
  - `0xNotes` - Nombre de la app
  - `_` - Cursor parpadeante (animación 1s)

**Colores:**
- **Modo claro**: Verde oscuro (`#059669`)
- **Modo oscuro**: Verde neón (`#00ff88`)
- **Hover**: Verde más oscuro/claro según modo

**Animación:**
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

### 🌓 Modo Claro/Oscuro

**Toggle Flotante:**
- Botón circular en esquina inferior derecha
- **Gradiente verde** en modo claro → **Gradiente amarillo** en modo oscuro
- Efecto hover con rotación (15deg)
- **Iconos SVG minimalistas**:
  - 🌙 Luna (modo claro) - diseño limpio y simple
  - ☀️ Sol (modo oscuro) - con rayos minimalistas
- Animaciones suaves con transiciones
- Tamaño: 60x60px (50x50px en móvil)
- SVG fill color: negro oscuro (#0d1117)

**Persistencia:**
- El tema elegido se guarda en `localStorage`
- Se mantiene entre sesiones del navegador
- Carga automática del tema guardado

### 📝 Bloques de Código

**Mejoras Implementadas:**
- Fondo gris oscuro consistente (`#2d3748`) en ambos modos
- Texto: `#e8eaed` (gris muy claro) - **Contraste 6.5:1**
- Borde izquierdo verde (4px - oscuro/neón según modo)
- Sombra suave para profundidad
- Padding generoso (20px)
- Border radius redondeado (8px)
- Scrollbar personalizado
- Font: 'Fira Code', 'Consolas', monospace

**Código Inline:**
- Background color distinto del texto normal
- Verde oscuro (`#047857`) en modo claro
- Verde neón en modo oscuro
- Borde sutil para definición
- Font weight bold (600) para legibilidad
- Padding: 3px 8px
- Border radius: 4px

### 🎯 Sidebar (Menú Lateral)

**Títulos de Sección:**
- Color verde (oscuro en claro, neón en oscuro)
- Background con transparencia verde
- Borde izquierdo verde (4px)
- Uppercase y letter-spacing
- Mayor tamaño y peso de fuente

**Enlaces:**
- Color adaptado por modo
- Hover: verde + padding left animado
- Active: verde + borde derecho
- Transiciones suaves
- Font weight 600/700

**Botón Toggle:**
- **Modo claro:**
  - Background: gris claro (`#f8fafc`)
  - Borde: 2px gris claro
  - Líneas: verde oscuro
  - Hover: borde verde
- **Modo oscuro:**
  - Background: gris oscuro (`#161b22`)
  - Borde: 1px gris oscuro
  - Líneas: verde neón
  - Hover: fondo más oscuro
- Border radius: 4px
- Transiciones: 0.2s ease

### 📊 Tablas

**Estilo:**
- Headers con fondo gris oscuro
- Texto de headers en verde
- Bordes sutiles
- Hover effect en filas
- Box shadow ligero
- Padding generoso (12px)

### 💬 Blockquotes / Alertas

**Características:**
- Borde izquierdo verde (4px)
- Background color alternativo
- Padding 16px/20px
- Border radius suave
- Strong text en verde

### 🔗 Enlaces

**Estilo:**
- Color verde (adaptado por modo)
- Font weight 600
- Sin subrayado por defecto
- Hover: verde oscuro/claro + underline
- Transición suave
- `text-decoration-skip-ink: auto` para mejor legibilidad

**Prevención de Subrayado en Emojis:**
- Títulos (H1-H6) con enlaces: `text-decoration: none` en hover
- Sidebar links: `text-decoration: none` en hover
- **Resultado**: Emojis no se subrayan, solo el texto

### 🔘 Botón de Copiar Código

**Mejoras:**
- Background verde neón
- Texto en color oscuro (contraste)
- Font weight 600
- Border radius
- Hover: verde oscuro + scale up
- Transición suave

## Tipografía

### Fuentes
- **Código**: 'Fira Code', 'Consolas', monospace
- **General**: System fonts (optimización performance)

### Tamaños
- **H1**: 2.5em
- **H2-H4**: Variable
- **Código**: 0.9em
- **Body**: 1em base

### Colores de Títulos

#### Modo Claro
- **H1**: `#059669` (verde oscuro) + border-bottom
- **H2-H4**: Negro `#1a202c` + border-bottom verde oscuro
- **Excelente legibilidad** sobre fondo blanco

#### Modo Oscuro (Títulos Ultra Claros)
- **H1**: `#00ff88` (verde neón brillante)
  - Border-bottom: `#00ff88`
- **H2**: `#5eead4` (teal/cyan claro y brillante)
  - Border-bottom: `#5eead4`
- **H3**: `#86efac` (verde claro brillante)
  - Border-bottom: `#86efac`
- **H4**: `#a7f3d0` (verde muy claro)
  - Border-bottom: `#a7f3d0`
- **H5-H6**: `#d1fae5` (verde casi blanco)
  - Sin border-bottom

**Resultado**: Todos los títulos son MUCHO más claros que el texto normal, perfectamente diferenciables

### Pesos
- **Headers**: 700 (bold)
- **Sidebar Titles**: 700
- **Active Links**: 600
- **Normal Links**: 500
- **Body**: 400

## Espaciado

### Márgenes
- Headers: `margin-top: 2em`
- Bloques de código: `margin: 1.5em 0`
- Tablas: `margin: 1.5em 0`
- Blockquotes: `margin: 1.5em 0`

### Padding
- Bloques de código: `20px`
- Código inline: `3px 8px`
- Table cells: `12px`
- Blockquotes: `16px 20px`
- Sidebar titles: `8px 15px`

## Efectos y Animaciones

### Transiciones
- Color changes: `0.3s ease`
- Background: `0.3s ease`
- Transform: `0.2s ease`
- Hover effects: `0.2s ease`

### Hover Effects
- **Theme Toggle**: Scale 1.1 + rotate 15deg
- **Sidebar Links**: Padding-left shift
- **Tables**: Background color change
- **Links**: Color + underline

### Shadows
- **Bloques de código**: `0 4px 6px rgba(0, 0, 0, 0.1)` (light) / `0 4px 12px rgba(0, 0, 0, 0.5)` (dark)
- **Theme Toggle**: `0 4px 12px rgba(0, 255, 136, 0.3)` con hover más intenso
- **Tablas**: `0 2px 4px rgba(0, 0, 0, 0.05)`

### Border Radius
- **Bloques de código**: 8px
- **Código inline**: 4px
- **Blockquotes**: 4px
- **Botones**: 4px
- **Theme Toggle**: 50% (círculo)

## Scrollbar Personalizado

### Estilo
- **Width**: 10px
- **Thumb**: Verde neón
- **Track**: Background secundario
- **Hover**: Verde oscuro
- **Border radius**: 5px

## Responsive Design

### Breakpoint: 768px

**Móvil:**
- Theme toggle más pequeño (50px)
- Padding reducido en contenido (20px)
- Padding reducido en bloques de código (15px)
- Font sizes ajustados

## Accesibilidad

### Contraste
- ✅ Títulos sidebar: Alto contraste (verde sobre gris oscuro)
- ✅ Texto general: WCAG AA compliant
- ✅ Código: Colores diferenciados
- ✅ Enlaces: Suficiente contraste

### Interacción
- Todos los elementos interactivos tienen hover states
- Focus states visibles
- Aria labels en botones
- Transiciones suaves para feedback

## Tokens de Sintaxis (Code Highlighting)

```css
.token.comment { color: #6a9955; }    /* Verde oliva */
.token.string { color: #00ff88; }     /* Verde neón */
.token.keyword { color: #569cd6; }    /* Azul */
.token.function { color: #dcdcaa; }   /* Amarillo pálido */
.token.operator { color: #d4d4d4; }   /* Gris claro */
.token.number { color: #b5cea8; }     /* Verde menta */
.token.property { color: #9cdcfe; }   /* Azul claro */
```

## Mejores Prácticas de Implementación

### CSS Variables
- Uso extensivo de custom properties
- Fácil cambio de temas
- Mantención simplificada
- Consistencia garantizada

### Performance
- Transiciones con `transform` (GPU accelerated)
- Uso de `will-change` donde necesario
- Evitar animaciones costosas
- Carga lazy de recursos

### Mantención
- Variables centralizadas
- Comentarios descriptivos
- Estructura organizada por secciones
- Fácil de extender

## Inspiración y Referencias

Este diseño está inspirado en:
- **GitHub**: Paleta de colores del modo oscuro
- **Matrix**: Verde neón sobre negro
- **Cyberpunk**: Estética futurista
- **GitBook**: Navegación y estructura
- **Terminal**: Estilo hacker/dev

## Personalización Rápida

### Cambiar color principal de verde a otro
```css
:root {
  --primary-green: #ff0088;        /* Cambiar a rosa */
  --primary-green-dark: #cc006f;   /* Rosa oscuro */
}
```

### Hacer sidebar más claro
```css
.sidebar {
  background-color: #4a5568;  /* Gris más claro */
}
```

### Ajustar intensidad del modo oscuro
```css
body.dark-mode {
  --dark-bg: #1a1a1a;  /* Menos negro */
}
```

## Checklist de Compatibilidad

- ✅ Chrome/Edge (último)
- ✅ Firefox (último)
- ✅ Safari (último)
- ✅ Móviles iOS/Android
- ✅ Tablets
- ✅ Pantallas 4K
- ✅ Zoom 50%-200%

## Futuras Mejoras Posibles

- [ ] Más temas preconfigurados (azul, rojo, etc.)
- [ ] Personalización de colores desde UI
- [ ] Animaciones más elaboradas
- [ ] Modo "matrix rain" de fondo
- [ ] Efectos de partículas
- [ ] Tema automático según hora del día
- [ ] Exportar/importar configuración de tema

---

**Última actualización**: Enero 2026  
**Versión**: 2.0 - Rediseño completo con tema claro/oscuro
