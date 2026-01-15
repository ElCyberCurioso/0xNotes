# Windows

## PowerShell

### Comandos Básicos
```powershell
# Información del sistema
Get-ComputerInfo
systeminfo
hostname

# Usuarios
Get-LocalUser
Get-LocalGroupMember -Group "Administrators"
whoami /all

# Procesos
Get-Process
Stop-Process -Name notepad

# Servicios
Get-Service
Start-Service -Name <servicio>
Stop-Service -Name <servicio>
```

### Red
```powershell
# Interfaces
Get-NetIPAddress
ipconfig /all

# Conexiones
Get-NetTCPConnection
netstat -ano

# Firewall
Get-NetFirewallRule
New-NetFirewallRule -DisplayName "Block Port 445" -Direction Inbound -LocalPort 445 -Protocol TCP -Action Block
```

## Active Directory

### Enumeración
```powershell
# Dominio
Get-ADDomain
Get-ADForest

# Usuarios
Get-ADUser -Filter *
Get-ADUser -Identity usuario -Properties *

# Grupos
Get-ADGroup -Filter *
Get-ADGroupMember -Identity "Domain Admins"

# Computadoras
Get-ADComputer -Filter *
```

## Hardening

### Windows Update
```powershell
# Verificar actualizaciones
Get-WindowsUpdate

# Instalar actualizaciones
Install-WindowsUpdate -AcceptAll -AutoReboot
```

### Firewall
```powershell
# Habilitar firewall
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True

# Bloquear puerto
New-NetFirewallRule -DisplayName "Block 445" -Direction Inbound -LocalPort 445 -Protocol TCP -Action Block
```

### Defender
```powershell
# Estado
Get-MpComputerStatus

# Escaneo
Start-MpScan -ScanType QuickScan

# Actualizar definiciones
Update-MpSignature
```

## Referencias

- [Windows PrivEsc](https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation)
- [LOLBAS](https://lolbas-project.github.io/)
