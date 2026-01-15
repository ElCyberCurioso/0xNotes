# Privilege Escalation

## Linux

### SUID Binaries
```bash
# Buscar SUID
find / -perm -u=s -type f 2>/dev/null

# Explotar con GTFOBins
# https://gtfobins.github.io/
```

### Sudo
```bash
# Ver permisos sudo
sudo -l

# Explotar configuraciones débiles
# Ver GTFOBins para bypasses
```

### Cron Jobs
```bash
# Ver cron jobs
cat /etc/crontab
ls -la /etc/cron.*

# Explotar si hay scripts writable
```

### Kernel Exploits
```bash
# Ver versión
uname -a

# Buscar exploits
searchsploit linux kernel <version>
```

## Windows

### Token Impersonation
```powershell
# Verificar privilegios
whoami /priv

# Si SeImpersonatePrivilege:
# Usar JuicyPotato, PrintSpoofer, RoguePotato
```

### Services
```powershell
# Servicios mal configurados
accesschk.exe -uwcqv "Authenticated Users" *

# Unquoted service paths
wmic service get name,pathname | findstr /i /v "C:\Windows" | findstr /i /v """
```

### AlwaysInstallElevated
```powershell
# Verificar
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
```

## Herramientas

- LinPEAS / WinPEAS
- Linux Exploit Suggester
- BeRoot
- PowerUp

## Referencias

- [HackTricks PrivEsc](https://book.hacktricks.xyz/)
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)
