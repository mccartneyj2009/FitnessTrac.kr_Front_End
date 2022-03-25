import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    console.log(username, password, confirm);

    return (
        <div id="registration-form">
            <form
                className="app-form"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                ></input>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    onChange={(e) => {
                        setConfirm(e.target.value);
                    }}
                ></input>
                <button>Register</button>
            </form>
        </div>
    );
};

export default Register;
