const mongoose = require('mongoose');



const todoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El campo título es obligatorio.'],
    },
    tipo: {
        type: String,
        enum: ['Personal', 'Trabajo', 'Estudio', 'Otro'],
        required: [true, 'El campo tipo es obligatorio'],
    },
    descripcion: String,
    fechaHora: Date,
    notificacion: Boolean,
    realizada: Boolean,
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Nombre del modelo de usuario
    },
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;