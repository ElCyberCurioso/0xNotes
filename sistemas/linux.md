# Linux

## Comandos Útiles

### Navegación y Archivos
```bash
# Buscar archivos
find / -name "*.conf" 2>/dev/null
find / -type f -perm -u=s 2>/dev/null  # SUID
find / -type f -perm -g=s 2>/dev/null  # SGID
find / -writable -type d 2>/dev/null   # Directorios escribibles

# Contenido de archivos
cat /etc/passwd
grep -r "password" /home 2>/dev/null

# Permisos
ls -la
chmod +x script.sh
chown user:group file.txt
```

### Usuarios y Grupos
```bash
# Información de usuarios
id
whoami
w
who
last

# Ver todos los usuarios
cat /etc/passwd

# Ver grupos
cat /etc/group
groups usuario
```

### Procesos y Servicios
```bash
# Procesos
ps aux
ps -ef
top
htop

# Servicios
systemctl list-units --type=service
service --status-all
netstat -tulpn
ss -tulpn
```

### Red
```bash
# Interfaces
ifconfig
ip addr
ip route

# Conexiones
netstat -ano
ss -antp

# Firewall
iptables -L
ufw status
```

## Hardening

### Actualizaciones
```bash
# Debian/Ubuntu
sudo apt update
sudo apt upgrade
sudo apt autoremove

# RHEL/CentOS
sudo yum update
sudo yum upgrade

# Arch
sudo pacman -Syu
```

### SSH
```bash
# Editar /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222  # Cambiar puerto
AllowUsers usuario1 usuario2

# Restart SSH
sudo systemctl restart sshd
```

### Firewall
```bash
# UFW (Ubuntu)
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# iptables
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -j DROP
```

### Fail2Ban
```bash
# Instalar
sudo apt install fail2ban

# Configurar
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# [sshd]
# enabled = true
# maxretry = 3
# bantime = 3600

sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Archivos de Configuración Importantes

```bash
# Sistema
/etc/passwd      # Usuarios
/etc/shadow      # Passwords hasheados
/etc/group       # Grupos
/etc/sudoers     # Privilegios sudo
/etc/hosts       # DNS local
/etc/fstab       # Filesystems

# Red
/etc/network/interfaces
/etc/resolv.conf

# Servicios
/etc/ssh/sshd_config
/etc/apache2/apache2.conf
/etc/nginx/nginx.conf
/etc/mysql/my.cnf

# Logs
/var/log/syslog
/var/log/auth.log
/var/log/apache2/access.log
/var/log/apache2/error.log
```

## Referencias

- [Linux Privilege Escalation](https://book.hacktricks.xyz/linux-hardening/linux-privilege-escalation-checklist)
- [GTFOBins](https://gtfobins.github.io/)
