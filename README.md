# Unidad 3. Interacción con Bases de Datos en Node.js

Desarrolla una API REST en Node.js que permita gestionar recursos de temática libre y que interactúe con bases de datos SQL o NoSQL. Además, optimiza la API utilizando Redis como sistema de cache para reducir la carga en las bases de datos y mejorar el rendimiento.

Se ha creado un crud completo conectado a MysSQL con datos de productos.
▪ Implementar las operaciones CRUD sobre ese modelo utilizando Sequelize:

# Crear un nuevo recurso.

▪Implementa un tiempo de expiración del cache (TTL) de 30 minutos para los datos almacenados en Redis.

# Leer los recursos existentes.

Se ha creado una petición por medio de id, pero no he conseguido que lo pille de la caché. He cambiado el orden por si por temas de ruta pillaba primero de base de datos. La incluyo para que se vea el desarrollo por si me faltase algo que no he visto.

# Actualizar un recurso.
Se actualiza también la caché cuando se actualiza un producto.

# Eliminar un recurso.
Se actualiza la lista de todos los productos cuando se elimina uno. 