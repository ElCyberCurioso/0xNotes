# Herramientas

## Introducción

Esta sección contiene guías y notas sobre las herramientas más comunes utilizadas en pentesting y ciberseguridad.

## Categorías de Herramientas

### Reconocimiento y Enumeración
- [Nmap](herramientas/nmap.md) - Escaneo de puertos y servicios
- [Masscan](herramientas/masscan.md) - Escaneo masivo rápido
- theHarvester - OSINT
- Amass - Enumeración de subdominios

### Explotación
- [Metasploit](herramientas/metasploit.md) - Framework de explotación
- SQLMap - SQL Injection
- ExploitDB/SearchSploit - Base de datos de exploits

### Web Application Testing
- [Burp Suite](herramientas/burp-suite.md) - Proxy interceptor
- OWASP ZAP - Security scanner
- Nikto - Web server scanner
- Gobuster/Dirb - Directory brute forcing

### Network Analysis
- [Wireshark](herramientas/wireshark.md) - Análisis de tráfico
- tcpdump - Captura de paquetes
- Ettercap - MITM attacks

### Password Cracking
- John the Ripper - Password cracker
- Hashcat - GPU password cracking
- Hydra - Login brute forcer

### Post-Explotación
- Mimikatz - Credential dumping (Windows)
- BloodHound - Active Directory analysis
- LinPEAS/WinPEAS - Privilege escalation enumeration

### Wireless
- Aircrack-ng - WiFi security
- Kismet - Wireless network detector
- Wifite - Automated wireless attacks

### Reverse Engineering
- Ghidra - Disassembler
- IDA Pro - Disassembler
- Radare2 - Reverse engineering framework
- GDB - Debugger

## Instalación

### Kali Linux
La mayoría de herramientas vienen preinstaladas en Kali Linux.

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar herramienta específica
sudo apt install nmap metasploit-framework burpsuite
```

### ParrotOS
Similar a Kali, con muchas herramientas preinstaladas.

### Instalación Manual

#### Linux
```bash
# Nmap
sudo apt install nmap

# Metasploit
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall
chmod +x msfinstall
./msfinstall
```

#### Windows
- Descargar binarios oficiales
- Usar WSL2 para herramientas Linux
- Usar Docker containers

## Comparación de Herramientas

### Escaneo de Puertos

| Herramienta | Velocidad | Precisión | Uso |
|-------------|-----------|-----------|-----|
| Nmap | Media | Alta | General purpose |
| Masscan | Muy alta | Media | Escaneos grandes |
| Unicornscan | Alta | Media | Stealth scanning |

### Web Proxies

| Herramienta | Tipo | Costo | Características |
|-------------|------|-------|-----------------|
| Burp Suite Pro | Comercial | $$$  | Completo, Scanner automático |
| Burp Suite Community | Free | Gratis | Limitado, sin scanner |
| OWASP ZAP | Open Source | Gratis | Scanner automático |

### Password Cracking

| Herramienta | Tipo | Velocidad | Soporte |
|-------------|------|-----------|---------|
| Hashcat | GPU | Muy rápida | Todos los algoritmos |
| John the Ripper | CPU/GPU | Rápida | Muy amplio |
| Hydra | Network | Media | Protocolos de red |

## Mejores Prácticas

> [!TIP]
> **Recomendaciones:**
> - Mantén tus herramientas actualizadas
> - Lee la documentación oficial
> - Entiende cómo funcionan antes de usarlas
> - Ten respaldos de configuraciones
> - Usa VM o containers para aislar herramientas

## Scripts y Automatización

```bash
# Script de actualización de herramientas
#!/bin/bash

echo "[+] Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

echo "[+] Actualizando Metasploit..."
msfupdate

echo "[+] Actualizando wordlists..."
sudo apt install seclists -y

echo "[+] Actualizando Go tools..."
go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install github.com/projectdiscovery/httpx/cmd/httpx@latest

echo "[+] Listo!"
```

## Recursos

- [Kali Tools](https://www.kali.org/tools/)
- [BlackArch Tools](https://blackarch.org/tools.html)
- [SecLists](https://github.com/danielmiessler/SecLists) - Wordlists
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)
