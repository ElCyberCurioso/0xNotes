# Auditoría Web Completa (Metodología)

> Realizar una auditoría web (AppSec) de forma estructurada es esencial para evitar dejar vectores de ataque sin cubrir. Esta metodología está fuertemente influenciada por la **OWASP Web Security Testing Guide (WSTG)**, orientada de forma práctica a los procesos de bug bounty y auditoría profesional.

## Fase 1: Reconocimiento y Mapeo de la Superficie (Recon)

La clave de un buen hackeo web no es usar payloads mágicos, es entender la aplicación mejor que sus desarrolladores.

1. **Spidering y Crawling Activo:**
   Navega la web *manualmente* como un usuario legítimo. Usa la aplicación. Llena los formularios. Rompe la lógica de negocio temporalmente interceptándola a través de un proxy.
   - *Herramientas:* **Burp Suite Professional (Crawler anidado)** o **Caido**.

2. **Detección de Tecnologías subyacentes:**
   Identifica los lenguajes, frameworks (React, Angular), CMS (WordPress, Drupal), servidores web (Nginx, Tomcat) y WAF.
   - *Herramientas:* **Wappalyzer**, extensión de navegador, o el CLI **httpx**. Buscamos fallos en CVEs asociados a versiones antiguas.

3. **Descubrimiento de Endpoints Ocultos (Fuzzing / Dirbusting):**
   Fuerza bruta sobre rutas, directorios y archivos.
   - *Herramientas:* **FFuf** o **Feroxbuster**.
   - *Comando:* `ffuf -u https://objetivo.com/FUZZ -w SecLists/Discovery/Web-Content/raft-large-directories.txt -mc 200,301,302,403`

4. **Análisis de Parámetros y JavaScript:**
   Lee los ficheros `.js` buscando claves de API "hardcodeadas" y endpoints escondidos. Extrae parámetros de la URL históricas.
   - *Herramientas:* **LinkFinder**, o rastreo a través de Wayback Machine (`waybackurls`).

---

## Fase 2: Análisis de Autenticación y Autorización

Los fallos de lógica suelen estar en los controles de acceso.

- **Bypass de Autenticación:** ¿Podemos saltarnos el login? Fuga de tokens, contraseñas débiles, bruteforcing (Hydra, Burp Intruder).
- **JWT (JSON Web Tokens):** Analizar si se puede firmar con el algoritmo `none`, o usar la clave pública en lugar de la secreta.
- **Autorización (IDOR/BOLA):** Si soy el usuario ID 5, ¿puedo acceder a `/api/profile/6` o cambiar `/invoice/download?id=10`? Esto es un Insecure Direct Object Reference y suele ser devastador.
- **Escalada de Privilegios:** Intentar ejecutar funciones de Administrador usando el token de un usuario de solo lectura.

---

## Fase 3: Evaluación de la Capa de Entrada (Input Validation)

Todas las funciones que interactúan con una base de datos, sistema operativo o enrutadores, deben probarse por inyecciones.
> [!IMPORTANT]
> Jamás asumas que porque una entrada está sanitizada en el Cliente (Javascript), lo está en el Servidor.

1. **SQL Injection (SQLi):**
   Prueba el carácter `'`, `"` o condicionales booleanas `AND 1=1` en los parámetros de URL, JSON data, o incluso en el header `User-Agent`. 
2. **Cross-Site Scripting (XSS):**
   Rastrea dónde los "inputs" de usuario acaban reflejados en la página (Reflected XSS) o almacenados al recargar, como comentarios (Stored XSS). Prueba la inserción de `<script>alert(1)</script>` o `"><img src=x onerror=prompt()>.
3. **Command Injection y SSRF:**
   Cualquier input que pida una IP o una URL (ej. "sube una foto mediante URL") prueba si te permite hacer peticiones hacia la infraestructura interna (SSRF). 
4. **File Uploads (Carga de Archivos):**
   Modifica las extensiones `file.php.jpg` e inyecta payloads en los meta-datos.

---

## Fase 4: Exploitation (Explotación Confirmada)

Para evitar falsos positivos, debemos obtener una Prueba de Concepto (PoC - Proof of Concept) para demostrar el impacto real.
- Convertir un SSRF simple en una filtración de las credenciales de Amazon AWS (`http://169.254.169.254/`).
- Validar una inyección SQL ciega obteniendo exactamente el nombre del usuario de la base de datos `sys.database()`.
- Capturar cookies de sesión usando XSS (vulnerando a otros usuarios).

---

## Fase 5: Reporte

Los informes dictan la profesionalidad del Red Team/Pentester. 
Debe incluir:
1. **Resumen Ejecutivo:** No técnico, para C-levels.
2. **Impacto:** ¿Qué significaría en pérdidas para la empresa?
3. **Recreación (Pasos para reproducir):** 1. Abrir web, 2. Interceptar paquete, 3. Modificar parámetro `admin=true`.
4. **Evidencias:** Capturas de pantalla o fragmentos de HTTP Response cruda.
5. **Recomendaciones de Remediación.**
