import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Log = () => {

    const estilo = {
        backgroundImage: 'url("https://img.freepik.com/free-vector/gradient-abstract-background_23-2149460643.jpg?w=1380&t=st=1697674919~exp=1697675519~hmac=cd2e958d16d547f832fcd52bb493c38fe0673fb7b6aacfca877b824a2c667430")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [errorsLogin, setErrorsLogin] = useState({}); // Objeto para almacenar errores específicos
    const navigate = useNavigate();//NAVEGAR

const login = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/login", {
        email: emailLogin,
        password: passwordLogin
    }, { withCredentials: true })
        .then(res => {
            if (res.data) {
                const { error, message, email, password } = res.data;
                if (error) {
                    // Agregar errores al estado existente en lugar de sobrescribirlo
                    setErrorsLogin({
                        ...errorsLogin,
                        email: email,
                        password: password,
                        general: message
                    });
                } else {
                    // Si no hay errores, limpia el objeto de errores
                    setErrorsLogin({});
                    navigate("/");
                }
            }
        })
        .catch(err => console.log(err));
}
        
        
        
        
        
        

    return (
        <div className="container-fluid" style={estilo}>

            <h1 className="card-title mb-4 fw-bold">Bienvenido a MyNote</h1>

            <div className="col-12 col-md-6 col-lg-4">

                <div className="card">

                    <div className="card-body">

                        <h2 className="card-title text-center">Iniciar Sesión</h2>
                        <form onSubmit={login}>


                            <div className="mb-3">
                                <input type="email" name="email" id="email" className="form-control" placeholder="Correo Electrónico" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} />
                                <div>                                 {errorsLogin.email && (
                                    <p className="text-danger">{errorsLogin.email}</p>
                                )} </div>

                            </div>
                            <div className="mb-3">
                                <input type="password" name="password" id="password" className="form-control" placeholder="Contraseña" value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} />
                                <div>
                                    {errorsLogin.password && (
                                        <p className="text-danger">{errorsLogin.password}</p>
                                    )}
                                </div>

                            </div>

                            <div>
                                {errorsLogin.general && (
                                    <p className="text-danger">{errorsLogin.general}</p>
                                )}
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Iniciar Sesión
                                </button>
                            </div>

                            <div className="text-center mt-3">
                                ¿No tienes una cuenta?{' '}
                                <Link to="/register">Regístrate aquí</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Log;