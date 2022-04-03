import { useState } from "react";
import { Link, useParams } from "react-router-dom";



const ViewUserRoutines = ({routines}) => {
    
    const {id} = useParams();
    const {creatorName} = useParams();

    const userRoutines = routines.filter((routine) => {
        if(`${routine.creatorId}` === id){
            return true
        }
    })

    return (
        <div className="routines_main">
            <h1>{creatorName}</h1>
            {userRoutines?.map((routine) => {
                return <div key={routine.id} className="routines_container">
                    <div className="routines_routine-name">
                        <h2>{routine.name}</h2>
                    </div>
                    {routine.activities.map((activity) => {
                        return <div key={activity.id} className="routines_activities_container">
                            <div className="routines_user-routines">
                                <Link
                                    to={`/activities/${activity.id}/routines`}
                                >
                                    {activity.name}
                                </Link>
                            </div>
                            <p>
                                <span>Count: </span>
                                {activity.count}
                            </p>
                            <p>
                                <span>Duration: </span>
                                {activity.duration}
                            </p>
                            <p>
                                {activity.description}
                            </p>
                        </div>
                    })}
                    <p className="routines_goal">
                        <span>Goal:</span> 
                        {routine.goal}
                    </p>
                </div>
            })}
        </div>
    )
}


export default ViewUserRoutines;