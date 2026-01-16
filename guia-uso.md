# Guía de Uso

## ¿Qué es 0xNotes?

0xNotes es una aplicación web estática para almacenar y organizar notas de ciberseguridad. Está construida con [Docsify](https://docsify.js.org/), un generador de documentación dinámico que renderiza archivos Markdown directamente en el navegador.

## Cómo agregar nuevas notas

### Paso 1: Crear el archivo Markdown

1. Navega a la carpeta correspondiente según la categoría de tu nota
2. Crea un nuevo archivo con extensión `.md`
3. Escribe tu contenido usando sintaxis Markdown

**Ejemplo:**
```bash
# Crear una nueva nota en la carpeta pentesting
touch pentesting/mi-nueva-nota.md
```

### Paso 2: Agregar la nota al sidebar

Edita el archivo `_sidebar.md` y agrega un enlace a tu nueva nota en la sección correspondiente:

```markdown
* 🔐 Pentesting
  * [Mi Nueva Nota](pentesting/mi-nueva-nota.md)
```

### Paso 3: Commit y push

```bash
git add .
git commit -m "Agregada nota: Mi Nueva Nota"
git push origin main
```

Listo. GitHub Actions se encargará automáticamente de desplegar los cambios.

## Cómo editar notas existentes

1. Abre el archivo `.md` que deseas editar
2. Realiza los cambios necesarios
3. Guarda el archivo
4. Commit y push:

```bash
git add pentesting/mi-nota.md
git commit -m "Actualizada nota: Mi Nota"
git push origin main
```

## Sistema de Borradores

### ¿Qué es un borrador?

Un borrador es una nota que todavía no está lista para publicarse. Las notas en borrador se almacenan en la carpeta `_drafts/` y no aparecerán en el sitio público, pero seguirán estando en el repositorio.

### Crear un borrador

1. Crea tu archivo markdown en la carpeta `_drafts/`:

```bash
# Crear nuevo borrador
touch _drafts/mi-nueva-nota.md
```

2. Escribe tu contenido normalmente
3. No agregues referencias en `_sidebar.md` (las notas en `_drafts/` están ocultas automáticamente)
4. Commit y push:

```bash
git add _drafts/mi-nueva-nota.md
git commit -m "Agregado borrador: Mi Nueva Nota"
git push origin main
```

### Publicar un borrador

Cuando tu nota esté lista para publicarse:

1. Mueve el archivo de `_drafts/` a la carpeta correspondiente:

```bash
# Mover borrador a carpeta final
move _drafts\mi-nueva-nota.md pentesting\mi-nueva-nota.md
# O en Linux/Mac:
# mv _drafts/mi-nueva-nota.md pentesting/mi-nueva-nota.md
```

2. Agrega la referencia en `_sidebar.md`:

```markdown
* Pentesting
  * [Mi Nueva Nota](pentesting/mi-nueva-nota.md)
```

3. Commit y push:

```bash
git add pentesting/mi-nueva-nota.md _sidebar.md
git commit -m "Publicada nota: Mi Nueva Nota"
git push origin main
```

### Mover una nota publicada a borrador

Si quieres ocultar temporalmente una nota publicada:

1. Mueve el archivo a `_drafts/`:

```bash
move pentesting\nota-temporal.md _drafts\
```

2. Elimina la referencia de `_sidebar.md`
3. Commit y push:

```bash
git add _drafts/nota-temporal.md _sidebar.md
git commit -m "Movida nota a borrador: Nota Temporal"
git push origin main
```

## Cómo borrar notas

1. Elimina el archivo `.md` correspondiente
2. Elimina la referencia en `_sidebar.md` (si estaba publicada)
3. Commit y push:

```bash
git rm pentesting/nota-obsoleta.md
# Edita _sidebar.md para remover la referencia si es necesario
git add _sidebar.md
git commit -m "Eliminada nota obsoleta"
git push origin main
```

## Sintaxis Markdown soportada

### Encabezados
```markdown
# Encabezado 1
## Encabezado 2
### Encabezado 3
```

### Código
````markdown
```bash
echo "Código inline"
```

O código en línea: `comando`
````

### Listas
```markdown
- Item 1
- Item 2
  - Subitem 2.1

1. Primer item
2. Segundo item
```

### Enlaces e imágenes
```markdown
[Texto del enlace](https://ejemplo.com)
![Alt text](ruta/imagen.png)
```

### Tablas
```markdown
| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato 1    | Dato 2    |
```

### Alertas
```markdown
> [!NOTE]
> Esto es una nota importante

> [!WARNING]
> Esto es una advertencia

> [!TIP]
> Esto es un consejo
```

### Bloques de código con pestañas
````markdown
<!-- tabs:start -->

#### **Tab 1**

Contenido del tab 1

#### **Tab 2**

Contenido del tab 2

<!-- tabs:end -->
````

## Características especiales

### Búsqueda
Usa la barra de búsqueda en la parte superior para encontrar contenido en todas tus notas.

### Copiar código
Todos los bloques de código incluyen un botón "Copiar" en la esquina superior derecha.

### Navegación
- Usa el menú lateral para navegar entre categorías
- Los enlaces "Anterior" y "Siguiente" te permiten moverte secuencialmente

### Diagramas Mermaid
Puedes crear diagramas usando la sintaxis de Mermaid:

````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

## Desarrollo local

Para probar tus cambios localmente antes de hacer push:

```bash
# Opción 1: Usar Python
python -m http.server 3000

# Opción 2: Usar Node.js
npx serve

# Opción 3: Usar docsify-cli
npm i docsify-cli -g
docsify serve
```

Luego abre http://localhost:3000 en tu navegador.

## Estructura del proyecto

```
0xnotes/
├── index.html           # Archivo principal
├── README.md            # Página de inicio
├── _sidebar.md          # Menú lateral
├── _navbar.md           # Barra de navegación
├── guia-uso.md          # Esta guía
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions
├── pentesting/          # Notas de pentesting
├── web-security/        # Notas de seguridad web
├── herramientas/        # Notas de herramientas
├── sistemas/            # Notas de sistemas
├── ctf/                 # Writeups de CTF
└── recursos/            # Recursos adicionales
```

## Consejos

1. **Organización**: Mantén tus notas organizadas en carpetas por tema
2. **Nombres descriptivos**: Usa nombres de archivo descriptivos y en minúsculas
3. **Enlaces internos**: Vincula notas relacionadas entre sí
4. **Imágenes**: Guarda las imágenes en una carpeta `assets/` o `images/`
5. **Commits frecuentes**: Haz commits pequeños y descriptivos

## Solución de problemas

### La página no se actualiza después del push
- Espera 2-3 minutos para que GitHub Actions complete el despliegue
- Verifica el estado en la pestaña "Actions" de tu repositorio
- Limpia la caché del navegador (Ctrl + F5)

### El sidebar no muestra mis notas nuevas
- Asegúrate de haber agregado la referencia en `_sidebar.md`
- Verifica que la ruta del archivo sea correcta

### Los bloques de código no se colorean
- Verifica que estés usando la sintaxis correcta de Markdown
- Asegúrate de especificar el lenguaje después de las tres comillas invertidas

---

¿Tienes más preguntas? Consulta la [documentación oficial de Docsify](https://docsify.js.org/).
