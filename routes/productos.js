const express = require("express");
const router = express.Router();
const Producto = require("../models/Producto");
const redisClient = require("../db/redis");


// GET - findByPk - Obtener un producto por id
router.get("/id/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const productoKey = `productos:${id}`;
      const cachedProducto = await redisClient.get(productoKey);
  
      if (cachedProducto) {
          console.log(`Producto obtenido desde la caché de Redis: "${id}"`);
        return res.json(JSON.parse(cachedProducto));
      }
  
      console.log(
        "Datos no encontrados en la caché, obteniendo desde la base de datos"
      );
  
      const producto = await Producto.findByPk(id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  });
  

// GET - findAll - Listar productos
router.get("/", async (req, res) => {
  try {
    const cacheKey = "productos:all";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Datos obtenidos desde la caché de Redis");
      return res.json(JSON.parse(cachedData));
    }
    console.log(
      "Datos no encontrados en la caché, obteniendo desde la base de datos"
    );
    const productos = await Producto.findAll();

    //Almacenará también por ides los productos para poder obtenerlos de forma individual.
    for (const producto of productos) {
      const productoKey = `productos:${producto.id}`;
      await redisClient.set(productoKey, JSON.stringify(producto), {
        EX: 1800,
      });
    }

    await redisClient.set(cacheKey, JSON.stringify(productos), {
      EX: 1800, // expiración del cache 30 minutos
    });
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});


// POST - create - Dar de alta nuevo producto
router.post("/", async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const nuevoProducto = await Producto.create({ title, description, price });

    await updateRedisProducto(nuevoProducto);

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

// PUT - Actualizar producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      producto.title = title;
      producto.description = description;
      producto.price = price;
      await producto.save();
      await updateRedisProducto(nuevoProducto);
      res.json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// DELETE - Borrar producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      await producto.destroy();
      await redisClient.del(`productos:${id}`);
      // Actualizamos redis
      const productos = await Producto.findAll();
      await redisClient.set("productos:all", JSON.stringify(productos), {
        EX: 1800,
      });

      res.json({ message: "Producto eliminado correctamente", id });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

// Función auxiliar para actualizar la caché de Redis
async function updateRedisProducto(producto) {
  const productoKey = `productos:${producto.id}`;
  await redisClient.set(productoKey, JSON.stringify(producto), { EX: 1800 });

  const productos = await Producto.findAll();
  await redisClient.set("productos:all", JSON.stringify(productos), {
    EX: 1800,
  });
}

module.exports = router;
