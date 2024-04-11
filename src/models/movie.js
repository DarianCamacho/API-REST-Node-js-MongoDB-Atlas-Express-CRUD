// Crear el modelo de datos o el esquema

const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({

    titulo: {
        type: String,
    },
    director: {
        nombre: String,
        nacionalidad: String,
    },
    anio: {
        type: String,
    },
    genero:{
        type: [String],
    },
    calificacion:{
    
        type: [String],
    },
    actores: [
        {
            nombre: String,
            personaje: String,
        }
    ],
    sinopsis: {
        type: String,
    }
});

// Exportamos el esquema
module.exports = mongoose.model("Movie", movieSchema);
