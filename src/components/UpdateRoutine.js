import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../App";


const UpdateRoutine = ({fetchRoutines,routineInfo}) => {
    const {id} = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState(routineInfo?.name);
    const [goal, setGoal] = useState(routineInfo?.goal);
    const [error, setError] = useState("");

    const updateRoutineHandler = async(e) => {
        e.preventDefault();
        try {
            const lstoken = localStorage.getItem("token");
            const resp = await fetch(`${BASE_URL}api/routines/${id}`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${lstoken}`
                },
                body: JSON.stringify({
                    name,
                    goal,
                    isPublic: true
                })
            });

            const info = await resp.json();

            if(info){
                navigate("/myroutines");
            }

            if(info.error) {
                setError(info.message)
            }

            setName("");
            setGoal("");

            fetchRoutines();

            return info;

        } catch (error) {
            throw error;
        }
        
    };

    return <div className="myroutines_update_form">
    <form
        onSubmit={updateRoutineHandler}
    >
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
            }}
        />
        <input
            type="text"
            placeholder="Goal"
            value={goal}
            onChange={(e) => {
                setGoal(e.target.value);
            }}
        />
        <button>
            Update
        </button>
        <button
            onClick={() => {
                navigate("/myroutines")
            }}
        >
            Cancel
        </button>
    </form>
    <div>
        {error}
    </div>
    </div> 
}

export default UpdateRoutine;