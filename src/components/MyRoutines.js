import { Link, Route, Routes } from "react-router-dom";
import AddMyRoutineActivity from "./AddMyRoutineActivity";
import AddMyRoutines from "./AddMyRoutines";

import "./css/MyRoutines.css"

const MyRoutines = ({user, fetchRoutines, routines}) => {

  const userId = user?.id;

  const filteredRoutines = routines.filter(routine => {
    if(routine.creatorId === userId){
      return true;
    }
  });

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
        {filteredRoutines?.map((routine) => {
          return (
            <div key={routine.id} className="myroutines_container">
              <div className="myroutines_creator-title">
                <h2>{routine.name.toUpperCase()}</h2>
                <span>( {routine.creatorName} )</span>
              </div>

              <Link 
                className="myroutines_add_link" 
                to={`/myroutines/addActivity/${routine.id}`}>
                  ( + New Activity )
              </Link>

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

            </div>)
          })}
      </div>

    </div>
  )
};

export default MyRoutines;