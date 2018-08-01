# Requisitos
- Composer
- Bower
- Npm
# Instalación
1. En la raíz del sitio: 
``` 
cd /xxx/
```
- Instalar dependencias con composer
``` 
composer install
```
- Hacer una copia de **/.env.example** y llamarlo **/.env** 
``` 
cp /xxx/.env.example /xxx/.env
```
- Configurar los datos en el archivo **/.env**
 `DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD` 
 
- Gererar la clave de artisan
``` 
php artisan key:generate
```
- Dar permisos de escritura a la carpetas **/storage/*** y **/bootstrap/cache**
``` 
chmod 777 /xxx/storage/
chmod 777 /xxx/bootstrap/cache
```
2. En la carpeta /public/front/
``` 
cd /xxx/public/front/
```

- Hacer una copia de **/public/front/app/assets/js/constants.js.example** y llamarlo **app/assets/js/constants.js**
``` 
cp /xxx/public/front/app/assets/js/constants.js.example /xxx/public/front/app/assets/js/constants.js
```

- En el archivo **/public/front/app/assets/js/constants.js** configurar la url nueva del sitio: `API_URL`

- Instalar dependencias del front con npm
``` 
npm install
```

- Instalar dependencias del front con bower
``` 
bower install
```

3. Publicar el sitio usando Apache. El archivo de configuración debe ser similar a este:
```     
    Alias /mira /xxx/public/
    <Directory /xxx/public>
        Options +FollowSymLinks -Indexes
        AllowOverride All
        Require all granted

        RewriteEngine On
    </Directory>
```
## Probando el sitio

Ir a `http://servidor/mira/front/app`