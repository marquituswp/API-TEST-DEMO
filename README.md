# API-TEST-DEMO

# Descripción
API-TEST-DEMO es una aplicación web que permite a los usuarios registrados visualizar y filtrar webs, dejar reviews, editar su perfil y borrar su cuenta. Además, los administradores pueden manejar los comercios y los comercios pueden manejar las webs.

Finalidad: Demostración de una API RESTful con autenticación y autorización, validación de datos, documentación con Swagger y envío de correos electrónicos.

Envío de correos electrónicos: Funcionalidad creada en el backend pero no implementada en la aplicación web.

# Tecnologías
- Backend: Node.js, Express, MongoDB
- Frontend: Next.js
- Base de datos: MongoDB
- Autenticación: JWT
- Validación: express-validator
- Documentación: Swagger


# Backend
Usar el comando `pnpm install` para instalar las dependencias necesarias.

Usar el comando `pnpm start` para iniciar el servidor

# Frontend nextjs
Usar el comando `pnpm install` para instalar las dependencias necesarias.

Usar el comando `pnpm run dev` para iniciar el servidor

# Demo de la aplicación

## Usuario no registrado

Un usuario no registrado podra visualizar las webs, pudiendo filtrarlas por ciudad o intereses. Y ordenarlas por scoring o fecha de creación.

![alt text](/imagesDocs/image.png)

![alt text](/imagesDocs/image-1.png)

**Detalles de una web**

![alt text](/imagesDocs/image-4.png)

Además, podrá registrarse en la aplicación e iniciar sesión.

![alt text](/imagesDocs/image-2.png)

**El logo IMMUNEAPI te manda a la página principal**

![alt text](/imagesDocs/image-3.png)

## Usuario registrado no administrador
**Ejemplo de usuario no administrador:**
* Name: UsuarioTest
* Age: 25
* Email: usuarioTest@gmail.com
* Password: 1234567890
* City: Mallorca
* Add Interests: Surf (Puedes añadir los intereses que quieras, pulsando add interests despues de escribir)
* Allow Offers: true (marca la casilla si quieres recibir ofertas)

Un usuario registrado podrá hacer todo lo anterior, además de poder dejar una review en la Web que desee.

![alt text](/imagesDocs/image-5.png)

![alt text](/imagesDocs/image-6.png)

**El usuario podrá editar su perfil** 
- En el menú desplegable de la derecha, pulsar Profile

![alt text](/imagesDocs/image-7.png)

**Y borrar su cuenta**

![alt text](/imagesDocs/image-8.png)

## Usuario registrado administrador

**Usuario admin:**
* email: user35@test.com
* password: HolaMundo01

Un admin puede hacer todo lo anterior, además de poder manejar los comercios

![alt text](/imagesDocs/image-9.png)

**Podrá ver todos los comercios existentes**

![alt text](/imagesDocs/image-10.png)

**Y con más detalle:**

![alt text](/imagesDocs/image-15.png)

**Podrá añadir un comercio**
- **Ejemplo de un comercio:**
  - Nombre: ComercioTest
  - CIF: 11111111A (9 caracteres)
  - Email: comerciotest@gmail.com
  - Phone: 123456789
  - PageId: 1234

![alt text](/imagesDocs/image-11.png)

**Cuando se crea un comercio exitosamente, saldrá un botón para copiar el token del comercio**

![alt text](/imagesDocs/image-14.png)

**Podrá editar un comercio**
- Para ello, se debe ingresar el CIF del comercio a editar

![alt text](/imagesDocs/image-12.png)

**Si ingresas un CIF correcto:**

![alt text](/imagesDocs/image-25.png)

**Podrá borrar un comercio de forma física o lógica**
- Para ello, se debe ingresar el CIF del comercio a borrar

![alt text](/imagesDocs/image-13.png)

# Comercio registrado

**Para loggear un comercio, un administrador debe hacerlo de la siguiente manera:**
- Iniciar sesión con un usuario administrador
- Pulsar en el menú desplegable de la derecha
- Pulsar en Commerces
- Pulsar en uno de los comercios existentes con el cual se quiera loggear
- Añadir el token del comercio en el campo de texto y pulsar en Loggear

![alt text](/imagesDocs/image-16.png)

**Una vez loggeado, el comercio podrá crear una Web, editarla, borrarla, ver los usuarios interesados en ella y subir imágenes o textos**

![alt text](/imagesDocs/image-17.png)

**Ejemplo de una Web:**
- City: Mallorca
- Activity: Surf
- Title: SurfMallorca
- Summary: Surf en Mallorca
- Add Text: (Puedes añadir los textos que quieras, pulsando add text despues de escribir)

![alt text](/imagesDocs/image-19.png)

**Cuando ya hay una Web creada, se puede modificar la misma**

![alt text](/imagesDocs/image-20.png)

**Ver los usuarios interesados en la misma**

![alt text](/imagesDocs/image-21.png)

**Subir imágenes o textos**

![alt text](/imagesDocs/image-22.png)

**Borrar la Web física o lógicamente**

![alt text](/imagesDocs/image-23.png)

**Si no hay una Web creada, las demás opciones indicarán un mensaje de error de NO_WEB**

![alt text](/imagesDocs/image-24.png)

## Resumen de la aplicación

- **Usuario no registrado:**
  - Puede visualizar las webs
  - Puede filtrar las webs
  - Puede registrarse
  - Puede iniciar sesión

- **Usuario registrado no administrador:**
    - Puede hacer todo lo anterior
    - Puede dejar una review
    - Puede editar su perfil
    - Puede borrar su cuenta

- **Usuario registrado administrador:**
    - Puede hacer todo lo anterior
    - Puede manejar los comercios

- **Comercio registrado:**
    - Puede hacer todo lo anterior
    - Puede manejar las webs

### Resumen de ejecución de la aplicación

**USANDO EL USUARIO ADMINISTRADOR DE EJEMPLO PODRÁS VER TODAS LAS FUNCIONALIDADES DE LA APLICACIÓN**

**Si has registrado el usuario ejemplo, has creado el comercio ejemplo y la web ejemplo:**

- En usuarios interesados te saldrá el usuario que hayas registrado
- Cuando quieras visualizar las webs, te saldra la web que hayas creado

