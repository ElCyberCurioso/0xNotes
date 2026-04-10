# Crear una Nueva Nota

Añadir una nota al repositorio son tres pasos: crear el fichero, escribir el contenido con la plantilla, y registrarla en el sidebar.

---

## 1. Crea el fichero

Nómbralo en minúsculas con guiones, dentro de la carpeta que corresponda:

```
pentesting/     → técnicas de pentesting
web-security/   → vulnerabilidades web
herramientas/   → guías de herramientas
sistemas/       → Linux, Windows, privesc
ctf/            → writeups
recursos/       → cheatsheets, links, certs
_drafts/        → borradores (no se publican)
```

```bash
# Ejemplo
touch herramientas/gobuster.md
```

---

## 2. Escribe el contenido

Copia y adapta la [plantilla](TEMPLATE.md). Las convenciones básicas:

**Títulos**

```markdown
# Título principal        ← solo uno por fichero
## Sección principal
### Subsección
```

**Bloques de código** — especifica siempre el lenguaje:

```markdown
```bash
nmap -sV -p- target.htb
```

```python
import requests
```
```

**Alertas**

```markdown
> [!NOTE]
> Información adicional.

> [!TIP]
> Consejo práctico.

> [!WARNING]
> Algo que debes tener en cuenta.

> [!DANGER]
> Acción destructiva o ilegal fuera de entornos autorizados.
```

**Tablas**

```markdown
| Herramienta | Uso               |
|-------------|-------------------|
| Nmap        | Escaneo de puertos |
| Gobuster    | Fuzzing de directorios |
```

---

## 3. Registra la nota en `_sidebar.md`

Abre `_sidebar.md` y añade el enlace en la sección correspondiente:

```markdown
* Herramientas
  * [Introducción](herramientas/README.md)
  * [Gobuster](herramientas/gobuster.md)   ← añadir aquí
  * [Nmap](herramientas/nmap.md)
```

---

## 4. Publica

```bash
git add herramientas/gobuster.md _sidebar.md
git commit -m "Añadir nota: Gobuster"
git push origin main
```

GitHub Actions despliega los cambios automáticamente en unos segundos.

---

## Estructura de carpetas

```
0xnotes/
├── _drafts/          # Borradores (ocultos)
├── pentesting/
├── web-security/
├── herramientas/
├── sistemas/
├── ctf/
├── recursos/
├── _sidebar.md       # Navegación lateral
├── _navbar.md        # Barra superior
├── TEMPLATE.md       # Plantilla de nota
└── README.md         # Portada
```

---

## Checklist antes de publicar

- [ ] Fichero en la carpeta correcta (no en `_drafts/`)
- [ ] H1 como título único al inicio
- [ ] Bloques de código con lenguaje especificado
- [ ] Enlace añadido en `_sidebar.md`
- [ ] Push hecho a `main`
