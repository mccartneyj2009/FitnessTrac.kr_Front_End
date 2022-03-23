import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register.js";

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/";

const App = () => {
    const [token, setToken] = useState("");

    const lsToken = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default App;
