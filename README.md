# 0xNotes

> Notas personales de ciberseguridad, pentesting y hacking ético.

---

## Navegación Rápida

| Sección | Contenido |
|---------|-----------|
| 📡 [Pentesting](pentesting/README.md) | Metodología completa: recon, enumeración, explotación, post-explotación |
| 🌐 [Web Security](web-security/README.md) | OWASP Top 10, SQLi, XSS, CSRF, SSRF |
| 🔧 [Herramientas](herramientas/README.md) | Nmap, Metasploit, Burp Suite, Wireshark |
| 🖥️ [Sistemas](sistemas/README.md) | Linux, Windows, Privilege Escalation |
| 🏴 [CTF Writeups](ctf/README.md) | HackTheBox, TryHackMe |
| 📚 [Recursos](recursos/README.md) | Cheatsheets, links, certificaciones |

---

## Referencia Rápida

### Comandos de Arranque Habituales

```bash
# Escaneo inicial
nmap -sC -sV -p- --min-rate 5000 <IP>

# Server HTTP rápido para transferir ficheros
python3 -m http.server 8080

# Listener Netcat
nc -nvlp 4444

# Estabilizar shell
python3 -c 'import pty;pty.spawn("/bin/bash")'
# Ctrl+Z  →  stty raw -echo; fg  →  reset
```

### Google Dorks Rápidos

```
site:ejemplo.com filetype:pdf
intitle:"index of" site:ejemplo.com
inurl:admin site:ejemplo.com
site:ejemplo.com ext:xml | ext:conf | ext:env
```

### Wordlists Más Usadas

```bash
/usr/share/wordlists/rockyou.txt
/usr/share/seclists/Discovery/Web-Content/common.txt
/usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
/usr/share/seclists/Usernames/top-usernames-shortlist.txt
```

---

## Plataformas de Práctica

- 🟥 [HackTheBox](https://www.hackthebox.com/) — Máquinas realistas
- 🟢 [TryHackMe](https://tryhackme.com/) — Labs guiados
- 🔵 [PortSwigger Academy](https://portswigger.net/web-security) — Web security
- ⚪ [VulnHub](https://www.vulnhub.com/) — VMs offline

---

> [!WARNING]
> Toda la información de estas notas es únicamente con fines educativos.
> Obtén siempre autorización explícita antes de realizar cualquier prueba de seguridad.

*Última actualización: Abril 2026*
