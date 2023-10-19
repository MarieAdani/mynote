import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();

    const [errors, setErrors] = useState({}); //errores.ATRIBUTO.message

    const navigate = useNavigate();//NAVEGAR

    const registro = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/register", {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, { withCredentials: true })
            .then(res => {
                navigate("/login");
            })
            .catch(err => setErrors(err.response.data.errors))
    };


    return (
        <div className="container-fluid" style={estilo}>
            <h1 className="card-title mb-4 fw-bold">Bienvenido a MyNote</h1>
            <div className="col-12 col-md-6 col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Registrarse</h2>
                        <form onSubmit={registro}>


                            <div className="mb-3">
                                <input type="firstName" name="firstName" id="firstName" className="form-control" placeholder="Nombre" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : null}
                            </div>


                            <div className="mb-3">
                                <input type="lastName" name="lastName" id="lastName" className="form-control" placeholder="Apellido" value={lastName} onChange={e => setLastName(e.target.value)}/>
                                {errors.lastName ? <p className="text-danger">{errors.lastName.message}</p> : null}
                            </div>


                            <div className="mb-3">
                                <input type="email" name="email" id="email" className="form-control" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)}/>
                                {errors.email ? <p className="text-danger">{errors.email.message}</p> : null}
                            </div>


                            <div className="mb-3">
                                <input type="password" name="password" id="password" className="form-control" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
                                {errors.password ? <p className="text-danger">{errors.password.message}</p> : null}
                            </div>


                            <div className="mb-3">
                                <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                                {errors.confirmPassword ? <p className="text-danger">{errors.confirmPassword.message}</p> : null}
                            </div>


                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Registrarse
                                </button>
                            </div>


                            <div className="text-center mt-3">
                                ¿Ya tienes una cuenta?{' '}
                                <Link to="/login">Inicia sesión aquí</Link>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div >
    );
}

export default Register;