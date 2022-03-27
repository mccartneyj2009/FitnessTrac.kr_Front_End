import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage.js";
import Routines from "./components/Routines.js";
import Register from "./components/Register.js";
import Login from "./components/Login";
import NavBar from "./components/NavBar.js";
import Activities from "./components/Activities.js";
import MyRoutines from "./components/MyRoutines.js";
export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const fetchRoutines = async () => {
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const info = await resp.json();
    setRoutines(info);
  };

  const fetchActivities = async () => {
    const resp = await fetch(`${BASE_URL}api/activities`);
    const info = await resp.json();

    setActivities(info);
  };

  const fetchUser = async () => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
    }
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lstoken}`,
        },
      }
    );
    const info = await resp.json();
    // console.log(info);
    if (info) {
      setUser(info);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchRoutines();
    fetchActivities();
  }, [token]);

  //   console.log(fetchRoutines);
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <Routes>
        <Route 
          exact 
          path="/" 
          element={<HomePage user={user}/>} 
        />
        <Route
          exact
          path="/routines"
          element={<Routines routines={routines} setRoutines={setRoutines} />}
        />
        <Route
          exact
          path="/register"
          element={<Register setToken={setToken} />}
        />
        <Route 
          exact 
          path="/login" 
          element={<Login setToken={setToken} />} 
        />
        <Route
          exact
          path="/myroutines/*"
          element={<MyRoutines 
            token={token} 
            user={user} 
            fetchRoutines={fetchRoutines}/>}
        />
        <Route
          exact
          path="/activities/*"
          element={<Activities 
            activities={activities} 
            user={user}
            token={token}
            fetchActivities={fetchActivities}/>}
        />

        {/* <MyRoutines />
      </Route>
      <Route exact path="/activities">
        <Activities />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route> */}
      </Routes>
    </div>
  );
};

export default App;
