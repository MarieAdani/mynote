const mongoose = require('mongoose');


const wishSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre Obligatorio.'],
    },
    tipo: {
        type: String,
        enum: ['Personal', 'Laboral', 'Material'],
        required: [true, 'Tipo Obligatorio.'],
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion Obligatorio.'],
    },
    precioActivado: {
        type: Boolean,
        default: false,
    },
    precio: {
        type: Number
    },
    fechaMeta: Date,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Nombre del modelo de usuario
    },
}, { timestamps: true });

const Wish = mongoose.model('Wish', wishSchema);

module.exports = Wish;