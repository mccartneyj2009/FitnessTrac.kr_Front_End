import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { BASE_URL } from "../App";

import "./css/RegisterLogin.css";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const lsToken = localStorage.getItem("token");

    const handleLoginUser = async () => {
        setError("");
        const resp = await fetch(`${BASE_URL}api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const info = await resp.json();

        if (info.error) {
            setError(info.error);
            return;
        }

        localStorage.setItem("token", info.token);
        setToken(info.token);

        navigate("/");
    };

    if (lsToken) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className="register-login_main">
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    // if (password !== confirm) {
                    //     return setError("Passwords do not match.");
                    // }
                    // if (password.length < 8) {
                    //     return setError(
                    //         "Password must be atleast 8 characters in length."
                    //     );
                    // }

                    handleLoginUser();
                }}
            >
                <h1>Log In</h1>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username*"
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setError("");
                    }}
                ></input>
                {error.length ? <p>{error}</p> : null}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password*"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                ></input>
                <button>Login</button>
                <p>
                    Don't have an accout yet? <Link to="/register">Register</Link>
                </p>
            </form>
            
        </div>
    );
};

export default Login;
