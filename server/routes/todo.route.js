const TodoController = require("../controllers/todo.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {

    app.post('/api/todo/guardar', authenticate, TodoController.guardarTodo);

    app.get('/api/todo', authenticate, TodoController.buscarTodos);

    app.get('/api/todo/:id', authenticate, TodoController.buscarTodo); 

    app.put('/api/todo/:id', authenticate, TodoController.actualizarTodo);

    app.delete('/api/todo/:id', authenticate, TodoController.borrarTodo);
} 
