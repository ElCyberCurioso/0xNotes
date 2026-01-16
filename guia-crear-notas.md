# Guía para Crear Nuevas Notas

## Introducción

Esta guía te llevará paso a paso a través del proceso completo de creación de una nueva nota en 0xNotes, desde la concepción hasta la publicación.

## Proceso Completo

### Paso 1: Planificar la Nota

Antes de empezar a escribir, define:

1. **Tema**: ¿Qué vas a documentar?
2. **Categoría**: ¿Dónde encaja? (pentesting, web-security, herramientas, etc.)
3. **Audiencia**: ¿Para quién es esta nota?
4. **Estructura**: ¿Qué secciones necesitas?

### Paso 2: Crear un Borrador

Es recomendable empezar con un borrador para poder trabajar sin presión:

```bash
# Navega a tu repositorio
cd d:\Proyectos\0xnotes

# Crea el borrador
touch _drafts/nombre-de-la-nota.md

# O en Windows PowerShell:
New-Item -Path "_drafts\nombre-de-la-nota.md" -ItemType File
```

### Paso 3: Escribir el Contenido

Abre el archivo en tu editor favorito y sigue esta estructura recomendada:

```markdown
# Título de la Nota

## Introducción

Breve descripción de qué trata esta nota y por qué es importante.

## Contenido Principal

### Sección 1

Contenido aquí...

### Sección 2

Más contenido...

## Ejemplos Prácticos

```bash
# Comandos de ejemplo
comando --opcion valor
```

## Referencias

- [Enlace relevante 1](https://ejemplo.com)
- [Enlace relevante 2](https://ejemplo.com)
```

### Paso 4: Seguir las Mejores Prácticas

#### Formato de Títulos

- **H1 (`#`)**: Solo para el título principal de la nota
- **H2 (`##`)**: Secciones principales
- **H3 (`###`)**: Subsecciones
- **H4 (`####`)**: Sub-subsecciones (usar con moderación)

#### Bloques de Código

Siempre especifica el lenguaje para syntax highlighting:

````markdown
```bash
nmap -sV target.com
```

```python
print("Hello, World!")
```

```javascript
console.log("Hello, World!");
```
````

#### Tablas

Usa tablas para comparaciones o listas estructuradas:

```markdown
| Herramienta | Propósito | Comando Básico |
|-------------|-----------|----------------|
| Nmap | Escaneo | `nmap -sV target` |
| SQLMap | SQLi | `sqlmap -u url` |
```

#### Alertas y Notas Importantes

```markdown
> [!WARNING]
> Texto de advertencia importante

> [!TIP]
> Consejo útil

> [!NOTE]
> Nota informativa
```

#### Enlaces

- **Enlaces internos**: `[Texto](carpeta/archivo.md)`
- **Enlaces externos**: `[Texto](https://ejemplo.com)`

#### Sin Emojis

Mantén un tono profesional sin usar emojis en el contenido.

### Paso 5: Revisar y Probar Localmente

Antes de publicar, prueba tu nota localmente:

```bash
# Opción 1: Python
python -m http.server 3000

# Opción 2: Docsify CLI (si está instalado)
docsify serve

# Opción 3: Node.js
npx serve
```

Abre http://localhost:3000 en tu navegador y verifica:

- Formato correcto
- Código con syntax highlighting
- Enlaces funcionando
- Tablas bien formateadas
- Sin errores de Markdown

### Paso 6: Guardar el Borrador

Una vez que hayas trabajado en tu nota, guarda los cambios:

```bash
# Agregar al staging
git add _drafts/nombre-de-la-nota.md

# Commit
git commit -m "Borrador: Nombre de la Nota"

# Push al repositorio
git push origin main
```

### Paso 7: Publicar la Nota

Cuando tu nota esté completa y revisada:

#### 7.1. Mover a la Carpeta Final

```bash
# Windows
move _drafts\nombre-de-la-nota.md pentesting\nombre-de-la-nota.md

# Linux/Mac
mv _drafts/nombre-de-la-nota.md pentesting/nombre-de-la-nota.md
```

#### 7.2. Actualizar el Sidebar

Edita `_sidebar.md` y agrega tu nota en la sección correspondiente:

```markdown
* Pentesting
  * [Introducción](pentesting/README.md)
  * [Nombre de la Nota](pentesting/nombre-de-la-nota.md)
  * [Reconocimiento](pentesting/reconocimiento.md)
```

**Orden recomendado:**
- Primero el README o Introducción
- Luego las notas nuevas
- Finalmente las notas existentes en orden lógico

#### 7.3. Commit y Push

```bash
# Agregar cambios
git add pentesting/nombre-de-la-nota.md _sidebar.md

# Commit con mensaje descriptivo
git commit -m "Agregada nota: Nombre de la Nota en sección Pentesting"

# Push
git push origin main
```

### Paso 8: Verificar el Deploy

GitHub Actions desplegará automáticamente los cambios:

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña "Actions"
3. Verifica que el workflow "pages-build-deployment" se complete exitosamente
4. Espera 2-3 minutos
5. Visita tu sitio para confirmar que la nota aparece

## Estructura de Carpetas

```
0xnotes/
├── _drafts/              # Notas en borrador (no se publican)
├── pentesting/           # Notas de pentesting
├── web-security/         # Notas de seguridad web
├── herramientas/         # Guías de herramientas
├── sistemas/             # Notas de sistemas operativos
├── ctf/                  # Writeups de CTF
├── recursos/             # Recursos adicionales
├── _sidebar.md           # Menú de navegación
├── _navbar.md            # Barra superior
└── README.md             # Página de inicio
```

## Convenciones de Nombres

### Archivos

- **Formato**: `nombre-con-guiones.md`
- **Minúsculas**: Siempre en minúsculas
- **Sin espacios**: Usa guiones (`-`) en lugar de espacios
- **Descriptivo**: El nombre debe ser claro y conciso

**Ejemplos:**
- `sql-injection.md`
- `privilege-escalation.md`
- `burp-suite-avanzado.md`

### Títulos en el Archivo

- **H1**: Título principal sin emojis
- **Descriptivo**: Claro y conciso
- **Sin artículos iniciales**: No uses "El", "La", "Los", "Las"

**Ejemplos:**
```markdown
# SQL Injection
# Privilege Escalation en Linux
# Burp Suite Avanzado
```

## Checklist Final

Antes de publicar, verifica:

- [ ] Contenido completo y revisado
- [ ] Sin emojis en el contenido
- [ ] Bloques de código con lenguaje especificado
- [ ] Enlaces funcionando correctamente
- [ ] Tablas bien formateadas
- [ ] Archivo movido de `_drafts/` a carpeta final
- [ ] Referencia agregada en `_sidebar.md`
- [ ] Commit con mensaje descriptivo
- [ ] Push al repositorio
- [ ] Verificado en el sitio después del deploy

## Plantilla de Nota

Usa esta plantilla como punto de partida:

```markdown
# Título de la Nota

## Introducción

Descripción breve del tema y su importancia.

## ¿Qué es [Tema]?

Explicación del concepto principal.

## Conceptos Básicos

### Concepto 1

Explicación...

### Concepto 2

Explicación...

## Comandos/Técnicas Principales

### Comando 1

```bash
comando --opciones
```

**Descripción**: Qué hace este comando...

## Ejemplos Prácticos

### Ejemplo 1: [Escenario]

```bash
# Paso 1
comando1

# Paso 2
comando2
```

## Casos de Uso

- **Caso 1**: Descripción
- **Caso 2**: Descripción

## Mejores Prácticas

> [!TIP]
> Lista de consejos y mejores prácticas

## Errores Comunes

> [!WARNING]
> Cosas que evitar

## Notas Importantes

> [!NOTE]
> Información adicional relevante

## Herramientas Relacionadas

| Herramienta | Propósito | Enlace |
|-------------|-----------|--------|
| Tool 1 | Descripción | [Link](#) |
| Tool 2 | Descripción | [Link](#) |

## Referencias

- [Recurso oficial 1](https://ejemplo.com)
- [Tutorial 2](https://ejemplo.com)
- [Documentación 3](https://ejemplo.com)
```

## Consejos Adicionales

### Para Notas Técnicas

1. **Empieza con lo básico**: No asumas conocimiento previo
2. **Progresión lógica**: De simple a complejo
3. **Ejemplos reales**: Usa casos prácticos
4. **Comandos completos**: No omitas opciones importantes
5. **Explicaciones claras**: Comenta qué hace cada comando

### Para Writeups de CTF

1. **Estructura clara**: Reconocimiento → Explotación → Post-explotación
2. **Screenshots**: Describe lo que mostrarías en capturas
3. **Comandos exactos**: Incluye todos los comandos usados
4. **Lecciones aprendidas**: Qué aprendiste del reto
5. **No spoilers**: Espera a que el reto sea retirado antes de publicar

### Para Guías de Herramientas

1. **Instalación**: Cómo instalar la herramienta
2. **Uso básico**: Comandos fundamentales
3. **Opciones avanzadas**: Features más complejos
4. **Casos de uso**: Cuándo usar esta herramienta
5. **Alternativas**: Menciona herramientas similares

## Soporte

Si tienes preguntas o problemas:

1. Revisa la [Guía de Uso](guia-uso.md) principal
2. Consulta la [documentación de Docsify](https://docsify.js.org/)
3. Revisa notas existentes como referencia
4. Abre un issue en el repositorio si es necesario

## Conclusión

Siguiendo esta guía, podrás crear notas profesionales y bien estructuradas que sean útiles tanto para ti como para otros. Recuerda que la consistencia es clave: mantén el mismo estilo y formato en todas tus notas.

¡Buena suerte con tus notas!
