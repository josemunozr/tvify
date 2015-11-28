TVify
=====

[Demo de la app sólo frontend](http://slifszyc.github.io/tvify/).
[Demo de la app con Express](http://tvify.herokuapp.com).

Esta fue la aplicación que realizamos en los cursos de [Javascript y jQuery](https://platzi.com/jquery) y [Node.js](https://platzi.com/nodejs) de [Platzi](https://platzi.com).

## Instalación

Para instalar las dependencias de este proyecto, generar los bundles dentro del directorio `public/` y levantar el server para servir esta carpeta, correr los comandos:

```
npm install   // instala dependencias
npm run build // genera el app.js y copia el css y el index.html
npm run serve // levanta el servidor
```

También puede ejecutarse `npm start` que ejecuta los comandos `npm run build` y `npm run serve`.

## Implementación en Heroku

**Nota**: Requiere tener instalado [git](https://git-scm.com/) y [Heroku Toolbelt](https://toolbelt.heroku.com/).

Para hostear esta aplicación en Heroku, seguir estos pasos:

1. Ingresar a [Heroku](https://heroku.com). Si no tienes cuenta, regístrate.

2. Clickea en el botón "+" que está en la esquina superior derecha y elige *Create new app*.

3. Ponle un nombre, que será parte de la URL de la aplicación y luego clickea en *Create App*.

4. Una vez creada la aplicación clickea en la solapa *Resources* y en el cuadro de texto debajo de *Add-ons* escribe y selecciona *MongoLab* (puedes elegir el plan free y continuar).

5. Luego clickea en la solapa *Settings*, luego en el botón *Reveal Config Vars* e ingresa los siguientes clave/valores:
    * Clave: `NODE_PATH`, valor: `./bin`

6. En una Terminal, en la carpeta de la app, ejecutar el siguiente comando por única vez (reemplazar `tvify` por el nombre que le pusieron a la app en el punto 3):
```
heroku git:remote -a tvify
```

7. Para implementar la aplicación en Heroku, ejecutar:
```
git push heroku master
```
Repetir este comando por cada vez que se quiera implementar la app.