import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import './ToBuy.css';

const ToBuyList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener la lista de compras desde el servidor al cargar el componente
        axios.get('http://localhost:8000/api/tobuy', { withCredentials: true })
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error(error);
                setError('Error al cargar la lista de compras.');
            });
    }, []);

    const handleInputChange = (e) => {
        setNewItem(e.target.value);
    };

    const handleAddItem = () => {
        if (newItem.trim() === '') {
            setError('Por favor, ingrese un artículo válido.');
            return;
        }

        // Enviar el nuevo artículo al servidor
        axios.post('http://localhost:8000/api/tobuy/guardar', { titulo: newItem }, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setItems([...items, response.data]);
                    setNewItem('');
                    setError('');
                } else {
                    setError('Error al agregar el artículo.');
                }
            })
            .catch(error => {
                console.error(error);
                setError('Error al agregar el artículo.');
            });
    };

    const handleToggleItem = (id) => {
        // Marcar o desmarcar un artículo como comprado
        const updatedItems = items.map(item => {
            if (item._id === id) {
                item.comprado = !item.comprado;
                // Actualizar el estado en el servidor
                axios.put(`http://localhost:8000/api/tobuy/${id}`, { comprado: item.comprado }, { withCredentials: true });
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleDeleteItem = (id) => {
        // Eliminar un artículo de la lista
        axios.delete(`http://localhost:8000/api/tobuy/${id}`, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    const updatedItems = items.filter(item => item._id !== id);
                    setItems(updatedItems);
                } else {
                    setError('Error al eliminar el artículo.');
                }
            })
            .catch(error => {
                console.error(error);
                setError('Error al eliminar el artículo.');
            });
    };

    return (
        <div className="container bg-imagebuy">
        <div>
        <div className="content-containerbuy">
            <h1 className="titulo">Lista de Compras</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Agregar artículo"
                    value={newItem}
                    onChange={handleInputChange}
                />
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddItem}
                >
                    Agregar
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {items.map(item => (
                    <li
                        key={item._id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${item.comprado ? 'comprado' : ''}`}
                    >
                        <span onClick={() => handleToggleItem(item._id)}>
                            {item.titulo}
                        </span>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={item.comprado}
                                onChange={() => handleToggleItem(item._id)}
                            />
                            <label className="form-check-label">Comprado</label>
                        </div>
                        <i className="bi bi-trash" onClick={() => handleDeleteItem(item._id)}></i>
                    </li>
                ))}
            </ul>
            <Link to="/" className="btn btn-secondary btbuy">Volver al Inicio</Link>
        </div>
        </div>
        </div>
    );
};

export default ToBuyList;