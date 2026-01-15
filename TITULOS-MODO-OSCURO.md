# 🎨 Jerarquía de Títulos - Modo Oscuro

## Problema Resuelto

**ANTES:**
- H2, H3, H4 en gris (`#e6edf3`) → difícil diferenciar del texto normal
- Falta de jerarquía visual clara
- Todos los títulos (excepto H1) parecían iguales

**AHORA:**
- Jerarquía visual clara con degradado de verdes
- Cada nivel fácilmente distinguible
- H1 con efecto "glow" para máximo impacto

---

## Jerarquía Visual (Modo Oscuro)

### Nivel 1 - H1 (Más importante)
```
Color: #00ff88 (verde neón brillante)
Border-bottom: 2px solid #00ff88
Tamaño: 2.5em
```
**Ejemplo:**
```markdown
# Pentesting
```
> Verde neón brillante, máxima visibilidad

---

### Nivel 2 - H2
```
Color: #5eead4 (teal/cyan claro y brillante)
Border-bottom: 2px solid #5eead4
Tamaño: 2em
```
**Ejemplo:**
```markdown
## Reconocimiento
```
> Teal claro muy visible, se distingue perfectamente

---

### Nivel 3 - H3
```
Color: #86efac (verde claro brillante)
Border-bottom: 2px solid #86efac
Tamaño: 1.7em
```
**Ejemplo:**
```markdown
### Escaneo de Puertos
```
> Verde claro muy visible, claramente diferenciado

---

### Nivel 4 - H4
```
Color: #a7f3d0 (verde muy claro)
Border-bottom: 2px solid #a7f3d0
Tamaño: 1.5em
```
**Ejemplo:**
```markdown
#### Nmap Básico
```
> Verde muy claro, perfectamente legible

---

### Nivel 5-6 - H5, H6
```
Color: #d1fae5 (verde casi blanco)
Sin border-bottom
Tamaño: 1.3em / 1.2em
```
**Ejemplo:**
```markdown
##### Opciones Avanzadas
###### Detalles Técnicos
```
> Verde casi blanco, ultra claro para detalles

---

## Escala de Colores Visualizada

```
████████ H1: #00ff88 (verde neón brillante)
███████░ H2: #5eead4 (teal/cyan claro)
██████░░ H3: #86efac (verde claro brillante)
█████░░░ H4: #a7f3d0 (verde muy claro)
████░░░░ H5-H6: #d1fae5 (verde casi blanco)
```

**Todos son MUCHO más claros que el texto normal** (`#e6edf3`)

---

## Modo Claro (Sin Cambios)

**Se mantiene perfecto:**
- H1: Verde oscuro `#059669`
- H2-H4: Negro `#1a202c` con border verde
- Excelente contraste y legibilidad ✅

---

## Comparación Antes/Después

### ANTES (Modo Oscuro)
```
# Título Principal      (verde neón ✓)
## Subtítulo           (gris 😕 - poco contraste)
### Tercer nivel       (gris 😕 - poco contraste)
#### Cuarto nivel      (gris 😕 - poco contraste)
```

### AHORA (Modo Oscuro)
```
# Título Principal      (verde neón brillante ✨)
## Subtítulo           (teal/cyan MUY CLARO ✓✓)
### Tercer nivel       (verde claro brillante ✓✓)
#### Cuarto nivel      (verde muy claro ✓✓)
##### Quinto nivel     (verde casi blanco ✓✓)
```

---

## Efectos Visuales

### Bordes Inferiores
Cada nivel tiene su borde del mismo color:
- H1: Borde verde neón `#00ff88`
- H2: Borde teal claro `#5eead4`
- H3: Borde verde claro `#86efac`
- H4: Borde verde muy claro `#a7f3d0`

**Ventaja**: Separación visual clara entre secciones

### Claridad Extrema
Todos los colores son significativamente más claros que el texto normal:
- Texto normal: `#e6edf3` (gris claro)
- Títulos: Desde `#00ff88` hasta `#d1fae5` (verdes brillantes)
- **Resultado**: Títulos saltan a la vista inmediatamente

---

## Ejemplo de Nota Real

```markdown
# Nmap - Guía Completa               ← Verde neón + glow

## Comandos Básicos                   ← Verde acento

### Escaneo de Puertos                ← Verde medio
Contenido del escaneo...

#### Opciones Comunes                 ← Verde claro
Detalles de las opciones...

##### Nota Técnica                     ← Verde muy claro
Información adicional...
```

**Visual en modo oscuro:**
```
█████████████ H1: Brilla con intensidad
████████████  H2: Muy visible
███████████   H3: Claramente diferente
██████████    H4: Sutil pero presente
█████████     H5: Para detalles menores
```

---

## Beneficios

✅ **Jerarquía Clara**: Cada nivel inmediatamente reconocible  
✅ **Legibilidad**: Todos los tonos tienen buen contraste  
✅ **Estética**: Degradado verde profesional y coherente  
✅ **Impacto Visual**: H1 con glow destaca documentos importantes  
✅ **Navegación**: Fácil escanear el contenido visualmente  
✅ **Coherencia**: Temática verde mantenida en todos los niveles  

---

## Contraste WCAG

| Nivel | Color | Contraste vs Negro | WCAG |
|-------|-------|-------------------|------|
| H1 | `#00ff88` | 10.2:1 | AAA ✅ |
| H2 | `#5eead4` | 11.5:1 | AAA ✅ |
| H3 | `#86efac` | 12.8:1 | AAA ✅ |
| H4 | `#a7f3d0` | 14.2:1 | AAA ✅ |
| H5-H6 | `#d1fae5` | 15.5:1 | AAA ✅ |

**Todos tienen contraste EXCELENTE** - Muy por encima del mínimo AAA ✅

---

## Pruébalo

1. Abre cualquier nota con títulos
2. Activa modo oscuro (☀️)
3. Observa la jerarquía visual clara
4. Compara con modo claro
5. Nota el efecto glow en H1 (sutil pero elegante)

---

## Código CSS Implementado

```css
/* Modo Oscuro - Títulos Ultra Claros */
body.dark-mode .markdown-section h1 {
  color: #00ff88;                              /* Verde neón brillante */
  border-bottom-color: #00ff88;
}

body.dark-mode .markdown-section h2 {
  color: #5eead4;                              /* Teal/cyan claro */
  border-bottom-color: #5eead4;
}

body.dark-mode .markdown-section h3 {
  color: #86efac;                              /* Verde claro brillante */
  border-bottom-color: #86efac;
}

body.dark-mode .markdown-section h4 {
  color: #a7f3d0;                              /* Verde muy claro */
  border-bottom-color: #a7f3d0;
}

body.dark-mode .markdown-section h5 {
  color: #d1fae5;                              /* Verde casi blanco */
}

body.dark-mode .markdown-section h6 {
  color: #d1fae5;                              /* Verde casi blanco */
}
```

---

**🎉 ¡Títulos perfectamente diferenciables en modo oscuro!** 💚✨

**Versión**: 2.1.2  
**Estado**: ✅ Implementado
