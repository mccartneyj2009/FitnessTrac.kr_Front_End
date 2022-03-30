import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { BASE_URL } from "../App";

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
        <div id="registration-form">
            <form
                className="app-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLoginUser();
                }}
            >
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    required
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
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                ></input>
                <button>Login</button>
            </form>
            <p>
                Don't have an accout yet? <Link to="/register">Register</Link>
            </p>
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
