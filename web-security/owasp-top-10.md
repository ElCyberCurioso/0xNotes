# OWASP Top 10

> El OWASP Top 10 es un documento estándar de concienciación para desarrolladores y profesionales de ciberseguridad web. Representa los principales riesgos de seguridad para organizaciones que requieren aplicaciones web.

A continuación, detallamos las 10 vulnerabilidades críticas, cómo explotarlas y cómo mitigarlas.

---

## 1. Broken Access Control (Control de Acceso Roto)
La aplicación no protege adecuadamente qué usuarios pueden acceder a qué datos o funciones. **Incluye IDOR/BOLA**.

- **Ejemplo Práctico:** Un usuario entra a `https://banco.local/cuenta?id=101`. Si al cambiar la URL a `id=102` puede ver el saldo de otra persona sin que el sistema valide si es el dueño de esa cuenta, es un fallo crítico.
- **Explotación:** Fuzzing de endpoints usando tokens de baja privilegios o alterando las variables numéricas (Insecure Direct Object Reference).
- **Mitigación:** Rechazar peticiones por defecto, evitar basar los controles de acceso en parámetros controlables por el usuario y chequear los permisos en cada petición en el backend.

## 2. Cryptographic Failures (Fallos Criptográficos)
Anteriormente "Exposición de Datos Sensibles". Falta de protección para datos en tránsito y en reposo.

- **Ejemplo Práctico:** La base de datos almacena contraseñas en MD5 (algoritmo deprecado y crackeable instantáneamente). O bien, la aplicación transmite tarjetas de crédito por HTTP sin cifrado (SSL/TLS).
- **Explotación:** Búsqueda en texto claro interactuando con la base de datos o haciendo Man-in-the-Middle (MiTM) en una red no cifrada.
- **Mitigación:** Cifrar todos los datos sensibles, usar protocolos actuales (TLS 1.2+), y algoritmos robustos con *salt* moderno para contraseñas (Argon2, bcrypt, scrypt).

## 3. Injection (Inyección)
Datos no confiables son procesados por el backend sin sanitizar, forzando la ejecución de comandos en el sistema.

- **Ejemplo Práctico:** Una petición de login que concatena la consulta por string: `SELECT * FROM users WHERE nombre = '` + usuario + `'`.
- **Explotación Clásica (SQLi):** Enviar `' OR 1=1--` como usuario para eludir el control de validación. Otros tipos incluyen Inyección de Comandos OS (`127.0.0.1; whoami`) o LDAP Injection.
- **Mitigación:** El uso principal son Consultas Parametrizadas (Prepared Statements) u ORMs (Object Relational Mapping). Validar el input mediante listas blancas.

## 4. Insecure Design (Diseño Inseguro)
Fallos de planteamiento y ausencia de Threat Modeling. No es un fallo en la línea de código, sino de lógica funcional de todo el sistema de la aplicación.

- **Ejemplo Práctico:** La pregunta mágica de recuperación de contraseña ("¿Cuál es el segundo apellido de tu madre?") es adivinable OSINT.
- **Explotación:** Encontrar "logic flaws" en sistemas de descuentos que permitan precios negativos.
- **Mitigación:** Shift Left Security, Modelado de Amenazas (Threat Modeling) antes de programar y tests de integración.

## 5. Security Misconfiguration (Configuración de Seguridad Incorrecta)
Configuración por defecto no alterada, nubes públicas expuestas, "Directory Listing" abierto, etc.

- **Ejemplo Práctico:** Olvidar una ruta al servidor de desarrollo que expone `info.php`. Dejar un bucket S3 configurado como Público. 
- **Explotación:** Búsqueda pasiva/OSINT o Dorking en Shodan, búsqueda de consolas Tomcat o JBoss vulnerables a fuerza bruta debido a las contraseñas que vienen de fábrica (`tomcat:tomcat`).
- **Mitigación:** Proceso rápido y automatizado de Securización (Hardening). Separar arquitectura entre QA/DEV y PROD.

## 6. Vulnerable and Outdated Components (Componentes Vulnerables y Desactualizados)
Software que la aplicación emplea pero que el equipo no mantiene ni actualiza (librerías npm abiertas, apache antiguo).

- **Ejemplo Práctico:** Emplear una librería Log4j antigua, abriendo todo el servidor al caso "Log4Shell" (CVE-2021-44228).
- **Explotación:** Es la vía principal de ataque moderno. Un escaneo descubre *jQuery 1.x* o *Struts 2* vulnerable y lanzar el exploit público del CVE asociado.
- **Mitigación:** Monitorear el inventario de librerías. Uso masivo de escaneos de dependencias (Ej: *Snyk*, *OWASP Dependency-Check*).

## 7. Identification and Authentication Failures (Fallos de Identificación y Autenticación)
Contraseñas débiles toleradas o falta total de Múltiple Factor de Autenticación (MFA/2FA). Anteriormente "Broken Authentication".

- **Ejemplo Práctico:** El servidor no protege contra fuerza bruta, permitiendo intentos ilimitados.
- **Explotación:** *Credential Stuffing* (rehusar contraseñas comprometidas para loguearse) y *Brute force*.
- **Mitigación:** Limitar la ratio de intentos (Rate-limit) e implementar un control 2FA/MFA. Obligar al estándar de contraseñas robustas sin límite en caracteres máximos o especiales.

## 8. Software and Data Integrity Failures (Fallos de Integridad en Software y Datos)
Asumir ciegamente que dependencias CI/CD provienen de una fuente genuina y confiable, o que el software update interno sea legítimo (Ataques a Supply Chain).

- **Ejemplo Práctico:** Modificación en las ramas de GitHub por parte de un ex-empleado o dependencia CDN en Javascript alterada que inyecta código crypto miner. Peticiones de deserialización insegura donde un objeto enviado como base64 es consumido a ciegas por un backend en Java o PHP, provocando un RCE.
- **Explotación:** Manipular datos serializados o inyectar código en la ruta principal del proyecto.
- **Mitigación:** Usar firmas digitales y mecanismos de comprobación en los repositorios o el código base (`Subresource Integrity` (SRI)). Validar cada objeto.

## 9. Security Logging and Monitoring Failures (Fallos de Registro en Seguridad y Monitoreo)
El Red Team o Atacante penetra la app sin que suene ninguna alarma, obteniendo acceso a los servidores sin la interrupción de los Administradores (Blue Team/SOC).

- **Ejemplo Práctico:** No guardar qué usuario hizo la inserción errónea o que IPs trataron de loguearse y fallaron 1000 veces.
- **Explotación:** Modificar o destruir información sin resistencia.
- **Mitigación:** Centralización de Logs efectivos (ELK, Splunk) y alertas cuando algo anómalo ocurre.

## 10. Server-Side Request Forgery (SSRF)
Ocurre cuando la aplicación lee los recursos de cualquier dirección externa ingresada deliberadamente por un atacante a su libre albedrío, para consultar puertos hacia adentro o saltar la infraestructura de defensa.

- **Ejemplo Práctico:** Opciones para importar PDF de "tu web url" (`import?url=https://..`). El hacker, sin embargo, ingresa `url=http://127.0.0.1/admin`.
- **Explotación:** Escanear o enviar paquetes a hosts locales (incluyendo base de datos oculta detrás de la web: `http://192.168.0.1/`)
- **Mitigación:** Lista estricta de dominios que pueden llamarse (Allow List) y aislar servicios sensibles internos sin que tengan el servidor web accesible a ellos.
