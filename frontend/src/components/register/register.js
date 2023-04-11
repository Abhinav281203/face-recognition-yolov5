import React, { useState } from "react"
import axios from "axios"
import './register.css'
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()
    let [repass, setrepass] = useState("")
    let [msg, setmsg] = useState("")
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = (event) => {
        event.preventDefault();
        let flag = true;
        if (user && (user.password === repass)) {
            if (user.name.search(/[0-9]/) != -1) {
                setmsg("Not a valid Name (Contains digits)");
                flag = false;
            }
            if (!(user.email.match(/\w+@\w+\.\w+/))) {
                setmsg("Enter a Valid Email Address");
                flag = false;
            }
            if (!(user.password.match(/[0-9]/)) || !(user.password.match(/[A-Z]/)) || !(user.password.match(/\W/))) {
                setmsg("Enter a Valid Password");
                flag = false;
            }
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    console.log(res.data.message)
                    if(res.data.message == "True"){
                        history.push("/")
                    }else{
                        setmsg("User with that email already exists")
                    }
                })
        } else {
            setmsg("Passwords doesn't match")
        }
    }

    return (
        <div>
            <nav aria-label="breadcrumb" style={{ paddingLeft: '25px', paddingTop: '17px' }}>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item" onClick={() => history.push("/")}><a href="#">Login</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Register</li>
                </ol>
            </nav>
            <br />
            <div className="regster" style={{ textAlign: "center" }}>
                <div class="vox">
                    {console.log(user)}
                    <h1>Register</h1>
                    <br></br>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Full name</span>
                        <input type="text" required class="form-control" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
                    </div>
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
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Confirm password</span>
                        <input type="password" required class="form-control" name="password" value={repass} placeholder="Your Password" onChange={(e) => { setrepass(e.target.value) }}></input>
                    </div>
                    <br></br>
                    <button className="btn btn-primary btn-sm" onClick={register} >Register</button>
                    <div>
                        <br></br>
                        {(msg) && msg}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register