# 🚀 Pasos para Desplegar en GitHub Pages

## ✅ Archivo `.nojekyll` Creado

Ya he creado el archivo `.nojekyll` en la raíz de tu proyecto. Este archivo es **esencial** para que GitHub Pages no intente procesar tu sitio con Jekyll.

---

## 📝 Pasos que DEBES Seguir

### Paso 1: Commit y Push del archivo `.nojekyll`

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Ir a la carpeta del proyecto
cd D:\Proyectos\0xnotes

# Ver el estado
git status
# Deberías ver: .nojekyll como archivo nuevo

# Agregar el archivo
git add .nojekyll

# Commit
git commit -m "Fix: Agregado .nojekyll para desactivar Jekyll"

# Push
git push origin main
```

---

### Paso 2: Configurar GitHub Pages (MUY IMPORTANTE)

1. Ve a tu repositorio: `https://github.com/ElCyberCurioso/0xNotes`

2. Click en **"Settings"** (pestaña de arriba)

3. En el menú lateral izquierdo, click en **"Pages"**

4. En la sección **"Build and deployment"**:
   
   **Busca "Source":**
   ```
   Source: [Dropdown menu aquí]
   ```

5. **IMPORTANTE**: En el dropdown, selecciona:
   - ✅ **"GitHub Actions"** 
   - ❌ NO selecciones "Deploy from a branch"

6. **Guarda** (si hay botón) o simplemente cierra (se guarda automáticamente)

---

### Paso 3: Esperar el Despliegue

1. Ve a la pestaña **"Actions"** en tu repositorio

2. Verás el workflow **"Deploy to GitHub Pages"** ejecutándose
   - Círculo amarillo girando 🟡 = En progreso
   - Check verde ✅ = Completado
   - X roja ❌ = Error

3. **Espera 2-3 minutos** hasta que aparezca el ✅

4. Una vez completado, tu sitio estará en:
   ```
   https://ElCyberCurioso.github.io/0xNotes/
   ```

---

## 🎯 Resumen Visual

```
1. Commit .nojekyll
   ↓
2. Push a GitHub
   ↓
3. Settings → Pages → Source → "GitHub Actions"
   ↓
4. Esperar workflow en Actions
   ↓
5. ✅ Sitio desplegado
```

---

## ⚠️ Qué Pasaba Antes

**Error**: GitHub Pages intentaba usar Jekyll porque:
- No había archivo `.nojekyll`
- O Settings → Pages estaba configurado en "Deploy from a branch"

**Síntomas**:
- Jekyll intentaba procesar archivos `.md`
- Ignoraba archivos que empiezan con `_` (como `_sidebar.md`)
- El sitio no se mostraba correctamente

**Solución**:
- ✅ `.nojekyll` le dice a GitHub: "No uses Jekyll"
- ✅ "GitHub Actions" usa el workflow que creamos (deploy.yml)
- ✅ El workflow sube los archivos directamente sin procesarlos

---

## 🔍 Verificación

Después de seguir los pasos, verifica:

### En GitHub Actions:
```
✅ Build and Deploy (debe estar verde)
   └── Deploy to GitHub Pages
       ├── Checkout
       ├── Setup Pages
       ├── Upload artifact
       └── Deploy to GitHub Pages ← Todo debe ser ✅
```

### En tu Navegador:
1. Visita: `https://ElCyberCurioso.github.io/0xNotes/`
2. Deberías ver:
   - Logo: `> 0xNotes_` (con cursor parpadeante)
   - Sidebar a la izquierda con tus categorías
   - Contenido principal con el README
   - Botón de toggle modo claro/oscuro (esquina inferior derecha)

---

## 🆘 Si Algo Sale Mal

### Problema 1: "GitHub Actions" no aparece en Source

**Causa**: Tu repositorio es privado y no tienes GitHub Pro.

**Solución**: Haz el repositorio público:
1. Settings → General
2. Scroll hasta abajo → "Danger Zone"
3. "Change repository visibility" → "Make public"

---

### Problema 2: Workflow falla con error de Jekyll

**Causa**: El archivo `.nojekyll` no se subió correctamente.

**Solución**:
```powershell
# Verificar que existe
dir .nojekyll

# Si no existe, créalo
New-Item -Path ".nojekyll" -ItemType File

# Commit y push
git add .nojekyll
git commit -m "Fix: Agregado .nojekyll"
git push origin main
```

---

### Problema 3: Página muestra 404

**Solución**:
1. Espera 5 minutos (a veces tarda)
2. Limpia caché del navegador (Ctrl + Shift + R)
3. Verifica que `index.html` esté en la raíz del repositorio
4. Verifica que el workflow terminó con ✅

---

## ✅ Checklist Final

Marca cada paso cuando lo completes:

- [ ] He ejecutado `git add .nojekyll`
- [ ] He ejecutado `git commit -m "Fix: Agregado .nojekyll"`
- [ ] He ejecutado `git push origin main`
- [ ] He ido a Settings → Pages en GitHub
- [ ] He cambiado Source a "GitHub Actions"
- [ ] He visto el workflow ejecutarse en Actions
- [ ] El workflow terminó con ✅ verde
- [ ] He visitado mi sitio y funciona correctamente

---

## 🎉 Cuando Todo Funcione

Tu sitio estará disponible en:
```
https://ElCyberCurioso.github.io/0xNotes/
```

Características que deberías ver:
- ✅ Logo terminal con cursor parpadeante
- ✅ Sidebar con todas tus categorías
- ✅ Toggle modo claro/oscuro funcional
- ✅ Todas tus notas accesibles
- ✅ Búsqueda funcionando
- ✅ Código con syntax highlighting
- ✅ Títulos claros en modo oscuro

---

## 📞 Siguiente Paso

**Ahora ejecuta** estos comandos en PowerShell:

```powershell
cd D:\Proyectos\0xnotes
git add .nojekyll
git commit -m "Fix: Agregado .nojekyll para desactivar Jekyll"
git push origin main
```

Luego ve a GitHub y configura Pages → "GitHub Actions".

**¡Ya casi está!** 🚀
