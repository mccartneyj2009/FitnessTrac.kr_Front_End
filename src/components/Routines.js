import "./css/Routines.css";

const Routines = ({routines}) => {

  return (
    <div className="routines_main">

      <h1>Routines</h1>

      {routines.map((routine) => (
        
        <div key={routine.id} id="routines" className="routines_container">
          <div className="routines_creator-title">
            <h2>{routine.name.toUpperCase()}</h2>
            <span>( {routine.creatorName} )</span>
          </div>

          {routine.activities.map((activity) => (
            <div key={activity.id} className="routines_activities_container">
              <p className="routines_activities_name">{activity.name}</p>
              <p>
                <span>Count: </span>
                {activity.count}
              </p>
              <p>
                <span>Duration: </span>
                {activity.duration}
              </p>
              <p>{activity.description}</p>
            </div>
          ))}

          <p className="routines_goal">
            <span>Goal:</span> 
            {routine.goal}
          </p>

        </div>
      ))}
    </div>
  );
};

export default Routines;
