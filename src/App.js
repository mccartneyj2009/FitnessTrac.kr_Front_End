import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage.js";
import Routines from "./components/Routines.js";
import Register from "./components/Register.js";
import NavBar from "./components/NavBar.js";
import Activities from "./components/Activities.js";
const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [token, setToken] = useState("");

  const lsToken = localStorage.getItem("token");

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

    setActivities(info)
  }

  useEffect(() => {
    fetchRoutines();
    fetchActivities();
  },[]);

  //   console.log(fetchRoutines);
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/routines"
          element={<Routines routines={routines} setRoutines={setRoutines} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route path="activities" element={<Activities
            setActivities={setActivities}
            activities={activities}
        />} />



        {/* <Route exact path="/myroutines">
        <MyRoutines />
      </Route>
      <Route exact path="/activities">
        <Activities />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      */}
      </Routes>
    </div>
  );
};

export default App;
