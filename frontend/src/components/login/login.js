import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import '../register/register.css';

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = () => {
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                switch(res.data.message) {
                    case "True":
                        history.push("/upload");
                        break;
                    case "False":
                        alert("Wrong password");
                        break;
                    case "No user":
                        alert("User with given Email id does not exist. Please register.");
                        break;
                    default:
                        break;
                }
            });
    };

    return (
        <div>
            <nav aria-label="breadcrumb" style={{ paddingLeft: '25px', paddingTop: '17px' }}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page" onClick={() => history.push("/")}>Home</li>
                </ol>
            </nav>
            <br />
            <div className="regster" style={{ textAlign: "center" }}>
                <div className='vox'>
                    <h1>Login</h1>
                    <br />
                    <div className="input-group mb-3">
                        <input type="text" required className="form-control" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
                        <span className="input-group-text" id="basic-addon1">@example.com</span>
                    </div>
                    <br />
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Password</span>
                        <input type="password" required className="form-control" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
                    </div>
                    <br />
                    <button className="btn btn-primary btn-sm" onClick={login}>Log in</button>
                    <br /><br />
                    <p>New here? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
