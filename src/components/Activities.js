

import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddActivity from "./AddActivity";
import "./css/Activities.css";
import UpdateActivity from "./UpdateActivity";

const Activities = ({activities,user,token,fetchActivities}) => {

    const [activityInfo, setActivityInfo] = useState([]);

    return (
        <div className="activities_main">
            <div className="activities_title-link">
                <h1>Activities</h1>
                {!user.error && 
                    <Link 
                        className="activities_add_link" 
                        to="/activities/add">
                            ( + New Activity )
                    </Link>
                }
            </div>

            <div>
                <Routes>
                    <Route 
                        path="/add" 
                        element={<AddActivity 
                            token={token}
                            fetchActivities={fetchActivities}
                        />}
                    />
                </Routes>
            </div>

            <div>
                <Routes>
                    <Route
                        path="/update/:id"
                        element={<UpdateActivity
                            activityInfo={activityInfo}
                            fetchActivities={fetchActivities}
                        />}
                    />
                </Routes>
            </div>

            <div className="activities_container">
                {activities?.map(activity => {
                    return (
                        <div 
                            key={activity.id} 
                            className="activities_content"
                        >
                            <p>
                                <span>Name: </span>
                                <Link
                                    to={`/activities/${activity.id}/routines`}
                                >
                                    {activity.name}
                                </Link>
                            </p>
                            <p>
                                <span>Description: </span>
                                <Link
                                    onClick={()=>{
                                        setActivityInfo(activity);
                                        window.scrollTo(0,0);
                                    }}
                                    to={`/activities/update/${activity.id}`}
                                >
                                    {activity.description}
                                </Link>
                            </p>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )

}

export default Activities;