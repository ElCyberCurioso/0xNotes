# Web Security

## Introducción

La seguridad de aplicaciones web es un campo crítico de la ciberseguridad que se enfoca en proteger aplicaciones web contra diversos tipos de ataques.

## OWASP Top 10 (2021)

1. **A01:2021 – Broken Access Control**
   - Escalada de privilegios
   - Bypass de controles de acceso
   
2. **A02:2021 – Cryptographic Failures**
   - Transmisión de datos sensibles sin cifrar
   - Uso de algoritmos criptográficos débiles

3. **A03:2021 – Injection**
   - SQL Injection
   - Command Injection
   - LDAP Injection

4. **A04:2021 – Insecure Design**
   - Fallas en el diseño de seguridad
   - Falta de controles de seguridad

5. **A05:2021 – Security Misconfiguration**
   - Configuraciones por defecto
   - Mensajes de error detallados

6. **A06:2021 – Vulnerable and Outdated Components**
   - Uso de bibliotecas desactualizadas
   - Componentes con vulnerabilidades conocidas

7. **A07:2021 – Identification and Authentication Failures**
   - Sesiones mal gestionadas
   - Autenticación débil

8. **A08:2021 – Software and Data Integrity Failures**
   - Deserialización insegura
   - Actualizaciones sin verificación

9. **A09:2021 – Security Logging and Monitoring Failures**
   - Falta de logging adecuado
   - Respuestas lentas a incidentes

10. **A10:2021 – Server-Side Request Forgery (SSRF)**
    - Solicitudes no validadas a recursos internos

## Vulnerabilidades Comunes

### Injection
- [SQL Injection](web-security/sql-injection.md)
- Command Injection
- LDAP Injection
- XPath Injection

### Broken Authentication
- Session Hijacking
- Credential Stuffing
- Brute Force

### Cross-Site Scripting (XSS)
- [XSS](web-security/xss.md)
- Reflected XSS
- Stored XSS
- DOM-based XSS

### Broken Access Control
- Insecure Direct Object Reference (IDOR)
- Path Traversal
- Missing Function Level Access Control

### Security Misconfiguration
- Default Credentials
- Directory Listing
- Unnecessary Services

### Cross-Site Request Forgery (CSRF)
- [CSRF](web-security/csrf.md)

### Server-Side Request Forgery (SSRF)
- [SSRF](web-security/ssrf.md)

## Metodología de Testing

### 1. Reconocimiento
- Identificar tecnologías
- Mapear aplicación
- Encontrar puntos de entrada

### 2. Análisis
- Identificar vulnerabilidades
- Priorizar según impacto
- Documentar hallazgos

### 3. Explotación
- Crear pruebas de concepto
- Verificar impacto
- Documentar evidencia

### 4. Reporting
- Documentar vulnerabilidades
- Incluir pasos de reproducción
- Sugerir remediaciones

## Herramientas

| Herramienta | Propósito |
|-------------|-----------|
| Burp Suite | Proxy interceptor |
| OWASP ZAP | Security testing |
| Nikto | Web server scanner |
| SQLMap | SQL injection |
| XSSer | XSS testing |
| Wfuzz | Web fuzzer |

## Recursos

- [OWASP](https://owasp.org/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackerOne Hacktivity](https://hackerone.com/hacktivity)
- [Bug Bounty Platforms](https://www.bugcrowd.com/)

## Mejores Prácticas

> [!TIP]
> Siempre:
> - Valida y sanitiza todas las entradas
> - Usa HTTPS para toda comunicación
> - Implementa rate limiting
> - Usa tokens CSRF
> - Mantén componentes actualizados
> - Implementa logging adecuado
> - Usa headers de seguridad
