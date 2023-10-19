const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, "Nombre Obligatorio" ]
    },
    lastName: {
        type: String,
        required: [true, "Apellido Obligatorio"]
    },
    email: {
        type: String,
        required: [true, "E-mail Obligatorio"],
        validate: {
            validator: val => /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(val), 
            message: "Ingrese un e-mail válido"
        },
    }, 
    password: {
        type: String,
        required: [true, "Password Obligatorio"],
        minlength: [8, "Password debe tener al menos 8 caracteres"]
    }
}, {timestamps: true, versionKey: false});

//Se realiza cuando no queremos guardarlo en BD
userSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword)
    .set( value => this._confirmPassword = value)


//Se hace ANTES de validar el esquema de usuario
userSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Las contraseñas no coinciden");
    }

    next();

})

//Antes de guardar usuario encriptamos contraseña

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("users", userSchema);
module.exports = User;