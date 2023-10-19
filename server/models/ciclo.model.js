const mongoose = require('mongoose');


const cicloSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Nombre del modelo de usuario
    },
    fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio del ciclo es obligatoria.'],
    },
    duracionCiclo: {
    type: Number,
    required: [true, 'La duración del ciclo es obligatoria.'],
    },
    duracionPeriodo: {
        type: Number,
        required: [true, 'La duración del período es obligatoria.'],
    },
    sintomas: String, 
}, { timestamps: true });

const Ciclo = mongoose.model('Ciclo', cicloSchema);

module.exports = Ciclo;