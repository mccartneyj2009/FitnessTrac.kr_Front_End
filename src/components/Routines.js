const Routines = ({ routines, setRoutines }) => {
  // console.log(routines);
  if (!routines) {
    return <div></div>;
  }

  return (
    <>
      <h1>Routines</h1>
      {routines.map((routine) => (
        <div key={routines.id} id="routines">
          <h2>{routine.name}</h2>
          <h3>Goal: {routine.goal}</h3>
          <h3>Author: {routine.creatorName}</h3>
          {/* maybe map through activities */}
          {routine.activities.map((activity) => (
            <div key={routine.id}>
              <h3>Activities: {activity.name}</h3>
              <p>Description: {activity.description}</p>
              <h4>Count: {activity.count}</h4>
              <h4>Duration: {activity.duration}</h4>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Routines;
