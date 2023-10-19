const Todo = require("../models/todo.model");

const guardarTodo = (req, res) => {
    Todo.create(req.body)
        .then(todo => res.json(todo))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarTodos = (req, res) =>{
    Todo.find().sort({ fechaCreacion: -1 })
        .then(todos => res.json(todos))
        .catch(err => {
            res.status(400).json(err);
        })
}

const buscarTodo = (req, res) => {
    Todo.findOne({_id: req.params.id})
        .then(todo => res.json(todo))
        .catch(err => {
            res.status(400).json(err);
        })
}


const actualizarTodo = (req, res) => {
    Todo.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(todo => res.json(todo))
        .catch(err => {
            res.status(400).json(err);
        })
}

const borrarTodo = (req, res) =>{
    Todo.deleteOne({_id: req.params.id})
        .then(todo => res.json(todo))
        .catch(err => {
            res.status(400).json(err);
        })
}



module.exports = {
    guardarTodo,
    buscarTodos,
    buscarTodo,
    actualizarTodo,
    borrarTodo
}