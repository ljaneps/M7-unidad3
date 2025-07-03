const express = require('express');

const app = express();
const productosRouter = require('./routes/productos');
const sequelize = require('./models');

app.use(express.json());
app.use('/productos', productosRouter);

sequelize.sync()
    .then(() => {
        console.log('Conexión a la base de datos establecida');

        app.listen(3000, () => {
          console.log("Servidor escuchando en el puerto 3000");
        });
    })    
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

