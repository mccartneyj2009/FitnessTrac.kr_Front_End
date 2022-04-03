import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage.js";
import Routines from "./components/Routines.js";
import Register from "./components/Register.js";
import Login from "./components/Login";
import NavBar from "./components/NavBar.js";
import Activities from "./components/Activities.js";
import MyRoutines from "./components/MyRoutines.js";
import ViewUserRoutines from "./components/ViewUserRoutines.js";
import ViewRoutineActivities from "./components/ViewRoutineActivities.js";
export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/";

const App = () => {
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    const fetchRoutines = async () => {
        try {
            const resp = await fetch(
                `${BASE_URL}api/routines`,
                {
                    headers: {
                    "Content-Type": "application/json",
                    }
                }
            );
        
            const info = await resp.json();

            setRoutines(info);

        } catch (error) {
            throw error;
        }
    };

    const fetchActivities = async () => {
        try {
            const resp = await fetch(`${BASE_URL}api/activities`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            const info = await resp.json();
    
            setActivities(info);
        } catch (error) {
            throw error;
        }
    };

    const fetchUser = async () => {
        try {
            const lstoken = localStorage.getItem("token");
            if (lstoken) {
                setToken(lstoken);
            }
            const resp = await fetch(`${BASE_URL}api/users/me`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${lstoken}`,
                },
            });

            const info = await resp.json();

            if (info) {
                setUser(info);
            }

            return info;

        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchUser();
        fetchRoutines();
        fetchActivities();
    }, []);

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <Routes>
                <Route exact path="/" element={<HomePage user={user} />} />
                <Route
                    exact
                    path="/routines"
                    element={
                        <Routines
                            routines={routines}
                            setRoutines={setRoutines}
                        />
                    }
                    
                />
                <Route
                    path="/routines/:creatorName/:id"
                    element={
                        <ViewUserRoutines
                            routines={routines}
                        />
                    }
                />
                <Route
                    exact
                    path="/register"
                    element={<Register setToken={setToken} />}
                />
                <Route
                    exact
                    path="/login"
                    element={
                        <Login
                            setUser={setUser}
                            user={user}
                            setToken={setToken}
                            fetchUser={fetchUser}
                        />
                    }
                />
                <Route
                    exact
                    path="/myroutines/*"
                    element={
                        <MyRoutines
                            token={token}
                            user={user}
                            fetchRoutines={fetchRoutines}
                            routines={routines}
                        />
                    }
                />
                <Route
                    exact
                    path="/activities/*"
                    element={
                        <Activities
                            activities={activities}
                            user={user}
                            token={token}
                            fetchActivities={fetchActivities}
                        />
                    }
                />
                <Route
                    path="/activities/:id/routines"
                    element={
                        <ViewRoutineActivities/>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
