const Routines = ({ routines, setRoutines }) => {
    // console.log(routines);
    // let activities = routines.activities;
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
                    <h3>Activities: {routine.activities.name}</h3>
                    <p>{routine.activities.description}</p>
                    <h4>{routine.activities.count}</h4>
                    <h4>{routine.activities.duration}</h4>
                </div>
            ))}
        </>
    );
};

export default Routines;
