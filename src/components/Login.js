import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { BASE_URL } from "../App";

import "./css/RegisterLogin.css";

const Login = ({ user, setToken, setUser, fetchUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginUser = async (e) => {
        e.preventDefault();

        const resp = await fetch(`${BASE_URL}api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const info = await resp.json();

        localStorage.setItem("token", info.token);

        if (info.error) {
            setError(info.message);
        }

        fetchUser();
    };

    if (!user.error) {
        return (
            <div className="logged-in">
                <div>
                    <h1>You are currently logged in as {user.username}</h1>
                    <button
                        onClick={() => {
                            setToken("");
                            setUser({});
                            localStorage.removeItem("token");
                            setUsername("");
                            setPassword("");
                            fetchUser();
                        }}
                    >
                        Log out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="register-login_main">
            <form onSubmit={handleLoginUser}>
                <h1>Log In</h1>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username*"
                    onChange={(e) => {
                        setUsername(e.target.value);
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
                    }}
                ></input>
                <button>Login</button>
                <p>
                    Don't have an accout yet?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;

// import { useState, useEffect } from "react";
// import { useNavigate, Navigate, Link } from "react-router-dom";
// import { BASE_URL } from "../App";

// const Login = ({ setToken }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const navigate = useNavigate();
//     const lsToken = localStorage.getItem("token");

//     // useEffect(() => {
//     //     navigate("/");
//     // }, []);

//     const handleLoginUser = async () => {
//         setError("");
//         const resp = await fetch(`${BASE_URL}api/users/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//             }),
//         });
//         const info = await resp.json();

//         if (info.error) {
//             setError(info.error);
//             return;
//         }

//         localStorage.setItem("token", info.token);
//         setToken(info.token);

//         navigate("./HomePage", { replace: true });
//     };

//     if (lsToken) {
//         return <Navigate replace to="/" />;
//     }

//     return (
//         <div id="login-form">
//             <form
//                 className="app-form"
//                 onSubmit={(e) => {
//                     e.preventDefault();

//                     handleLoginUser();
//                 }}
//             >
//                 <label htmlFor="username">Username</label>
//                 <input
//                     id="username"
//                     type="text"
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                         setError("");
//                     }}
//                 ></input>
//                 {error.length ? <p>{error}</p> : null}
//                 <label htmlFor="password">Password</label>
//                 <input
//                     id="password"
//                     type="password"
//                     onChange={(e) => {
//                         setPassword(e.target.value);
//                         setError("");
//                     }}
//                 ></input>
//                 <button>Login</button>
//             </form>
//             <p>
//                 Don't have an accout yet? <Link to="/register">Register</Link>
//             </p>
//         </div>
//     );
// };

// export default Login;
