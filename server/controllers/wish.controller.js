const Wish = require("../models/wish.model");

const guardarWish = (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body); // Verifica que los datos se estén pasando correctamente
    Wish.create(req.body)
        .then(wish => res.json(wish))
        .catch(err => {
            console.error('Error al guardar el deseo:', err); // Muestra detalles del error en la consola
            res.status(400).json({ error: 'Error al agregar el deseo', details: err.message }); // Envia una respuesta de error con detalles
        });
}

const buscarWishs = (req, res) =>{
    Wish.find().sort({ fechaCreacion: -1 })
        .then(wishs => res.json(wishs))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarWish = (req, res) => {
    Wish.findOne({_id: req.params.id})
        .then(wish => res.json(wish))
        .catch(err => {
            res.status(400).json(err);
        })
}


const actualizarWish = (req, res) => {
    Wish.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(wish => res.json(wish))
        .catch(err => {
            res.status(400).json(err);
        })
}

const borrarWish = (req, res) =>{
    Wish.deleteOne({_id: req.params.id})
        .then(wish => res.json(wish))
        .catch(err => {
            res.status(400).json(err);
        })
}


module.exports = {
    guardarWish,
    buscarWishs,
    buscarWish,
    actualizarWish,
    borrarWish
}