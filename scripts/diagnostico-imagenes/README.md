# Diagnostico de Imagenes — Tagliatela Frontend

Paquete de diagnostico para verificar la integridad de las imagenes de productos en un deploy de produccion.

---

## Para el equipo del cliente

### Pre-requisito

Node.js >= 14 instalado en el servidor. Verifique con:

```
node --version
```

Si no tiene Node, instálelo desde https://nodejs.org (version LTS).

### Como obtener el paquete

El desarrollador le entregara un archivo `.zip` con este contenido. Descomprímalo en el servidor:

```
unzip diagnostico-imagenes.zip
cd diagnostico-imagenes/
```

### Como ejecutar el diagnostico

**IMPORTANTE**: Debe ejecutar los comandos desde el directorio raiz del deploy del frontend (donde esta la carpeta `public/images/`). Ejemplo:

```
cd /var/www/tagliatela-frontend/
```

Luego ejecute el script desde ahi:

#### Modo basico (scrapeo sin manifest)

```
node /ruta/a/diagnostico-imagenes/check-images.mjs
```

Esto recorre `public/images/` y muestra una tabla con todos los archivos `.png` encontrados, sus tamanos y si hay problemas de estructura.

```
Salida de ejemplo:
  FAMILY     | CATEGORY        | DISH (slug)       | VARIANT   | OK  | SIZE  | NOTE
  -----------+-----------------+-------------------+-----------+-----+-------+------
  dishes     | le-pizze        | prosciutto        | 148x148   | OK  | 17K   |
  dishes     | le-pizze        | 4-stagioni        | 148x148   | OK  | 29K   |
  ...
```

#### Modo con manifest (recomendado)

El desarrollador debe incluir el archivo `image-manifest.json`. Copielo al mismo directorio que el script o pase la ruta con `--manifest`:

```
node /ruta/a/diagnostico-imagenes/check-images.mjs --manifest ./image-manifest.json
```

Este modo compara lo que hay en disco contra lo que la base de datos espera. Reporta:
- **OK**: el archivo existe y coincide.
- **MISS**: el archivo que la DB espera NO existe en disco (falta copiarlo o generarlo).
- **Orphans**: archivos en disco que NO estan en el manifest (posibles residuos de productos eliminados).

#### Generar reporte CSV

Agregue la flag `--csv` para generar `image-check-report.csv`:

```
node check-images.mjs --manifest --csv
```

El CSV se puede abrir en Excel o Google Sheets para analisis detallado.

#### Incluir hash MD5

Agregue la flag `--md5` para calcular el hash de cada archivo (util para detectar archivos corruptos o mal copiados):

```
node check-images.mjs --manifest --md5
```

### Como leer el output

| Indicador | Significado |
|-----------|-------------|
| `OK`      | El archivo existe en disco |
| `MISS`    | El archivo NO existe. Debe ser generado o copiado |
| Warning   | Problema de estructura (nombres que no siguen la convencion, archivos huerfanos) |

### Como enviar el reporte al desarrollador

1. Ejecute el script con `--manifest --csv`
2. Tome una captura de pantalla de la terminal con el resultado
3. Adjunte el archivo `image-check-report.csv`
4. Envie ambos al desarrollador

---

## Para el desarrollador (Kevin)

### Regenerar el manifest

Cuando la base de datos cambie (nuevos productos, eliminados, renombrados), regenere el manifest:

```
cd scripts/diagnostico-imagenes/
node build-image-manifest.mjs
```

**Pre-requisitos**:
- Estar en la maquina de desarrollo con acceso a la DB del backend
- Tener `psql` instalado (`sudo apt install postgresql-client` en Ubuntu)
- El archivo `../tagliatela-backend/.env` debe existir y ser accesible

El script:
1. Lee las credenciales de `../tagliatela-backend/.env`
2. Ejecuta 15 consultas SQL contra la DB
3. Genera `image-manifest.json` en el mismo directorio
4. Valida que los archivos existan en `public/images/` local y reporta faltantes

El manifest generado NO incluye las credenciales de DB (el host aparece redactado).

### Empaquetar para enviar al cliente

```
cd scripts/
zip -r diagnostico-imagenes.zip diagnostico-imagenes/ -x "diagnostico-imagenes/node_modules/*"
```

Esto crea un zip con el README, los scripts y el manifest. El cliente solo necesita descomprimir y ejecutar.

---

## Estructura del paquete

| Archivo | Proposito |
|---------|-----------|
| `README.md` | Este documento (instrucciones) |
| `check-images.mjs` | Script de diagnostico para el cliente. Corre en produccion. |
| `build-image-manifest.mjs` | Generador del manifest desde la DB. Corre en desarrollo. |
| `image-manifest.json` | Manifest generado. Lista de todas las imagenes esperadas. |

---

## Troubleshooting

### "node: command not found"

Node.js no esta instalado. Instálelo: https://nodejs.org

### "Cannot find public/images/"

El script no encuentra la carpeta de imagenes. Asegurese de ejecutar el comando desde el directorio raiz del deploy (donde esta `public/images/`).

Ejemplo correcto:
```
cd /var/www/tagliatela-frontend
node /ruta/a/diagnostico-imagenes/check-images.mjs
```

### "image-manifest.json not found"

El manifest no fue generado o no esta en la ubicacion esperada. Opciones:
1. Pida al desarrollador que incluya el archivo en el zip
2. Si es el desarrollador, ejecute `node build-image-manifest.mjs` para generarlo

### "psql: command not found" (desarrollador)

Instale el cliente de PostgreSQL:

```
# Ubuntu/Debian
sudo apt install postgresql-client

# macOS
brew install postgresql
```

---

## English version

### For the client team

**Prerequisite**: Node.js >= 14 on the server. Verify with `node --version`.

**Running the script**:

From the frontend deploy root directory (where `public/images/` lives):

```
node /path/to/diagnostico-imagenes/check-images.mjs
```

With manifest (recommended):
```
node /path/to/diagnostico-imagenes/check-images.mjs --manifest ./image-manifest.json
```

Generate CSV report:
```
node /path/to/diagnostico-imagenes/check-images.mjs --manifest --csv
```

Include MD5 hashes:
```
node /path/to/diagnostico-imagenes/check-images.mjs --manifest --md5
```

**Output legend**: `OK` = file present, `MISS` = file missing, Warnings = structural issues.

### For the developer

Regenerate the manifest after DB changes:
```
cd scripts/diagnostico-imagenes/
node build-image-manifest.mjs
```

Package for delivery:
```
cd scripts/
zip -r diagnostico-imagenes.zip diagnostico-imagenes/ -x "diagnostico-imagenes/node_modules/*"
```
