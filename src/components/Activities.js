import { useState } from "react";

const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`;


const Activities = ({}) => {

    const [activities, setActivities] = useState([]);

    async function fetchActivities () {
        const response = await fetch(`${BASE_URL}/activities`);
        const info = response.json();
        setActivities(info);
    }
    fetchActivities();

    return <>

        {activities?.map(activity => {
            return <div>{activity}</div>
        })}

    </>

}

export default Activities;