import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import '../register/register.css'
import { Link } from 'react-router-dom';


const Login = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        console.log(user)
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                console.log(res.data.message)
                if(res.data.message == "True"){
                    history.push("/upload")
                }else if(res.data.message == "False"){
                    alert("Wrong password")
                }else if(res.data.message == "No user"){
                    alert("User with given Email id does not exist. Please register.")
                }
            })
    }

    return (
        <div>
            <nav aria-label="breadcrumb" style={{ paddingLeft: '25px', paddingTop: '17px' }}>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page" onClick={() => history.push("/")}>Home</li>
                </ol>
            </nav>
            <br />
            <div  className="regster" style={{ textAlign: "center" }}>
                <div classname='vox'>
                    {console.log(user)}
                    <h1>Login</h1>
                    <br></br>
                    <div class="input-group mb-3">
                        <input type="text" required class="form-control" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
                        <span class="input-group-text" id="basic-addon1">@example.com</span>
                    </div>
                    <br></br>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Password</span>
                        <input type="password" required class="form-control" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
                    </div>
                    <br></br>
                    <button className="btn btn-primary btn-sm" onClick={login} >Log in</button>
                    <br /><br />
                    <p1>New here? <Link to="/register">Register</Link></p1>
                </div>
            </div>
        </div>
    )
}

export default Login