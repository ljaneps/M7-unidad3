const {createClient} = require('redis')
const redisClient = createClient()

redisClient.on('error', (err) => {
    console.error('Error de conexión a Redis:', err);
});

redisClient.connect()
    .then(() => {
        console.log('Conexión a Redis establecida');
    })
    .catch((err) => {
        console.error('Error al conectar a Redis:', err);
    });

module.exports = redisClient;