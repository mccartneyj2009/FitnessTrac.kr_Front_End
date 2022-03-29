import { useState } from "react";
import { BASE_URL } from "../App";


const AddMyRoutines = ({fetchRoutines}) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [error, setError] = useState("");

    const addRoutineHandler = async(e) => {
        e.preventDefault();
        const lsToken = localStorage.getItem('token');
        const resp = await fetch(`${BASE_URL}api/routines`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${lsToken}`
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic: true
            })
        });

        const info = await resp.json();

        if(info.error) {
            setError(error.message);
        }

        setName("");
        setGoal("");

        fetchRoutines();

        return info
    }



    return (
        <div className="myroutines_add_form">
            <form
                onSubmit={addRoutineHandler}
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
                        setGoal(e.target.value)
                    }}
                />
                <button>(+ Add)</button>
            </form>
            <p>{error}</p>
        </div>
    )
}

export default AddMyRoutines;