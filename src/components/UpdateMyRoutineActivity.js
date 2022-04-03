
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";
import "./css/UpdateMyRoutineActivity.css";

const UpdateMyRoutineActivity = ({routineActivity, fetchRoutines}) => {
    const [count, setCount] = useState(routineActivity?.count);
    const [duration, setDuration] = useState(routineActivity?.duration);

    const navigate = useNavigate();

    const updateRoutineActivityHandler = async(e) => {
        e.preventDefault();

        try {
            const lstoken = localStorage.getItem("token");
            const resp = await fetch(`${BASE_URL}api/routine_activities/${routineActivity.routineActivityId}`,{
                method:"PATCH",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${lstoken}`
                },
                body: JSON.stringify({
                    count,
                    duration
                })
            });

            const info = await resp.json();

            fetchRoutines();

            setCount("");
            setDuration("");

            if(!info.error){
                navigate("/myroutines");
            }

            return info;

        } catch (error) {
            throw error;
        }
    }

    return <div className="update-ra_main">
        <form
            onSubmit={updateRoutineActivityHandler}
        >
            <p>{routineActivity.name}</p>
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
            <p>{routineActivity.description}</p>
            <button>Submit</button>
        </form>
    </div>
}


export default UpdateMyRoutineActivity;