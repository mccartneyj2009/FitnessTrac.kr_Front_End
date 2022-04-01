import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

import "./css/AddMyRoutineActivity.css";

const AddMyRoutineActivity = ({
    fetchRoutines,
    routineId,
    clickedId,
    setClickedId,
}) => {
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    const [error, setError] = useState("");
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState("");

    const navigate = useNavigate();
    const lstoken = localStorage.getItem("token");

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

    const routineActivityHandler = async () => {
        const resp = await fetch(
            `${BASE_URL}api/routines/${routineId}/activities`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${lstoken}`,
                },
                body: JSON.stringify({
                    activityId,
                    count,
                    duration,
                }),
            }
        );
        const info = await resp.json();

        fetchRoutines();

        navigate("/myroutines");
    };

    if (clickedId === routineId) {
        return (
            <div className="routine-activity_main">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (activityId) {
                            routineActivityHandler();
                            setCount("");
                            setDuration("");
                            setClickedId("");
                            setError("");
                            setActivityId("");
                        } else {
                            setError("No Activity Selected");
                        }
                    }}
                >
                    <select
                        defaultValue="default"
                        required
                        onChange={(e) => {
                            console.log(e.target.value);
                            setActivityId(e.target.value);
                        }}
                    >
                        <option key="default" value="default" disabled>
                            -- Select an Activity --
                        </option>
                        {activities.map((activity) => {
                            return (
                                <option key={activity.id} value={activity.id}>
                                    {activity.name}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        type="text"
                        placeholder="Count"
                        value={count}
                        required
                        onChange={(e) => {
                            setCount(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        value={duration}
                        required
                        onChange={(e) => {
                            setDuration(e.target.value);
                        }}
                    />
                    <button>Submit</button>
                    <button
                        type="reset"
                        onClick={() => {
                            setCount("");
                            setDuration("");
                            setClickedId("");
                            setError("");
                            setActivityId("");
                        }}
                    >
                        Cancel
                    </button>
                    <p>{error ? error : null}</p>
                </form>
                
            </div>
        );
    } else {
        return <></>;
    }
};

export default AddMyRoutineActivity;
