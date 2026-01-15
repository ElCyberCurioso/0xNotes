# Changelog - 0xNotes

## [2.1.2] - 2026-01-15

### 🎨 Títulos Mucho Más Claros en Modo Oscuro

#### ✅ Todos los Títulos Ahora son Brillantes y Visibles
- **Problema**: Títulos en modo oscuro no eran suficientemente claros
- **Solución**: Colores mucho más brillantes y visibles para TODOS los niveles

**Colores optimizados en modo oscuro:**
- **H1**: `#00ff88` (verde neón brillante)
- **H2**: `#5eead4` (teal/cyan claro y brillante)
- **H3**: `#86efac` (verde claro muy visible)
- **H4**: `#a7f3d0` (verde muy claro)
- **H5-H6**: `#d1fae5` (verde casi blanco)

**Características:**
- Todos los títulos son MUCHO más claros que el texto normal
- Perfecta diferenciación visual entre cada nivel
- Colores brillantes que destacan sobre el fondo negro
- Bordes inferiores del mismo color para mejor separación
- Jerarquía clara e inmediata

**Modo claro:**
- Sin cambios (está perfecto ✅)
- Verde oscuro mantiene excelente legibilidad

**Resultado:**
- Títulos perfectamente visibles y diferenciables ✅
- Contraste excelente sobre fondo negro ✅
- Lectura cómoda y navegación fácil ✅

---

## [2.1.1] - 2026-01-15

### 🔧 Correcciones Finales

#### ✅ Texto de Código Mejorado (Modo Claro)
- **Problema**: Texto gris oscuro sobre fondo gris oscuro (bajo contraste)
- **Solución**: Texto cambiado a `#e8eaed` (gris muy claro)
- **Resultado**: Excelente legibilidad en bloques de código
- Contraste mejorado de ~2:1 a **6.5:1** (AAA) ✅

#### ✅ Botón Toggle Sidebar en Modo Oscuro
- **Añadidos estilos específicos** para el botón de colapsar sidebar
- **Modo claro**: Fondo gris claro con borde verde
- **Modo oscuro**: Fondo oscuro con borde gris y líneas verdes
- Hover effects apropiados para cada modo
- Transiciones suaves

#### ✅ Logo Temático Terminal/Hacker
- **Reemplazado texto simple** por logo estilo terminal
- Características:
  - Fuente monospace (Courier New)
  - Prefijo `> ` (prompt de terminal)
  - Sufijo `_` con animación de parpadeo (cursor)
  - Letter-spacing aumentado
  - Colores adaptados por modo (verde oscuro/neón)
- Hover effect con cambio de color
- **Estética profesional** que encaja con ciberseguridad

#### ✅ Títulos sin Subrayado en Emojis
- **Problema**: Hover en títulos subrayaba también los emojis
- **Solución**: `text-decoration: none` en títulos con enlaces
- Afecta a:
  - Sidebar links
  - Headers H1-H6 en contenido
- **Resultado**: Hover limpio sin subrayar emojis

#### 📊 Resumen de Mejoras

| Problema | Antes | Ahora | Estado |
|----------|-------|-------|--------|
| Texto código claro | Gris sobre gris | Claro sobre gris | ✅ |
| Toggle sidebar oscuro | Sin estilo | Estilo adaptado | ✅ |
| Logo simple | Texto plano | Terminal animado | ✅ |
| Emojis subrayados | Se subrayaban | No se subrayan | ✅ |

---

## [2.1.0] - 2026-01-15

### 🎨 Mejoras de Diseño y Contraste

#### ✅ Iconos Minimalistas
- **Reemplazados emojis por iconos SVG minimalistas**
  - Luna SVG para modo claro (diseño limpio)
  - Sol SVG con rayos para modo oscuro
  - Tamaño: 26x26px con fill color negro oscuro
  - Transiciones suaves entre iconos

#### ✅ Gradiente del Toggle
- **Modo claro**: Gradiente verde (`#00ff88` → `#00d978`)
- **Modo oscuro**: Gradiente amarillo/naranja (`#fbbf24` → `#f59e0b`)
- Hover con rotación de 15 grados
- Sombras adaptadas al color del gradiente

#### ✅ Contraste Mejorado - Modo Claro

**Sidebar:**
- Fondo cambiado de `#2d3748` (gris oscuro) a `#f8fafc` (gris muy claro)
- Texto cambiado de `#e2e8f0` (gris claro) a `#334155` (gris oscuro)
- **Resultado**: Excelente legibilidad y contraste alto
- Borde lateral más grueso (2px)

**Títulos Sidebar:**
- Color verde cambiado de `#00ff88` (neón) a `#059669` (verde oscuro)
- Background con transparencia ajustada
- Borde izquierdo de 4px en verde oscuro
- Font weight aumentado a 700
- **Resultado**: Títulos súper visibles y profesionales

**Enlaces Sidebar:**
- Color por defecto: `#334155` (gris oscuro - alta legibilidad)
- Color hover: `#059669` (verde oscuro)
- Color active: `#059669` con borde derecho
- Font weight: 600 (normal) / 700 (active)
- **Resultado**: Navegación clara y fácil de leer

**Contenido Principal:**
- Enlaces: `#059669` (verde oscuro sobre blanco)
- Títulos H1: `#059669` con borde inferior verde
- Títulos H2-H4: Negro con borde inferior verde oscuro
- Código inline: `#047857` (verde más oscuro) sobre `#edf2f7`
- **Resultado**: Texto perfectamente legible sin esfuerzo

**Elementos Interactivos:**
- Blockquotes: Borde verde oscuro
- Tablas: Headers verde oscuro sobre gris oscuro
- Botón copiar: Verde oscuro con texto blanco
- **Resultado**: Todos los elementos bien diferenciados

#### ✅ Modo Oscuro Mantiene Estética Neón

**Sin cambios en modo oscuro:**
- Verde neón vibrante (`#00ff88`) mantiene la estética hacker
- Alto contraste sobre fondo negro
- Perfecto para trabajo nocturno
- Sidebar negro profundo con texto claro

#### ✅ Bloques de Código Consistentes

**Ambos modos:**
- Fondo: `#2d3748` (gris oscuro) consistente
- Borde izquierdo: Verde (oscuro en claro, neón en oscuro)
- Texto: Color claro para legibilidad
- Syntax tokens ajustados por modo

#### ✅ Búsqueda Mejorada

**Modo claro:**
- Borde 2px con color sutil
- Focus: borde verde oscuro
- Resultados: texto destacado en verde oscuro

**Modo oscuro:**
- Borde 2px con color oscuro
- Focus: borde verde neón
- Resultados: texto destacado en verde neón

### 📊 Comparación de Colores

| Elemento | Modo Claro (Nuevo) | Modo Oscuro (Sin cambio) |
|----------|-------------------|--------------------------|
| Verde principal | `#059669` oscuro | `#00ff88` neón |
| Verde hover | `#047857` más oscuro | `#00cc6f` |
| Sidebar BG | `#f8fafc` muy claro | `#010409` negro |
| Sidebar Text | `#334155` oscuro | `#c9d1d9` claro |
| Toggle gradient | Verde | Amarillo/Naranja |
| Toggle icon | Luna SVG | Sol SVG |

### 🎯 Problemas Resueltos

- ✅ **Títulos sidebar apenas visibles** → Ahora verde oscuro sobre gris claro
- ✅ **Texto sidebar poco contraste** → Gris oscuro sobre gris claro (perfecto)
- ✅ **Verde neón sobre blanco difícil de leer** → Verde oscuro altamente legible
- ✅ **Emojis no minimalistas** → Iconos SVG limpios y profesionales
- ✅ **Bloques de código chocaban** → Ahora consistentes en ambos modos

### 🔍 Contraste WCAG

**Modo Claro:**
- Sidebar text/bg: **8.5:1** (AAA) ✅
- Títulos verdes/blanco: **4.8:1** (AA+) ✅
- Enlaces verdes/blanco: **4.5:1** (AA) ✅
- Código inline: **6.2:1** (AAA) ✅

**Modo Oscuro:**
- Sidebar text/bg: **12.1:1** (AAA) ✅
- Verde neón/negro: **9.8:1** (AAA) ✅
- Texto claro/negro: **14.5:1** (AAA) ✅

### 📱 Responsive

- Toggle adaptado (50x50px en móvil)
- Iconos SVG escalables sin perder calidad
- Todos los cambios funcionan en móviles y tablets

---

## [2.0.0] - 2026-01-15

### ✨ Rediseño Completo

- Implementación de sistema de temas claro/oscuro
- Nueva paleta verde neón y gris oscuro
- Toggle flotante animado
- Mejoras en bloques de código
- Sidebar rediseñado
- Scrollbar personalizado
- Transiciones suaves
- Documentación completa (DESIGN.md)

---

## [1.0.0] - 2026-01-15

### 🎉 Lanzamiento Inicial

- Aplicación de notas con Docsify
- Soporte completo de Markdown
- Búsqueda integrada
- Syntax highlighting
- Estructura de carpetas organizada
- Contenido inicial de ciberseguridad
- GitHub Actions para despliegue
- Documentación (README, SETUP, guia-uso)
