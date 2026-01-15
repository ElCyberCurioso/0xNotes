# Burp Suite

## ¿Qué es Burp Suite?

Burp Suite es la herramienta más popular para testing de seguridad en aplicaciones web. Actúa como un proxy interceptor entre tu navegador y el servidor.

## Versiones

- **Community Edition**: Gratuita, funcionalidad limitada
- **Professional**: $399/año, incluye scanner automático
- **Enterprise**: Para organizaciones grandes

## Instalación

```bash
# Linux
sudo apt install burpsuite

# O descargar de
# https://portswigger.net/burp/communitydownload
```

## Configuración Inicial

### 1. Proxy Setup

1. Abrir Burp Suite
2. Ir a Proxy → Options
3. Verificar que está escuchando en 127.0.0.1:8080

### 2. Configurar Navegador

**Firefox (recomendado):**
1. Settings → Network Settings
2. Manual proxy configuration
3. HTTP Proxy: 127.0.0.1, Port: 8080
4. Check "Also use this proxy for HTTPS"

**Chrome:**
- Usar extensión como FoxyProxy

### 3. Certificado SSL

1. Con proxy configurado, visitar http://burp
2. Descargar CA Certificate
3. Importar en navegador
4. Confiar en el certificado

## Herramientas Principales

### Proxy

Interceptar y modificar requests/responses.

```
1. Activar intercept (Intercept is on)
2. Navegar en el navegador
3. Request aparece en Burp
4. Modificar si necesario
5. Forward o Drop
```

### Repeater

Reenviar requests modificadas múltiples veces.

```
1. Desde cualquier parte, right-click → Send to Repeater
2. Modificar request
3. Click "Send"
4. Ver response
5. Repetir según necesario
```

### Intruder

Automatizar ataques (limitado en Community).

**Tipos de ataque:**
- **Sniper**: Un payload set, una posición a la vez
- **Battering ram**: Un payload set, todas las posiciones simultáneamente
- **Pitchfork**: Múltiples payload sets, en paralelo
- **Cluster bomb**: Múltiples payload sets, todas las combinaciones

### Decoder

Encoding/decoding de datos.

**Soporta:**
- URL encoding
- HTML encoding
- Base64
- Hex
- ASCII
- Gzip

### Comparer

Comparar dos requests/responses para encontrar diferencias.

### Sequencer

Analizar la aleatoriedad de tokens (session tokens, CSRF tokens).

## Uso Práctico

### Encontrar vulnerabilidades XSS

```
1. Interceptar form submission
2. Send to Repeater
3. Modificar parámetro: <script>alert('XSS')</script>
4. Send
5. Verificar en response si se ejecuta
```

### SQL Injection

```
1. Interceptar request con parámetro de DB
2. Send to Repeater
3. Probar payloads:
   id=1' OR '1'='1
   id=1 UNION SELECT NULL--
4. Observar responses diferentes
5. O usar Intruder con wordlist de SQLi
```

### Session Hijacking

```
1. Interceptar request con session cookie
2. Copiar valor del cookie
3. Usar en otra sesión/navegador
4. Verificar si ganas acceso
```

## Extensions

### BApp Store

Burp tiene marketplace de extensiones.

**Útiles:**
- **Autorize**: Testing de authorization
- **Logger++**: Logging avanzado
- **Turbo Intruder**: Intruder más rápido
- **Active Scan++**: Checks adicionales
- **Retire.js**: Detección de librerías vulnerables

### Instalar extensión

```
1. Extender → BApp Store
2. Buscar extensión
3. Install
```

## Tips y Trucos

### Scope

Define qué targets están en scope:

```
1. Target → Site map
2. Right-click on host → Add to scope
3. Proxy → Options → Intercept Client Requests
4. Enable "And URL is in target scope"
```

### Match and Replace

Automatizar modificaciones:

```
1. Proxy → Options → Match and Replace
2. Add
3. Type: Request header
4. Match: User-Agent: .*
5. Replace: User-Agent: CustomUA
```

### Shortcuts

- `Ctrl+R`: Send to Repeater
- `Ctrl+I`: Send to Intruder
- `Ctrl+Shift+B`: Base64 encode
- `Ctrl+Shift+U`: URL encode

## Colaboración con otras herramientas

### Con SQLMap

```bash
# Guardar request desde Burp
Right-click → Copy to file → request.txt

# Usar con SQLMap
sqlmap -r request.txt
```

### Con Nikto

```bash
# Usar Burp como proxy
nikto -h http://target.com -useproxy http://127.0.0.1:8080
```

## Scanner (Pro only)

### Active Scan

```
1. Right-click on request → Actively scan this request
2. Configure opciones
3. Start scan
4. Ver resultados en Dashboard
```

### Passive Scan

Escaneo automático mientras navegas (siempre activo).

## Proyecto Professional Features

- **Scanner automático**
- **Intruder sin límite de velocidad**
- **Save/restore state**
- **Task scheduler**
- **Reporting**

## Limitaciones Community

- Intruder throttled (lento)
- No scanner automático
- No save project
- Funcionalidad básica pero suficiente para aprender

## Referencias

- [PortSwigger Academy](https://portswigger.net/web-security)
- [Burp Suite Documentation](https://portswigger.net/burp/documentation)
