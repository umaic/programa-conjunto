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