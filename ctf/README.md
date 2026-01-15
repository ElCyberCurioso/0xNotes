# 📝 CTF Writeups

## Introducción

Esta sección contiene writeups de máquinas y retos de CTF (Capture The Flag) que he completado.

## Plataformas

### [HackTheBox](ctf/hackthebox.md)
- Máquinas completadas
- Técnicas aprendidas
- Notas personales

### [TryHackMe](ctf/tryhackme.md)
- Rooms completadas
- Paths seguidos
- Certificaciones

## Formato de Writeups

Cada writeup debería incluir:

1. **Información básica**
   - Nombre de la máquina/reto
   - Dificultad
   - OS
   - Fecha de resolución

2. **Reconocimiento**
   - Escaneo de puertos
   - Servicios identificados
   - Enumeración inicial

3. **Explotación**
   - Vulnerabilidad identificada
   - Exploit utilizado
   - Obtención de acceso inicial

4. **Privilege Escalation**
   - Vector utilizado
   - Comandos ejecutados
   - Obtención de root/administrator

5. **Lecciones aprendidas**
   - Técnicas nuevas
   - Errores cometidos
   - Puntos a mejorar

## Template de Writeup

```markdown
# [Nombre de la Máquina]

**Dificultad:** Easy/Medium/Hard  
**OS:** Linux/Windows  
**Fecha:** DD/MM/YYYY

## Reconocimiento

### Nmap
\`\`\`bash
nmap -sC -sV -p- 10.10.10.X
\`\`\`

Resultados:
- Puerto 80: Apache 2.4.X
- Puerto 22: SSH

### Enumeración Web

Encontrado directorio /admin con ...

## Explotación

Vulnerabilidad: SQL Injection en ...

## Privilege Escalation

Vector: SUID binary ...

## Flags

- user.txt: [hash]
- root.txt: [hash]

## Lecciones Aprendidas

1. Nueva técnica de ...
2. Recordar siempre ...
```

## Recursos

- [HackTheBox](https://www.hackthebox.eu/)
- [TryHackMe](https://tryhackme.com/)
- [PicoCTF](https://picoctf.org/)
- [CTFtime](https://ctftime.org/)
