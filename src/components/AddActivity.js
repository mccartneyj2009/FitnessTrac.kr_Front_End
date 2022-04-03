import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";



const AddActivity = ({token,fetchActivities}) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const addActivityHandler = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${BASE_URL}api/activities`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description
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
    
            return info;

        } catch (error) {
            throw error;
        }
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
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                />
                <button>
                    (+ Add)
                </button>
                <button
                    onClick={() => {
                        navigate("/activities");
                    }}
                >
                    Cancel
                </button>
            </form>
            <div className="activities_add_error">
                <p>{error}</p>
            </div>
        </div>
    )
}

export default AddActivity;