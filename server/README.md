<!-- server/README.md -->
# Servidor Final

## Descripción

Este es el componente del servidor del proyecto Final, que proporciona una API RESTful para gestionar usuarios, productos, carritos y tickets. El servidor está construido con Node.js y Express, y utiliza MongoDB para la persistencia de datos.

## Características

- Registro y autenticación de usuarios utilizando JWT.
- Autorización basada en roles para funcionalidades de admin y usuario.
- Operaciones CRUD para productos.
- Gestión del carrito, incluyendo la adición de productos y compras.
- Generación de tickets tras una compra exitosa.
  
## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript para construir aplicaciones del lado del servidor.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos.
- **Mongoose**: Biblioteca ODM para MongoDB y Node.js.
- **JWT**: JSON Web Tokens para la autenticación segura de usuarios.
- **Passport**: Middleware para la autenticación.
- **Bcrypt**: Biblioteca para hashear contraseñas.
