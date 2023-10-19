import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Dash.css";


const Dashboard = () => {
    const [todo, setTodo] = useState([]);
    const [toBuy, setToBuy] = useState([])
    const [wish, setWish] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Obtener las notas desde el servidor al cargar el componente
        axios.get("http://localhost:8000/api/todo", { withCredentials: true })
            .then(res => {
                setTodo(res.data);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/login");
                }
            });

        // Obtener la lista de compras desde el servidor al cargar el componente
        axios.get("http://localhost:8000/api/tobuy", { withCredentials: true })
            .then(res => {
                setToBuy(res.data);
            })
            .catch(err => {
                console.error(err);
            });

        // Obtener la lista de deseos desde el servidor al cargar el componente
        axios.get("http://localhost:8000/api/wishs", { withCredentials: true })
            .then(res => {
                setWish(res.data);
            })
            .catch(err => {
                console.error(err);
            });

    }, []);

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res =>  navigate("/login"))
            .catch(err => {
                console.error("Error al cerrar sesión:", err);
            });
    }




    return (
        <div className="d-flex">
            {/* Barra de navegación lateral */}
            <nav className="navbar bg-light flex-column">
                <div className="container">
                    <Link className="navbar-brand mb-4" to="/dashboard">
                        <strong>MiNote</strong>
                    </Link>
                    <ul className="navbar-nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" to="/todo">
                            <i class="bi bi-card-checklist"></i> Notas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tobuy">
                            <i className="bi bi-cart-plus"></i> Lista de Compras
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wish">
                            <i class="bi bi-clipboard-heart"></i> Deseos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mood">
                            <i class="bi bi-camera"></i> MoodBoard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ciclo">
                            <i class="bi bi-calendar-plus"></i> Calendario
                            </Link>
                        </li>
                        <li className="nav-item" onClick={logout}>
                            <Link className="nav-link" to="/login">
                            <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>



            <div className="container dash">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className='mt-5'>Mis Colecciones</h2>
                        <div className="card">
                            <div className="card-body">
                                {/* Muestra las notas aquí */}
                                <div>Notas:</div>
                                <ul>
                                    {todo.map(task => (
                                        <li key={task._id}>
                                            {task.titulo}
                                            <Link to={`/todo/${task._id}`}>
                                                <i className="bi bi-eye ojo"></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div>Lista de Compras:</div>
                                <ul>
                                    {toBuy.map(item => (
                                        <li key={item._id}>
                                            {item.titulo}
                                        </li>
                                    ))}
                                </ul>
                                <div>Deseos:</div>
                                <ul>
                                    {wish.map(wish => (
                                        <li key={wish._id}>
                                            {wish.nombre}
                                            <Link to={`/wish/`}>
                                                <i className="bi bi-eye ojo"></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;