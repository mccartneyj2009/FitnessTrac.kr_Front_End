import { useState } from "react";

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;


const Activities = ({setActivities, activities}) => {
    console.log(activities)
    return <>

        {activities?.map(activity => {
            return <div key={activity.id}>
                <h3>Name: {activity.name}</h3>
                <h3>Description: {activity.description}</h3>
            </div>
        })}
    
    </>

}

export default Activities;