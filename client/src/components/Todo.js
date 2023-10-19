import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Todo.css';


const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        titulo: '',
        tipo: 'Personal',
        descripcion: '',
        fechaHora: '',
        notificacion: false,
        realizada: false
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewTodo({
            ...newTodo,
            [name]: newValue
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Limpia cualquier error anterior
        axios.post('http://localhost:8000/api/todo/guardar', newTodo, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setTodos([...todos, response.data]);
                    setNewTodo({
                        titulo: '',
                        tipo: 'Personal',
                        descripcion: '',
                        fechaHora: '',
                        notificacion: false,
                        realizada: false
                    });
                } else {
                    setError('Error al guardar la tarea.');
                }
            })
            .catch(error => {
                console.error(error);
                setError('Error al guardar la tarea.');
            });
    };


    useEffect(() => {
        // Obtener la lista de tareas desde el servidor al cargar el componente
        axios.get('http://localhost:8000/api/todo', { withCredentials: true })
            .then(response => {
                setTodos(response.data);

            })
            .catch(error => {
                console.error(error);
                setError('Error al cargar la lista de tareas.');
            });
    }, []);

    const borrarTodos = id => {
        axios.delete("http://localhost:8000/api/todo/"+id, { withCredentials: true })
            .then(res => {
                let nuevaLista = todos.filter(todo => todo._id !== id);
                setTodos(nuevaLista);
            })
            .catch(err=>console.log(err));
    }

    return (
        <div className="container bg-image">
            <div>
                <div className='content-container'>
                <h1 className='titulo'>Nueva Nota</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título:</label>
                        <input
                            type="text"
                            name="titulo"
                            value={newTodo.titulo}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo:</label>
                        <select
                            name="tipo"
                            value={newTodo.tipo}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="Personal">Personal</option>
                            <option value="Trabajo">Trabajo</option>
                            <option value="Estudio">Estudio</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción:</label>
                        <textarea
                            name="descripcion"
                            value={newTodo.descripcion}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-check-label me-3">Notificación:</label>
                        <input
                            type="checkbox"
                            name="notificacion"
                            checked={newTodo.notificacion}
                            onChange={handleInputChange}
                            className="form-check-input"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Crear Nota</button>
                    <h1 className="mt-3 mb-3 titulo">Notas Guardadas</h1>
                </form>
                {error && <div className="alert alert-danger mt-5">{error}</div>}
                <ul>
                    {todos.map(todo => (
                        <li key={todo._id}>
                            <Link className='me-3' to={`/todo/${todo._id}`}>{todo.titulo}</Link> 
                            <i className="bi bi-trash" onClick={() => borrarTodos(todo._id)}></i>
                        </li>
                    ))}
                </ul>
                <Link to="/" className="btn btn-secondary mt-3">Volver a Inicio</Link>
            </div>
                    </div>
                    </div>
    );
};

export default Todo;