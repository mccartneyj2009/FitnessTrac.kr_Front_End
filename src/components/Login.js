import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <div className="register-login_main">
            
            <form
                // className="app-form"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <h1>LOG IN</h1>
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
                <button>Log in</button>
                <Link to="/register"> Don't have an account? Sign up </Link>
            </form>
        </div>
    );
}




export default Login;