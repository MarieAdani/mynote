import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Ciclo.css';

const Ciclo = () => {
    const [ciclos, setCiclos] = useState([]);
    const [newCiclo, setNewCiclo] = useState({
        fechaInicio: '',
        duracionCiclo: '',
        duracionPeriodo: '',
        sintomas: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Obtener la lista de ciclos desde el servidor al cargar el componente
        axios.get('http://localhost:8000/api/ciclo', { withCredentials: true })
            .then(response => {
                setCiclos(response.data);
            })
            .catch(error => {
                console.error(error);
                setError('Error al cargar la lista de ciclos.');
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCiclo({
            ...newCiclo,
            [name]: value,
        });
    };

    const handleAddCiclo = () => {
        // Validar que los campos requeridos estén completos
        if (!newCiclo.fechaInicio || !newCiclo.duracionCiclo || !newCiclo.duracionPeriodo) {
            setError('Por favor, complete los campos obligatorios.');
            return;
        }

        // Enviar el nuevo ciclo al servidor
        axios.post('http://localhost:8000/api/ciclo/guardar', newCiclo, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setCiclos([...ciclos, response.data]);
                    setNewCiclo({
                        fechaInicio: '',
                        duracionCiclo: '',
                        duracionPeriodo: '',
                        sintomas: '',
                    });
                    setError('');
                } else {
                    setError('Error al agregar el ciclo.');
                }
            })
            .catch(error => {
                console.error(error);
                setError('Error al agregar el ciclo.');
            });
    };

    const handleDeleteCiclo = (id) => {
        axios.delete(`http://localhost:8000/api/ciclo/${id}`, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    const updatedCiclos = ciclos.filter(ciclo => ciclo._id !== id);
                    setCiclos(updatedCiclos);
                } else {
                    setError('Error al eliminar el ciclo.');
                }
            })
            .catch(error => {
                console.error(error);
                setError('Error al eliminar el ciclo.');
            });
    };


    return (
        <div className="container bg-calendario">
            <div>
                <div className="content-container">
                    <h1 className="text-center mb-4">Calendario Menstrual</h1>

                    <div className="row">
                        <div className="col-md-3">
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Fecha de inicio"
                                name="fechaInicio"
                                value={newCiclo.fechaInicio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Duración del ciclo (días)"
                                name="duracionCiclo"
                                value={newCiclo.duracionCiclo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Duración del período (días)"
                                name="duracionPeriodo"
                                value={newCiclo.duracionPeriodo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Síntomas (opcional)"
                                name="sintomas"
                                value={newCiclo.sintomas}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary mt-3 "
                            type="button"
                            onClick={handleAddCiclo}
                        >
                            Agregar
                        </button>
                    </div>


                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    <h2 className="text-center mt-5">Guardado</h2>
                    <div className="row">
                        {ciclos.map(ciclo => (
                            <div key={ciclo._id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Fecha de Inicio: {new Date(ciclo.fechaInicio).toLocaleDateString()}</h5>
                                        <p className="card-text">Duración del Ciclo: {ciclo.duracionCiclo} días</p>
                                        <p className="card-text">Duración del Período: {ciclo.duracionPeriodo} días</p>
                                        {ciclo.sintomas && <p className="card-text">Síntomas: {ciclo.sintomas}</p>}
                                        <div className="d-flex justify-content-center">                                    <i className=" btn  btn-danger bi bi-trash" onClick={() => handleDeleteCiclo(ciclo._id)}></i>
                                        </div>


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

export default Ciclo;
