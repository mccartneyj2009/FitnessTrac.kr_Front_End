import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

import "./css/AddMyRoutineActivity.css";

const AddMyRoutineActivity = ({ fetchRoutines, routineId }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    const [error, setError] = useState("");
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const resp = await fetch(`${BASE_URL}api/activities`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const info = await resp.json();

        setActivities(info);
    };

    const routineActivityHandler = async (e) => {
        console.log(first);
        // e.preventDefault();

        // const lstoken = localStorage.getItem("token");

        // const resp = await fetch(`${BASE_URL}api/activities`, {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${lstoken}`,
        //     },
        //     body: JSON.stringify({
        //         name,
        //         description,
        //     }),
        // });

        // const info = await resp.json();

        // if (info.error) {
        //     setError(error.message);
        // }

        // if (info) {
        //     const resp_RA = await fetch(
        //         `${BASE_URL}api/routines/${routineId}/activities`,
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-type": "application/json",
        //                 Authorization: `Bearer ${lstoken}`,
        //             },
        //             body: JSON.stringify({
        //                 activityId: info.id,
        //                 count,
        //                 duration,
        //             }),
        //         }
        //     );

        //     const info_RA = await resp_RA.json();

        //     fetchRoutines();

        //     if (!info_RA.error) {
        //         navigate("/myroutines");
        //     }

        //     return info_RA;
        // }
    };

    console.log(activities);

    return (
        <div className="routine-activity_main">
            <form onSubmit={routineActivityHandler}>
                {/* add drop down to map thru activities.  */}
                {/* remove name and description */}
                {/* <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            /> */}
                <select
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                >
                    {activities.map((activity) => {
                        return (
                            <option key={activity.id} value={activity.name}>
                                {activity.name}
                            </option>
                        );
                    })}
                </select>
                <input
                    type="text"
                    placeholder="Count"
                    value={count}
                    onChange={(e) => {
                        setCount(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => {
                        setDuration(e.target.value);
                    }}
                />
                <button>Submit</button>
            </form>
            <p>{error}</p>
        </div>
    );
};

export default AddMyRoutineActivity;
