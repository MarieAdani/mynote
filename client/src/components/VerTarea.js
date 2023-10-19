import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './VerTarea.css';

const VerTarea = () => {
    const { id } = useParams();
    const [tarea, setTarea] = useState(null);
    const [realizada, setRealizada] = useState(false);
    const [mostrarCargando, setMostrarCargando] = useState(true);

    useEffect(() => {
        // Simular una demora de 2 segundos antes de cargar los detalles de la tarea
        setTimeout(() => {
            axios.get("http://localhost:8000/api/todo/" + id, { withCredentials: true })
                .then((res) => {
                    setTarea(res.data);
                    setRealizada(res.data.realizada);
                    setMostrarCargando(false); // Ocultar el mensaje de carga después de cargar los datos
                })
                .catch(error => {
                    console.error(error);
                    setMostrarCargando(false); // Ocultar el mensaje de carga en caso de error
                });
        }, 800); // 2 segundos de retraso
    }, [id]);


    if (mostrarCargando) {
        return <div className="container cargando"><button className='btn btn-warning mt-5'>Cargando...</button></div>;
    }

    if (!tarea) {
        return <div className="container mt-5">Error al cargar la tarea.</div>;
    }

    return (
        <div className='imagever'>
            <div className="containerver mt-5">
                <h1 className='mb-3 titulo'>Detalles de la Nota</h1>
                <p className='mb-3' ><strong>Título:</strong> {tarea.titulo}</p>
                <p className='mb-3'><strong>Tipo:</strong> {tarea.tipo}</p>
                <p className='mb-3'><strong>Descripción:</strong> {tarea.descripcion}</p>
                <p className='mb-3'><strong>Notificación:</strong> {tarea.notificacion ? 'Sí' : 'No'}</p>
                <Link to="/todo" className ="btn btn-primary mt-5 me-5 botonverd">Crear Nueva Nota</Link>
                <Link to="/" className="btn btn-secondary mt-5 botonver">Volver al Inicio</Link>
            </div>
        </div>
    );
};

export default VerTarea;