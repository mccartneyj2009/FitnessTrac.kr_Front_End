import { useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../App";
import AddActivity from "./AddActivity";
import AddMyRoutineActivity from "./AddMyRoutineActivity";
import AddMyRoutines from "./AddMyRoutines";

import "./css/MyRoutines.css"
import UpdateRoutine from "./UpdateRoutine";

const MyRoutines = ({user, fetchRoutines, routines, fetchActivities}) => {

  const [routineActivity, setRoutineActivity] = useState([]);

  console.log(routineActivity)

  const userId = user?.id;

  const navigate = useNavigate();

  const filteredRoutines = routines.filter(routine => {
    if(routine.creatorId === userId){
      return true;
    }
  });

  const deleteRoutineHandler = async(routineId) => {
    const lstoken = localStorage.getItem("token");
    const resp = await fetch(`${BASE_URL}api/routines/${routineId}`,{
      method:"DELETE",
      headers:{
        "Content-type": "application/json",
        "Authorization": `Bearer ${lstoken}`
      }
    });

    const info = await resp.json();

    fetchRoutines();
    
    return info;
  }

  return (
    <div className="myroutines_main">
      <div className="myroutines_title-link">
        <h1>My Routines</h1>
        {user && 
          <Link 
            className="myroutines_add_link" 
            to="/myroutines/addRoutine">
              ( + New Routine )
          </Link>
        }
      </div>

      <div>
        <Routes>
          <Route
            path="/addRoutine"
            element={<AddMyRoutines 
              fetchRoutines={fetchRoutines}/>}
          />
        </Routes>
      </div>
      <div>
        <Routes>
          <Route
              path="updateRoutine/:id"
              element={<UpdateRoutine
              fetchRoutines={fetchRoutines}/>}
            />
        </Routes>
      </div> 
      <div>
        {filteredRoutines?.map((routine) => {
          return (
            <div key={routine.id} className="myroutines_container">
              <div className="position-left">
                <div className="myroutines_creator-title">
                  <h2>{routine.name.toUpperCase()}</h2>
                  <span>( {routine.creatorName} )</span>
                </div>

                <Link 
                  className="myroutines_add_link" 
                  to={`/myroutines/addActivity/${routine.id}`}>
                    ( + New Activity )
                </Link>

                {routineActivity?.map((ra) => {
                  <div key={ra.id}>
                    <p>{ra.name}</p> 
                    <p>{ra.description}</p>
                  </div>
                })}

                <div>
                  <Routes>
                    <Route
                      path="/addActivity/:id"
                      element={<AddMyRoutineActivity/>}
                    />
                  </Routes>
                </div>

                <p className="routines_goal">
                  <span>Goal:</span> 
                  {routine.goal}
                </p>
              </div>

              <div className="position-right">
                <Link 
                  onClick={() => {
                    fetchRoutines();
                  }} 
                  to={`updateRoutine/${routine.id}`}>
                    Update
                </Link>
                <button
                  onClick={() => {
                    deleteRoutineHandler(routine?.id);
                    navigate("/myroutines");

                  }}
                >
                  Delete
                </button>
              </div>

            </div>
          )
          })}
      </div>
    </div>
  )
};

export default MyRoutines;