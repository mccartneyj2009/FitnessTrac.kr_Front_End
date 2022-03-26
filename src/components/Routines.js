import "./css/Routines.css";

const Routines = ({ routines, setRoutines }) => {
  // console.log(routines);
  if (!routines) {
    return <div></div>;
  }
  console.log(routines);
  return (
    <div className="routines_main">
      <h1>Routines</h1>

      {routines.map((routine) => (
        <div key={routines.id} id="routines" className="routines_container">
          <h2>{routine.name.toUpperCase()}</h2>
          <div className="routines_creator">
            <span>{routine.creatorName}</span>
          </div>

          {routine.activities.map((activity) => (
            <div key={activity.id} className="routines_activities_content">
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

          <h4 className="routines_goal">Goal: {routine.goal}</h4>
        </div>
      ))}
    </div>
  );
};

export default Routines;
