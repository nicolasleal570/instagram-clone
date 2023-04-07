# Digital Tech Inc.

Prueba técnica realizada con el fin de aplicar al puesto de **Senior Frontend Developer** en [Zinli](https://www.zinli.com/).

Fue desarrollada principalmente utilizando React con Typescript y consistió en crear una aplicación semejante a Instagram y Twitter donde el usuario podía hacer publicaciones.

Para persistir los datos se utilizó el localStorage ya que la prueba no contemplaba el uso de una API externa.

## Módulos de la aplicación

- Inicio de sesión por nombre de usuario
- Registro para nuevos usuarios
- Feed de publicaciones tipo Instagram y Twitter
- Perfil de usuarios
- Agregar nueva publicación
- Buscador de publicaciones

Por otra parte se le hicieron **tests unitarios** a los componentes más importantes que afectaban el flujo principal de la aplicación.

## Arrancar el proyecto

Primero clonamos el proyecto

    git clone https://github.com/nicolasleal570/instagram-clone
    cd instagram-clone

Crear el archivo **`.env.development`** partiendo del **`.env.example`**:

    cp .env.example .env.development

Completamos el archivo **`.env.development`** con las variables correspondientes y luego procedemos a la ejecución del proyecto:

    yarn install
    yarn dev
