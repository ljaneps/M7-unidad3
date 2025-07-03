# Unidad 3. Interacción con Bases de Datos en Node.js

Desarrolla una API REST en Node.js que permita gestionar recursos de temática libre y que interactúe con bases de datos SQL o NoSQL. Además, optimiza la API utilizando Redis como sistema de cache para reducir la carga en las bases de datos y mejorar el rendimiento.

Se ha creado un crud completo conectado a MysSQL con datos de productos.
▪ Implementar las operaciones CRUD sobre ese modelo utilizando Sequelize:

# Crear un nuevo recurso.

![Captura de pantalla 2025-07-02 213031](https://github.com/user-attachments/assets/2f43b6fa-9ca9-4461-80f9-15ff9e7e9170)

▪Implementa un tiempo de expiración del cache (TTL) de 30 minutos para los datos almacenados en Redis.

![Captura de pantalla 2025-07-03 224213](https://github.com/user-attachments/assets/89cea816-4e8d-492c-8f90-b5ed19e67201)

# Leer los recursos existentes.

![Captura de pantalla 2025-07-02 213045](https://github.com/user-attachments/assets/72e76ca8-fbfb-416f-8f0b-fc355c2340a1)

Se ha creado una petición por medio de id, pero no he conseguido que lo pille de la caché. He cambiado el orden por si por temas de ruta pillaba primero de base de datos. La incluyo para que se vea el desarrollo por si me faltase algo que no he visto.

![Captura de pantalla 2025-07-02 214452](https://github.com/user-attachments/assets/cc044d13-52ed-4105-ae2f-d74de2e2dcd0)

# Actualizar un recurso.
Se actualiza también la caché cuando se actualiza un producto.

![Captura de pantalla 2025-07-02 214701](https://github.com/user-attachments/assets/8f4cdac9-362d-424e-bab8-f5d3c47da672)

# Eliminar un recurso.
Se actualiza la lista de todos los productos cuando se elimina uno. 

![Captura de pantalla 2025-07-02 214440](https://github.com/user-attachments/assets/8159d50b-76ea-45a6-9d95-0bf427053b84)

Implementación de redis:

![Captura de pantalla 2025-07-03 205921](https://github.com/user-attachments/assets/0eda12b8-7d0f-4f1e-bb75-a849b1a1ecbc)

![Captura de pantalla 2025-07-03 222401](https://github.com/user-attachments/assets/619540b4-1244-4660-93a3-51cae7b28bc0)

Tabla de base de datos desde la que se obtiene la información:
![image](https://github.com/user-attachments/assets/40a0704a-6f73-463f-b675-ec2e46ea8472)



