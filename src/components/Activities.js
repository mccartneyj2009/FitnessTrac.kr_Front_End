

import { Link, Route, Routes } from "react-router-dom";
import AddActivity from "./AddActivity";
import "./css/Activities.css";

const Activities = ({activities,user,token,fetchActivities}) => {
    console.log(activities)
    console.log(user)
    return <div className="activities_main">

        <div className="activities_title-link">
            <h1>Activities</h1>
            {user && <Link className="activities_add_link" to="/activities/add">( + New Activity )</Link>}
        </div>

        <div>
            <Routes>
                <Route 
                    path="/add" 
                    element={<AddActivity 
                        token={token}
                        fetchActivities={fetchActivities}/>}
                />
            </Routes>
        </div>

        <div className="activities_container">
        {activities?.map(activity => {
            return <div key={activity.id} className="activities_content">
                <p>
                    <span>Name: </span>
                    {activity.name}
                </p>
                <p>
                    <span>Description: </span>
                    {activity.description}
                </p>
            </div>
        })}
        </div>
    
    </div>

}

export default Activities;