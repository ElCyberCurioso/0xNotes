# Wireshark

## ¿Qué es Wireshark?

Wireshark es el analizador de protocolos de red más popular del mundo. Permite capturar y examinar el tráfico de red en tiempo real.

## Instalación

```bash
# Linux
sudo apt install wireshark

# macOS
brew install --cask wireshark

# Windows
# Descargar de https://www.wireshark.org/download.html
```

## Uso Básico

### Capturar Tráfico

```
1. Abrir Wireshark
2. Seleccionar interfaz de red (eth0, wlan0, etc.)
3. Click en el botón de inicio (aleta de tiburón azul)
4. El tráfico empezará a capturarse
5. Click en stop (cuadrado rojo) para detener
```

### Guardar Captura

```
File → Save As → nombre.pcap
```

## Display Filters

### Filtros Comunes

```
# HTTP
http

# HTTPS/TLS
tls
ssl

# DNS
dns

# TCP
tcp
tcp.port == 80
tcp.port == 443

# UDP
udp

# IP específica
ip.addr == 192.168.1.1
ip.src == 192.168.1.1
ip.dst == 192.168.1.1

# Combinaciones
http and ip.addr == 192.168.1.1
tcp.port == 80 or tcp.port == 443
```

### Filtros Avanzados

```
# HTTP Methods
http.request.method == "POST"
http.request.method == "GET"

# HTTP Response codes
http.response.code == 200
http.response.code == 404

# Contains
http contains "password"
tcp contains "admin"

# Flags TCP
tcp.flags.syn == 1
tcp.flags.rst == 1

# Packets con datos
tcp.len > 0
```

## Análisis de Protocolos

### HTTP

```
# Ver requests HTTP
http.request

# Ver responses
http.response

# Filtrar por host
http.host == "example.com"

# Buscar credenciales
http.request.method == "POST" and http contains "password"

# Follow HTTP Stream
Right-click packet → Follow → HTTP Stream
```

### DNS

```
# Queries DNS
dns.flags.response == 0

# Responses DNS
dns.flags.response == 1

# Query específica
dns.qry.name == "example.com"
```

### TLS/SSL

```
# Handshake
tls.handshake

# Client Hello
tls.handshake.type == 1

# Server Hello
tls.handshake.type == 2

# Certificados
tls.handshake.certificate
```

### TCP

```
# SYN packets (inicio conexión)
tcp.flags.syn == 1 and tcp.flags.ack == 0

# SYN-ACK packets
tcp.flags.syn == 1 and tcp.flags.ack == 1

# Retransmissions
tcp.analysis.retransmission

# Lost segments
tcp.analysis.lost_segment
```

## Seguir Streams

### TCP Stream

```
1. Right-click en packet TCP
2. Follow → TCP Stream
3. Ver conversación completa
4. Puede mostrar datos en:
   - ASCII
   - Hex Dump
   - C Arrays
   - Raw
```

### HTTP Stream

Similar a TCP pero formateado para HTTP.

### TLS Stream

Ver tráfico encrypted (necesita claves para decrypt).

## Exportar Objetos

### HTTP Objects

```
File → Export Objects → HTTP
Ver todos los archivos transferidos por HTTP
Guardar individualmente o todos
```

### Otros protocolos

También disponible para:
- IMF (Email)
- SMB
- DICOM
- TFTP

## Estadísticas

### Protocol Hierarchy

```
Statistics → Protocol Hierarchy
Ver breakdown de protocolos capturados
```

### Conversations

```
Statistics → Conversations
Ver todas las conversaciones entre hosts
Tabs: Ethernet, IPv4, IPv6, TCP, UDP
```

### Endpoints

```
Statistics → Endpoints
Ver todos los endpoints (hosts) en la captura
```

### IO Graphs

```
Statistics → I/O Graphs
Graficar tráfico en el tiempo
```

## Casos de Uso

### Detectar Malware

```
# Buscar conexiones sospechosas
http.request.uri contains ".exe"
http.request.uri contains ".dll"

# Dominios sospechosos
dns.qry.name contains "suspicious"

# IPs maliciosas conocidas
ip.addr == <known_bad_ip>
```

### Análisis de Passwords

```
# HTTP Basic Auth
http.authbasic

# FTP credentials
ftp.request.command == "USER" or ftp.request.command == "PASS"

# Telnet (plaintext)
telnet

# POP3
pop
```

### Detectar Escaneos

```
# Port scanning (muchos SYN sin establecer conexión)
tcp.flags.syn == 1 and tcp.flags.ack == 0

# Muchas conexiones a diferentes puertos
Statistics → Conversations → TCP
Ordenar por paquetes
```

### Análisis de Performance

```
# Identificar retransmissions
tcp.analysis.retransmission

# Latencia
tcp.time_delta

# Ventana TCP
tcp.window_size

# Expert Info
Analyze → Expert Information
```

## Decryption

### HTTPS/TLS Decryption

Necesitas clave privada o session keys.

**Con session keys (Chrome/Firefox):**

```bash
# Setear variable de entorno antes de abrir navegador
# Linux/Mac
export SSLKEYLOGFILE=~/ssl-keys.log
# Windows
set SSLKEYLOGFILE=C:\ssl-keys.log

# En Wireshark:
Edit → Preferences → Protocols → TLS
(Pre)-Master-Secret log filename: [ruta al archivo]
```

### WPA/WPA2 Decryption

```
1. Capturar 4-way handshake
2. Edit → Preferences → Protocols → IEEE 802.11
3. Enable decryption
4. Add password
```

## Capture Filters

Aplicados antes de capturar (más eficientes).

```
# Puerto específico
port 80
port 443

# Host específico
host 192.168.1.1

# Red
net 192.168.1.0/24

# Protocolo
tcp
udp
icmp

# Combinaciones
tcp port 80 and host 192.168.1.1
not port 22
```

## Tshark (CLI)

Versión command-line de Wireshark.

```bash
# Capturar en interfaz
tshark -i eth0

# Con filtro
tshark -i eth0 -f "port 80"

# Display filter
tshark -i eth0 -Y "http"

# Guardar a archivo
tshark -i eth0 -w capture.pcap

# Leer archivo
tshark -r capture.pcap

# Estadísticas
tshark -r capture.pcap -q -z http,tree
```

## Tips

> [!TIP]
> **Mejores prácticas:**
> - Usa capture filters para capturas grandes
> - Guarda capturas periódicamente
> - Usa coloring rules para identificar tráfico rápidamente
> - Aprende display filters comunes de memoria
> - Usa "Follow Stream" para ver contexto completo

## Referencias

- [Wireshark Documentation](https://www.wireshark.org/docs/)
- [Wireshark Display Filters](https://wiki.wireshark.org/DisplayFilters)
- [Sample Captures](https://wiki.wireshark.org/SampleCaptures)
