import { useState } from "react";
import { BASE_URL } from "../App";



const AddActivity = ({token,fetchActivities}) => {

    const [activityName, setActivityName] = useState("");
    const [activityDescription, setActivityDescription] = useState("");
    const [error, setError] = useState("");

    const addActivityHandler = async (e) => {
        e.preventDefault();
        const resp = await fetch(`${BASE_URL}api/activities`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name:`${activityName}`,
                description:`${activityDescription}`
            })
        })
        const info = await resp.json();

        setActivityName("");
        setActivityDescription("");

        fetchActivities();

        if(info.error) {
            setError(info.message)
        } else {
            setError("")
        }

        return info
    }

    return (
        <div>
            <form 
                className="activities_add_form"
                onSubmit={addActivityHandler}
            >
                <input 
                    type="text"
                    placeholder="Name"
                    value={activityName}
                    onChange={(e) => {
                        setActivityName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={activityDescription}
                    onChange={(e) => {
                        setActivityDescription(e.target.value)
                    }}
                />
                <button>
                    (+ Add)
                </button>
            </form>
            <div className="activities_add_error">
                <p>{error}</p>
            </div>
        </div>
    )
}

export default AddActivity;