const express = require("express");

// Facilita la conexion con MongoDB ATLAS
const mongoose = require("mongoose");

// Me permite crear variables de ambiente definidas por mi (customizadas)
require("dotenv").config();

//importo mis rutas
// todas las rutas de movie que yo voy a tener como CRUD se van a ir en este router y caen en esta constante movieEoutes
const movieRoutes = require("./routes/movie.js");

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
// Esto es para que todas mis rutas tengan este prefijo llamado api
// Le pasamos esta constante de movieRoutes para que todas las rutas de movie.js tengan este prefijo llamado api
app.use('/api', movieRoutes);

// routes definir rutas para mi aplicacion
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI) // En esta variable global se encuentra mi conexion a MongoDB Atlas
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// Para iniciar el proyecto utilizar el comando npm run start
// El script start se define en el archivo package.json como inicializador del proyecto
app.listen(port, () => console.log('server listening on port', port));

// He creado un archivo llamado .env para guardar mi conexion a MongoDB Atlas
// ya que seria critico dejarla en este archivo
// npm install dotenv
// con eso se podria hacer el usoy la creacion de archivos .env