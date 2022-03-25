import { useState } from "react";
import { Link } from "react-router-dom";

import "./css/RegisterLogin.css"

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <div id="registration-form" className="register-login_main">
            
            <form
                // className="app-form"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <h1>SIGN UP</h1>
                <label htmlFor="username">Username:</label>
                <input 
                    id="username" 
                    type="text" 
                    placeholder="Username*">  
                </input>
                <label htmlFor="password">Password:</label>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="Password*"
                    value={password}
                    onChange={event => {setPassword(event.target.value)}}>
                </input>
                <label htmlFor="confirm-password">Confirm Password:</label>
                {password.length !== 0 && <input id="confirm-password" type="password" placeholder="Confirm Password"></input>}
                <button>Register</button>
                <Link to="/login"> Already have an account? Log in </Link>
            </form>
        </div>
    );
};

export default Register;
