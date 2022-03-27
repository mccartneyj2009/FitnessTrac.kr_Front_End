import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddMyRoutines from "./AddMyRoutines";

import "./css/MyRoutines.css"

const MyRoutines = ({user, fetchRoutines}) => {
  
  return <div className="myroutines_main">

      <div className="myroutines_title-link">
        <h1>My Routines</h1>
        {user && <Link className="myroutines_add_link" to="/myroutines/add">( + New Routine )</Link>}
      </div>

      <div>
        <Routes>
          <Route
            path="/add"
            element={<AddMyRoutines 
              fetchRoutines={fetchRoutines}/>}
          />
        </Routes>
      </div>

  </div>
};

export default MyRoutines;
