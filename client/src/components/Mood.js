import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mood.css';
import { Link} from 'react-router-dom';

const MoodList = () => {
    const [moods, setMoods] = useState([]);
    const [newMood, setNewMood] = useState({
        imagen: '',
        moodValue: 'Feliz', // Valor por defecto
        description: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener la lista de estados de ánimo desde el servidor al cargar el componente
        axios.get('http://localhost:8000/api/mood', { withCredentials: true })
            .then(response => {
                setMoods(response.data);
            })
            .catch(error => {
                console.error(error);
                setError('Error al cargar la lista de estados de ánimo.');
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMood({
            ...newMood,
            [name]: value,
        });
    };

    const handleAddMood = () => {
        if (newMood.imagen.trim() === '') {
            setError('Por favor, ingrese una URL de imagen válida.');
            return;
        }

        // Enviar el nuevo estado de ánimo al servidor
        axios.post('http://localhost:8000/api/mood/guardar', newMood, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setMoods([...moods, response.data]);
                    setNewMood({
                        imagen: '',
                        moodValue: 'Feliz',
                        description: '',
                    });
                    setError('');
                } else {
                    setError('Error al agregar el estado de ánimo.');
                }
            })
            .catch(error => {
                console.error(error);
                setError('Error al agregar el estado de ánimo.');
            });
    };

    const handleDeleteMood = (id) => {
        // Eliminar el estado de ánimo del servidor
        axios.delete(`http://localhost:8000/api/mood/${id}`, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    const updatedMoods = moods.filter(mood => mood._id !== id);
                    setMoods(updatedMoods);
                } else {
                    setError('Error al eliminar el estado de ánimo.');
                }
            })
            .catch(error => {
                console.error(error);
                setError('Error al eliminar el estado de ánimo.');
            });
    };


    return (
        <div className="container bg-imagemood">
        <div>
            <div className='content-containermood'>
            <h1 className="text-center mb-4">MoodBoard</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="URL de la imagen"
                            name="imagen"
                            value={newMood.imagen}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <select
                            className="form-select"
                            name="moodValue"
                            value={newMood.moodValue}
                            onChange={handleInputChange}
                        >
                            <option value="Feliz">Feliz</option>
                            <option value="Triste">Triste</option>
                            <option value="Enojado">Enojado</option>
                            <option value="Calmado">Calmado</option>
                            <option value="Emocionado">Emocionado</option>
                            <option value="Neutro">Neutro</option>
                        </select>
                    </div>
                </div>
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descripción (opcional)"
                            name="description"
                            value={newMood.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <button
                            className="btn btn-primary mx-auto"
                            type="button"
                            onClick={handleAddMood}
                        >
                            Agregar
                        </button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <h2 className="text-center mb-4">Guardado</h2>
                    <div className="row">
                        {moods.map(mood => (
                            <div key={mood._id} className="col-md-3 mb-4">
                                <div className="card">
                                    <img src={mood.imagen} className="card-img-top" alt="Imagen de estado de ánimo" />
                                    <div className="card-body">
                                        <h6 className="card-title">Mood: {mood.moodValue}</h6>
                                        {mood.description && <p className="card-text">Descripción: {mood.description}</p>}
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <i className=" btn  btn-danger bi bi-trash" onClick={() => handleDeleteMood(mood._id)}></i>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link to="/" className="btn btn-secondary mt-4">Volver al Inicio</Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default MoodList;
