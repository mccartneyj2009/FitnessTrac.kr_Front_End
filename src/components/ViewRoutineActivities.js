import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../App";


const ViewRoutineActivities = () => {

    const {id} = useParams();

    const [routineActivities, setRoutineActivities] = useState([]);
        
    const fetchRoutineActivities = async() => {
        try {
            const resp = await fetch(`${BASE_URL}api/activities/${id}/routines`);
            const info = await resp.json();

            if(info){
                setRoutineActivities(info);
                
            };
            
            return info;

        } catch (error) {
            throw error;
        }
    }

    useEffect(()=> {
        fetchRoutineActivities();
    },[])

    return <>
        {routineActivities?.map((routine) => (
            <div key={routine.id} id="routines" className="routines_container">
                <div className="routines_view-routine-activities">
                    <h2>{routine.name.toUpperCase()}</h2>
                    <span>( {routine.creatorName} )</span>
                </div>

                {routine.activities.map((activity) => (
                    <div key={activity.id} className="routines_activities_container">
                        <p className="routines_activities_name">
                            {activity.name}
                        </p>
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
    </>
}

export default ViewRoutineActivities;