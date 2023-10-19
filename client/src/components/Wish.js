import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa los estilos CSS de react-datepicker
import './Wish.css';

const WishList = () => {
    const [wishes, setWishes] = useState([]);
    const [newWish, setNewWish] = useState({
        nombre: '',
        tipo: '',
        descripcion: '',
        precioActivado: false,
        precio: '',
        fechaMeta: null, // Usar fecha para la fecha meta
    });
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/wishs', { withCredentials: true })
            .then((response) => {
                setWishes(response.data);
            })
            .catch((error) => {
                console.error(error);
                setError('Error al cargar la lista de deseos.');
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setNewWish({
                ...newWish,
                [name]: checked,
            });
        } else {
            setNewWish({
                ...newWish,
                [name]: value,
            });
        }
    };

    const handleAddWish = () => {
        if (newWish.nombre.trim() === '') {
            setError('Por favor, ingrese un nombre válido.');
            return;
        }

        const postData = {
            nombre: newWish.nombre,
            tipo: newWish.tipo,
            descripcion: newWish.descripcion,
        };

        if (newWish.precioActivado) {
            postData.precioActivado = true;
            postData.precio = newWish.precio;
        }

        if (newWish.fechaMeta) {
            postData.fechaMeta = newWish.fechaMeta; // Agregar fechaMeta al objeto postData
        }

        axios
            .post('http://localhost:8000/api/wish/guardar', postData, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    setWishes([...wishes, response.data]);
                    setNewWish({
                        nombre: '',
                        tipo: 'Tipo',
                        descripcion: '',
                        precioActivado: false,
                        precio: 0,
                        fechaMeta: null,
                    });
                    setError('');
                } else {
                    setError('Error al agregar el deseo.');
                }
            })
            .catch((error) => {
                console.error(error);
                setError('Error al agregar el deseo.');
            });
    };

    const handleDeleteWish = (id) => {
        axios
            .delete(`http://localhost:8000/api/wish/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    const updatedWishes = wishes.filter(
                        (wish) => wish._id !== id
                    );
                    setWishes(updatedWishes);
                } else {
                    setError('Error al eliminar el deseo.');
                }
            })
            .catch((error) => {
                console.error(error);
                setError('Error al eliminar el deseo.');
            });
    };

    return (
        <div className="container bg-image ">
            <div>
            <div className='content-container'>
            <h1 className="text-center mb-4">Lista de Deseos</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre del deseo"
                            name="nombre"
                            value={newWish.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <select
                            className="form-select"
                            name="tipo"
                            value={newWish.tipo}
                            onChange={handleInputChange}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Laboral">Laboral</option>
                            <option value="Material">Material</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción"
                    name="descripcion"
                    value={newWish.descripcion}
                    onChange={handleInputChange}
                />
            </div>

            <div className="input-group mb-3">
                <div className="form-check form-switch">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="precioActivado"
                        checked={newWish.precioActivado}
                        onChange={handleInputChange}
                    />
                    <label className="form-check-label me-3">Precio</label>
                </div>
                {newWish.precioActivado && (
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Escriba el precio en este espacio"
                        name="precio"
                        value={newWish.precio}
                        onChange={handleInputChange}
                    />
                )}
            </div>
            <div className="input-group mb-3">
                <div className="d-flex align-items-center"> {/* Contenedor para centrar elementos */}
                    <label className="me-3 mb-2">Fecha Meta:</label>
                    <DatePicker
                        selected={newWish.fechaMeta}
                        onChange={(date) =>
                            setNewWish({
                                ...newWish,
                                fechaMeta: date,
                            })
                        }
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="input-group mb-3">
                <button
                    className="btn btn-primary mx-auto"
                    type="button"
                    onClick={handleAddWish}
                >
                    Agregar
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                        <h1 className="text-center mb-4 mt-5">Deseos Guardados</h1>
                    </div>
                    <ul className="list-group">
                        {wishes.map((wish) => (
                            <li
                                key={wish._id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div cl>
                                    <strong>Tipo:</strong> {wish.tipo}<br></br>
                                    <strong>Nombre:</strong> {wish.nombre}<br></br>

                                    <strong>Descripción:</strong> {wish.descripcion}<br></br>
                                    {wish.precioActivado && (
                                        <span>
                                            <strong>Precio:</strong> {wish.precio}<br></br>
                                        </span>
                                    )}
                                    <strong>Meta:</strong> {wish.fechaMeta && new Date(wish.fechaMeta).toLocaleDateString('es-ES')}
                                </div>
                                <i className="bi bi-trash" onClick={() => handleDeleteWish(wish._id)}></i>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-secondary mt-4">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default WishList;
