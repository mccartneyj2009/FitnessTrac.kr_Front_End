import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomePage from "./HomePage";
import Routines from "./Routines";

const App = () => {
  const [routines, setRoutines] = useState([]);

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

  useEffect(() => {
    fetchRoutines();
  });

  //   console.log(fetchRoutines);
  return (
    <div>
      {/* <div>
        <Navbar />
      </div> */}
      {/* <Route exact path="/home" element={<Home/>}/> */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/routines"
          element={<Routines routines={routines} setRoutines={setRoutines} />}
        />
        {/* <Route exact path="/myroutines">
        <MyRoutines />
      </Route>
      <Route exact path="/activities">
        <Activities />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route> */}
      </Routes>
    </div>
  );
};

export default App;
