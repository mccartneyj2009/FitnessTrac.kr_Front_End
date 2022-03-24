import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [conform, setConfirm] = useState("");

    return (
        <div id="registration-form">
            <form
                className="app-form"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <label htmlFor="username">Username</label>
                <input id="username" type="text"></input>
                <label htmlFor="password">Password</label>
                <input id="password" type="password"></input>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input id="confirm-password" type="password"></input>
                <button>Register</button>
            </form>
        </div>
    );
};

export default Register;
