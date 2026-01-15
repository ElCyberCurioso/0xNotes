# Nmap

## ¿Qué es Nmap?

Nmap (Network Mapper) es una herramienta de código abierto para escaneo de redes y auditoría de seguridad. Se utiliza para descubrir hosts y servicios en una red.

## Instalación

```bash
# Linux
sudo apt install nmap

# macOS
brew install nmap

# Windows
# Descargar desde https://nmap.org/download.html
```

## Comandos Básicos

```bash
# Escaneo básico
nmap 192.168.1.1

# Escanear rango de IPs
nmap 192.168.1.1-254
nmap 192.168.1.0/24

# Escanear múltiples hosts
nmap 192.168.1.1 192.168.1.5 192.168.1.10

# Desde archivo
nmap -iL hosts.txt
```

## Escaneo de Puertos

```bash
# Puerto específico
nmap -p 80 192.168.1.1

# Múltiples puertos
nmap -p 80,443,8080 192.168.1.1

# Rango de puertos
nmap -p 1-1000 192.168.1.1

# Todos los puertos
nmap -p- 192.168.1.1

# Top 100 puertos (rápido)
nmap -F 192.168.1.1

# Top N puertos
nmap --top-ports 20 192.168.1.1
```

## Tipos de Escaneo

### TCP SYN Scan (Stealth)
```bash
nmap -sS 192.168.1.1
# Requiere privilegios root/admin
# Más rápido y sigiloso
```

### TCP Connect Scan
```bash
nmap -sT 192.168.1.1
# No requiere privilegios
# Completa el handshake TCP
```

### UDP Scan
```bash
nmap -sU 192.168.1.1
# Más lento
# Importante para servicios UDP (DNS, SNMP)
```

### Comprehensive Scan
```bash
# TCP + UDP
nmap -sS -sU -p T:1-65535,U:1-65535 192.168.1.1
```

## Detección de Servicios y Versiones

```bash
# Detectar versiones
nmap -sV 192.168.1.1

# Intensidad de detección (0-9)
nmap -sV --version-intensity 5 192.168.1.1

# Versión agresiva
nmap -sV --version-all 192.168.1.1

# Detección ligera
nmap -sV --version-light 192.168.1.1
```

## Detección de Sistema Operativo

```bash
# OS detection
nmap -O 192.168.1.1

# OS detection agresivo
nmap -O --osscan-guess 192.168.1.1

# Limitar intentos
nmap -O --max-os-tries 1 192.168.1.1
```

## Nmap Scripting Engine (NSE)

### Scripts por defecto
```bash
nmap -sC 192.168.1.1
# Equivale a: nmap --script=default 192.168.1.1
```

### Scripts específicos
```bash
# Un script
nmap --script http-title 192.168.1.1

# Múltiples scripts
nmap --script http-title,http-headers 192.168.1.1

# Categoría de scripts
nmap --script vuln 192.168.1.1
```

### Categorías de Scripts

```bash
# Vulnerabilidades
nmap --script vuln 192.168.1.1

# Fuerza bruta
nmap --script brute 192.168.1.1

# Discovery
nmap --script discovery 192.168.1.1

# Exploits
nmap --script exploit 192.168.1.1

# Autenticación
nmap --script auth 192.168.1.1
```

### Scripts Útiles

```bash
# HTTP
nmap --script http-enum -p80 192.168.1.1
nmap --script http-headers -p80 192.168.1.1
nmap --script http-methods -p80 192.168.1.1
nmap --script http-title -p80 192.168.1.1

# SMB
nmap --script smb-enum-shares -p445 192.168.1.1
nmap --script smb-enum-users -p445 192.168.1.1
nmap --script smb-os-discovery -p445 192.168.1.1
nmap --script smb-vuln-* -p445 192.168.1.1

# SSL/TLS
nmap --script ssl-enum-ciphers -p443 192.168.1.1
nmap --script ssl-heartbleed -p443 192.168.1.1
nmap --script ssl-poodle -p443 192.168.1.1

# DNS
nmap --script dns-brute ejemplo.com
nmap --script dns-zone-transfer --script-args dns-zone-transfer.domain=ejemplo.com

# SSH
nmap --script ssh-brute -p22 192.168.1.1
nmap --script ssh-auth-methods -p22 192.168.1.1

# MySQL
nmap --script mysql-info -p3306 192.168.1.1
nmap --script mysql-enum -p3306 192.168.1.1
```

## Timing y Performance

### Templates de Timing
```bash
nmap -T0 192.168.1.1  # Paranoid (IDS evasion)
nmap -T1 192.168.1.1  # Sneaky
nmap -T2 192.168.1.1  # Polite
nmap -T3 192.168.1.1  # Normal (default)
nmap -T4 192.168.1.1  # Aggressive
nmap -T5 192.168.1.1  # Insane
```

### Control Manual
```bash
# Parallelismo de hosts
nmap --min-hostgroup 50 --max-hostgroup 100 192.168.1.0/24

# Paralelismo de probes
nmap --min-parallelism 100 192.168.1.1

# Timeouts
nmap --min-rtt-timeout 100ms --max-rtt-timeout 500ms 192.168.1.1

# Tasa de envío
nmap --min-rate 100 192.168.1.1
nmap --max-rate 1000 192.168.1.1
```

## Evasión de Firewalls/IDS

```bash
# Fragmentación de paquetes
nmap -f 192.168.1.1

# MTU personalizado
nmap --mtu 24 192.168.1.1

# Decoys (señuelos)
nmap -D RND:10 192.168.1.1
nmap -D decoy1,decoy2,ME,decoy3 192.168.1.1

# Spoofing de IP origen
nmap -S <IP_FALSA> 192.168.1.1

# Puerto origen específico
nmap --source-port 53 192.168.1.1
nmap -g 53 192.168.1.1

# Randomizar orden de hosts
nmap --randomize-hosts 192.168.1.0/24

# Data length
nmap --data-length 25 192.168.1.1
```

## Output y Reporting

```bash
# Output normal
nmap -oN output.txt 192.168.1.1

# Output XML
nmap -oX output.xml 192.168.1.1

# Output greppable
nmap -oG output.grep 192.168.1.1

# Todos los formatos
nmap -oA scan_results 192.168.1.1

# Output a pantalla y archivo
nmap -oN output.txt --open 192.168.1.1
```

## Host Discovery

```bash
# Ping scan (no port scan)
nmap -sn 192.168.1.0/24

# No ping (asumir host up)
nmap -Pn 192.168.1.1

# TCP SYN ping
nmap -PS 192.168.1.1

# TCP ACK ping
nmap -PA 192.168.1.1

# UDP ping
nmap -PU 192.168.1.1

# ARP ping (solo red local)
nmap -PR 192.168.1.0/24

# Disable DNS resolution
nmap -n 192.168.1.1
```

## Escaneos Combinados Útiles

### Escaneo rápido
```bash
nmap -T4 -F 192.168.1.1
```

### Escaneo completo
```bash
nmap -T4 -A -v 192.168.1.1
# -A: OS detection, version detection, script scanning, traceroute
```

### Escaneo de vulnerabilidades
```bash
nmap -sV --script vuln -p- 192.168.1.1
```

### Escaneo stealth completo
```bash
nmap -sS -sV -O -T2 -f -p- --randomize-hosts -D RND:10 192.168.1.0/24
```

### Escaneo de red interna
```bash
nmap -sn 192.168.1.0/24 -oG - | awk '/Up$/{print $2}' > live_hosts.txt
nmap -sS -A -iL live_hosts.txt -oA internal_scan
```

## Filtrado de Resultados

```bash
# Solo puertos abiertos
nmap --open 192.168.1.1

# Verbose
nmap -v 192.168.1.1
nmap -vv 192.168.1.1

# Razón del estado del puerto
nmap --reason 192.168.1.1

# Mostrar paquetes enviados/recibidos
nmap --packet-trace 192.168.1.1
```

## Scripts Personalizados

### Ubicación de scripts
```bash
# Linux
/usr/share/nmap/scripts/

# Ver todos los scripts
ls /usr/share/nmap/scripts/

# Actualizar base de datos de scripts
nmap --script-updatedb
```

### Información de scripts
```bash
# Ver ayuda de un script
nmap --script-help http-enum

# Argumentos de scripts
nmap --script http-enum --script-args http-enum.basepath='/admin/' 192.168.1.1
```

## Ejemplos Prácticos

### Escanear web server
```bash
nmap -p 80,443 -sV --script http-enum,http-headers,http-methods 192.168.1.1
```

### Escanear vulnerabilidades Windows
```bash
nmap -p 445 --script smb-vuln-* 192.168.1.1
```

### Escanear MySQL
```bash
nmap -p 3306 --script mysql-info,mysql-audit,mysql-databases,mysql-dump-hashes 192.168.1.1
```

### Escanear red completa
```bash
nmap -sn 192.168.1.0/24 -oG - | grep "Status: Up" | cut -d' ' -f2 > live.txt
nmap -sS -A -p- --script vuln -iL live.txt -oA full_network_scan
```

## Interpretación de Resultados

### Estados de Puertos
- **open**: Puerto abierto y escuchando
- **closed**: Puerto cerrado (accesible pero sin servicio)
- **filtered**: Firewall bloquea el puerto
- **unfiltered**: Puerto accesible pero estado desconocido
- **open|filtered**: Nmap no puede determinar
- **closed|filtered**: Nmap no puede determinar

## Performance Tips

```bash
# Escaneo rápido de red
nmap -T4 -F -n --max-retries 1 --host-timeout 5m 192.168.1.0/24

# Escaneo exhaustivo (lento pero completo)
nmap -T2 -sS -sU -p- -sV -O --script default,vuln --max-retries 3 192.168.1.1
```

## Notas Importantes

> [!WARNING]
> **Consideraciones:**
> - Escaneos agresivos pueden ser detectados por IDS/IPS
> - `-A` flag puede ser invasivo
> - Siempre ten autorización antes de escanear
> - Algunos scripts pueden crashear servicios

> [!TIP]
> **Best Practices:**
> - Empieza con escaneos ligeros
> - Guarda todos los outputs (-oA)
> - Usa verbose (-v) para ver progreso
> - Combina con otras herramientas
> - Lee la documentación de scripts antes de usarlos

## Referencias

- [Nmap Official Documentation](https://nmap.org/book/man.html)
- [NSE Scripts](https://nmap.org/nsedoc/)
- [Nmap Cheat Sheet](https://www.stationx.net/nmap-cheat-sheet/)
