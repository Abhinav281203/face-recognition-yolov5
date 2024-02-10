import React, { useState } from "react";
import axios from "axios";
import './register.css';
import { useHistory } from "react-router-dom";

const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [repass, setRepass] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = e => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const validateInputs = () => {
        if (user.password !== repass) {
            setMsg("Passwords don't match");
            return false;
        }
        if (user.name.search(/[0-9]/) !== -1) {
            setMsg("Not a valid Name (Contains digits)");
            return false;
        }
        if (!user.email.match(/\w+@\w+\.\w+/)) {
            setMsg("Enter a Valid Email Address");
            return false;
        }
        if (!user.password.match(/[0-9]/) || !user.password.match(/[A-Z]/) || !user.password.match(/\W/)) {
            setMsg("Enter a Valid Password");
            return false;
        }
        return true;
    };

    const register = event => {
        event.preventDefault();
        if (validateInputs()) {
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    if (res.data.message === "True") {
                        history.push("/");
                    } else {
                        setMsg("User with that email already exists");
                    }
                });
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb" style={{ paddingLeft: '25px', paddingTop: '17px' }}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" onClick={() => history.push("/")}><a href="#">Login</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Register</li>
                </ol>
            </nav>
            <br />
            <div className="register" style={{ textAlign: "center" }}>
                <div className="vox">
                    <h1>Register</h1>
                    <br></br>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Full name</span>
                        <input type="text" required className="form-control" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
                    </div>
                    <br></br>
                    <div className="input-group mb-3">
                        <input type="text" required className="form-control" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
                        <span className="input-group-text" id="basic-addon1">@example.com</span>
                    </div>
                    <br></br>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Password</span>
                        <input type="password" required className="form-control" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
                    </div>
                    <br></br>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Confirm password</span>
                        <input type="password" required className="form-control" name="password" value={repass} placeholder="Your Password" onChange={(e) => setRepass(e.target.value)}></input>
                    </div>
                    <br></br>
                    <button className="btn btn-primary btn-sm" onClick={register}>Register</button>
                    <div>
                        <br></br>
                        {msg && <p>{msg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
