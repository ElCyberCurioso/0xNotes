# 🚀 Guía de Configuración y Despliegue

Esta guía te mostrará cómo configurar y desplegar tu aplicación de notas de ciberseguridad en GitHub Pages.

## 📋 Requisitos Previos

- Cuenta de GitHub
- Git instalado en tu computadora
- Editor de texto (VS Code, Sublime, etc.)

## 🎯 Paso 1: Configuración Inicial

### 1.1 Actualizar Información Personal

Edita los siguientes archivos para personalizar tu sitio:

**index.html** (línea 34):
```html
repo: 'https://github.com/TU-USUARIO/0xnotes',
```
Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub.

**_navbar.md**:
```markdown
* 🔗 [GitHub](https://github.com/TU-USUARIO/0xnotes)
```

## 🎯 Paso 2: Crear Repositorio en GitHub

### 2.1 Crear Nuevo Repositorio

1. Ve a [GitHub](https://github.com)
2. Click en el botón **"+"** → **"New repository"**
3. Nombre del repositorio: `0xnotes` (o el que prefieras)
4. Descripción: "Mis notas de ciberseguridad"
5. **Público** (necesario para GitHub Pages gratis)
6. **NO** inicialices con README, .gitignore o licencia
7. Click en **"Create repository"**

### 2.2 Subir el Código

Abre una terminal en la carpeta del proyecto (`D:\Proyectos\0xnotes`) y ejecuta:

```bash
# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Aplicación de notas de ciberseguridad"

# Cambiar branch a main (si es necesario)
git branch -M main

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/TU-USUARIO/0xnotes.git

# Subir código
git push -u origin main
```

## 🎯 Paso 3: Configurar GitHub Pages

### 3.1 Habilitar GitHub Pages

⚠️ **IMPORTANTE**: Sigue estos pasos exactamente para evitar errores.

1. Ve a tu repositorio en GitHub
2. Click en **"Settings"** (Configuración)
3. En el menú lateral, click en **"Pages"**
4. En **"Build and deployment"** → **"Source"**:
   - ✅ **Selecciona**: "GitHub Actions" (NO "Deploy from a branch")
   - ❌ **NO selecciones**: "Deploy from a branch"
5. **¡Listo!** GitHub Actions se encargará del despliegue automático

**Nota**: El archivo `.nojekyll` ya está incluido para desactivar Jekyll.

### 3.2 Esperar el Despliegue

1. Ve a la pestaña **"Actions"** de tu repositorio
2. Deberías ver un workflow ejecutándose: "Deploy to GitHub Pages"
3. Espera a que aparezca un ✅ verde (tarda 2-3 minutos)
4. Tu sitio estará disponible en: `https://TU-USUARIO.github.io/0xnotes/`

### 3.3 Si Tienes Errores de Jekyll

Si ves errores relacionados con Jekyll en las Actions:

1. **Verifica** que `.nojekyll` esté en la raíz del repositorio
2. **Confirma** que en Settings → Pages → Source esté en "GitHub Actions"
3. **Haz un nuevo commit** para disparar el workflow
4. Lee `SOLUCIÓN-GITHUB-PAGES.md` para más detalles

```bash
# Verificar que .nojekyll exista
ls -la | grep .nojekyll

# Si no existe, créalo
touch .nojekyll
git add .nojekyll
git commit -m "Fix: Agregado .nojekyll"
git push origin main
```

## ✏️ Cómo Agregar Nuevas Notas

### Opción 1: Desde tu Computadora (Recomendado)

```bash
# 1. Crear archivo en la carpeta correspondiente
# Por ejemplo, crear: pentesting/nueva-nota.md

# 2. Editar _sidebar.md para agregar la nota
# Agregar línea como:
#   * [Mi Nueva Nota](pentesting/nueva-nota.md)

# 3. Guardar cambios en Git
git add .
git commit -m "Agregada nota: Mi Nueva Nota"
git push origin main

# 4. GitHub Actions desplegará automáticamente (2-3 minutos)
```

### Opción 2: Desde GitHub Directamente

1. Ve a tu repositorio en GitHub
2. Navega a la carpeta donde quieres crear la nota
3. Click en **"Add file"** → **"Create new file"**
4. Escribe el contenido en Markdown
5. Click en **"Commit changes"**
6. Edita `_sidebar.md` para agregar la referencia
7. El sitio se actualizará automáticamente

## ✏️ Cómo Editar Notas Existentes

### Desde tu Computadora

```bash
# 1. Edita el archivo .md que desees
# Ejemplo: pentesting/reconocimiento.md

# 2. Guardar cambios
git add pentesting/reconocimiento.md
git commit -m "Actualizada nota de reconocimiento"
git push origin main
```

### Desde GitHub

1. Navega al archivo en GitHub
2. Click en el ícono de lápiz (✏️) "Edit this file"
3. Realiza los cambios
4. Click en **"Commit changes"**

## 🗑️ Cómo Borrar Notas

### Desde tu Computadora

```bash
# 1. Eliminar el archivo
git rm pentesting/nota-obsoleta.md

# 2. Editar _sidebar.md para remover la referencia

# 3. Commit y push
git add _sidebar.md
git commit -m "Eliminada nota obsoleta"
git push origin main
```

### Desde GitHub

1. Navega al archivo en GitHub
2. Click en el ícono de basura (🗑️) "Delete this file"
3. Confirma los cambios
4. Edita `_sidebar.md` para remover la referencia

## 🎨 Personalización

### 🌓 Cambio de Tema Claro/Oscuro

La aplicación incluye un **toggle de tema** en la esquina inferior derecha:

- **🌙 Icono de Luna**: Click para activar modo oscuro
- **☀️ Icono de Sol**: Click para activar modo claro
- El tema seleccionado se guarda automáticamente en tu navegador

**Características:**
- Modo claro: fondo blanco con acentos verdes
- Modo oscuro: fondo gris oscuro con verde neón
- Transición suave entre temas
- Persistencia del tema elegido

### Cambiar Colores

La paleta de colores está basada en **verde y gris oscuro**. Para personalizarla, edita `index.html`:

```css
:root {
  /* Colores principales - Verde y Gris */
  --primary-green: #00ff88;        /* Verde principal */
  --primary-green-dark: #00cc6f;   /* Verde oscuro */
  --secondary-green: #00d978;      /* Verde secundario */
  --accent-green: #00ff9d;         /* Verde acento */
}
```

### Modificar Paleta Completa

Puedes cambiar toda la paleta editando las variables CSS en `index.html`:

```css
/* Modo Claro */
--light-bg: #ffffff;              /* Fondo principal */
--light-sidebar-bg: #2d3748;      /* Fondo sidebar */

/* Modo Oscuro */
--dark-bg: #0d1117;               /* Fondo principal */
--dark-sidebar-bg: #010409;       /* Fondo sidebar */
```

### Agregar Más Categorías

1. Crea una nueva carpeta (ej: `cryptography/`)
2. Crea un `README.md` en esa carpeta
3. Agrega notas en formato `.md`
4. Actualiza `_sidebar.md`:

```markdown
* 🔐 Cryptography
  * [Introducción](cryptography/README.md)
  * [AES](cryptography/aes.md)
  * [RSA](cryptography/rsa.md)
```

## 🧪 Probar Localmente

Antes de hacer push, puedes probar localmente:

### Opción 1: Python

```bash
# En la carpeta del proyecto
python -m http.server 3000

# Visita: http://localhost:3000
```

### Opción 2: Node.js

```bash
npx serve

# Visita: http://localhost:3000
```

### Opción 3: Docsify CLI (Recomendado)

```bash
# Instalar una sola vez
npm i docsify-cli -g

# En la carpeta del proyecto
docsify serve

# Visita: http://localhost:3000
```

## 🔍 Solución de Problemas

### El sitio no se actualiza

1. Ve a **Actions** en GitHub
2. Verifica que el workflow terminó con éxito (✅)
3. Espera 2-3 minutos para que se propague
4. Limpia caché del navegador (Ctrl + F5 o Cmd + Shift + R)

### Error 404 en GitHub Pages

1. Verifica que `index.html` esté en la raíz del repositorio
2. Verifica que GitHub Pages esté habilitado
3. Verifica que la URL sea correcta: `https://TU-USUARIO.github.io/NOMBRE-REPO/`

### Las notas no aparecen en el sidebar

1. Verifica que agregaste la referencia en `_sidebar.md`
2. Verifica que la ruta del archivo sea correcta
3. Los nombres de archivo distinguen mayúsculas/minúsculas en Linux

### Los bloques de código no se colorean

1. Verifica que estés usando la sintaxis correcta:
   ````markdown
   ```bash
   echo "Hola"
   ```
   ````
2. Verifica que el lenguaje esté soportado en `index.html`

## 📱 Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. Crea un archivo `CNAME` en la raíz con tu dominio:
   ```
   notes.tudominio.com
   ```

2. Configura DNS en tu proveedor:
   ```
   Type: CNAME
   Name: notes
   Value: TU-USUARIO.github.io
   ```

3. En GitHub → Settings → Pages → Custom domain
4. Ingresa tu dominio y guarda

## 🔐 Hacer el Repositorio Privado (GitHub Pro)

Si tienes GitHub Pro/Education:

1. Settings → General → Danger Zone
2. Change repository visibility → Private
3. GitHub Pages seguirá funcionando

**Nota:** Con cuenta gratuita, GitHub Pages solo funciona con repositorios públicos.

## 📚 Recursos Adicionales

- [Documentación de Docsify](https://docsify.js.org/)
- [Guía de Markdown](https://www.markdownguide.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

## 💡 Tips Finales

> [!TIP]
> **Mejores Prácticas:**
> - Haz commits frecuentes con mensajes descriptivos
> - Organiza tus notas en carpetas temáticas
> - Usa nombres de archivo descriptivos en minúsculas
> - Vincula notas relacionadas entre sí
> - Incluye ejemplos prácticos en tus notas
> - Revisa la preview local antes de hacer push

> [!WARNING]
> **Seguridad:**
> - NO subas credenciales reales
> - NO incluyas información sensible de empresas
> - NO publiques flags activos de CTFs
> - Considera hacer el repo privado si incluyes información corporativa

## 🎉 ¡Listo!

Ahora tienes tu propia aplicación de notas de ciberseguridad desplegada en GitHub Pages. Cada vez que hagas un commit a `main`, GitHub Actions desplegará automáticamente los cambios.

¡Feliz aprendizaje! 🚀🔐

---

**¿Necesitas ayuda?** Consulta:
- [Guía de Uso](guia-uso.md)
- [Issues en GitHub](https://github.com/TU-USUARIO/0xnotes/issues)
- [Documentación de Docsify](https://docsify.js.org/)
