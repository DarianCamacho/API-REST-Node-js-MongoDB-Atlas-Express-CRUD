// Instalar la extension Rest Client
// Esta sirve para probar de manera sencilla nuestros endpoints o api
// Se debe crear un archivo resquest.http en la raiz del proyecto
// ese archivo permite crear las solicitudes

const express = require("express");

// Traemos nuestro modelo de datos o esquema
const movieSchema = require("../models/movie");

// Crear un enrrutador
const router = express.Router();

// Definir mis rutas

// create movie
router.post("/movies", (req, res) => {
  // Vamos a usar el esquema y esto nos va a crear un nuevo usuario
  // Con la estructura de datos que estan llegando desde el cuerpo de la petición req
  // esta peticion va a tener un cuerpo, body, que va a traer los datos
  // con los que queremos crear una nueva movie
  const movie = movieSchema(req.body);
  // Almacenar la nueva movie en la base de datos
  movie
    .save()
    // si todo sale bien respondemos con estos datos "data"
    .then((data) => res.json(data))
    // y si no, respondemos con este mensaje
    .catch((error) => res.json({ message: error }));
});

// get all movies
router.get("/movies", (req, res) => {
 movieSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a movie
// se agrega un parametro a la url, que va a ser "id" para encontrar la movie por el id
router.get("/movies/:id", (req, res) => {
  //se debe extraer desde los parametros del objeto de la petición, de ahi viene el id
  const{ id } = req.params;
  movieSchema
     .findById(id) // se pasa el id de esa movie en especifico que se quiere encontrar
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error }));
 });

// update a movie
// se agrega un parametro a la url, que va a ser "id" para encontrar la movie por el id
router.put("/movies/:id", (req, res) => {
  //se debe extraer desde los parametros del objeto de la petición, de ahi viene el id
  const{ id } = req.params;
  // Debemos extraer los datos que queremos actualizar de esa movie
  const { titulo, director, nombre, nacionalidad, anio, genero, calificacion, sipnosis, actores } = req.body;
  movieSchema
     .updateOne({ _id: id}, { $set:{ titulo, director, nombre, nacionalidad, anio, genero, calificacion, sipnosis, actores } }) // se pasa el id de esa movie en especifico que se quiere encontrar y cada uno de los datos que queremos pasar para la a actualizacion de la petición
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error }));
 });

// delete a movie
router.delete("/movies/:id", (req, res) => {
  //se debe extraer desde los parametros del objeto de la petición, de ahi viene el id
  const{ id } = req.params;
  // Debemos extraer los datos que queremos actualizar de esa movie
  movieSchema
     .deleteOne({ _id: id}) // se pasa el id de esa movie en especifico que queremos eliminar
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error }));
 });

module.exports = router;

// Recuerda usar el archivo request.http o crearlo para hacer uso de estos metodos deleteOne