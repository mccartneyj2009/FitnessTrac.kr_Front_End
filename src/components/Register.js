import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { BASE_URL } from "../App";

const Register = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const lsToken = localStorage.getItem("token");

    const handleRegisterUser = async () => {
        setError("");
        const resp = await fetch(`${BASE_URL}api/users/register`, {
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
        <div id="registration-form" className="register-login_main">
            <form
                // className="app-form"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (password !== confirm) {
                        return setError("Passwords do not match.");
                    }
                    if (password.length < 8) {
                        return setError(
                            "Password must be atleast 8 characters in length."
                        );
                    }

                    handleRegisterUser();
                }}
            >
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
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
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                ></input>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    onChange={(e) => {
                        setConfirm(e.target.value);
                        setError("");
                    }}
                ></input>
                <button>Register</button>
            </form>
            <p>
                Already have an accout? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
