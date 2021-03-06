import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../App";



const UpdateActivity = ({activityInfo, fetchActivities}) => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [description, setDescription] = useState(activityInfo?.description);
    const [error, setError] = useState("");

    const editActivityHandler = async(e) => {
        e.preventDefault();
        try {
            const lstoken = localStorage.getItem("token");
            const resp = await fetch(`${BASE_URL}api/activities/${id}`,{
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${lstoken}`
                },
                body: JSON.stringify({
                    description
                })
            });

            const info = await resp.json();

            if(info.error) {
                setError("Sorry you have to be logged in to update an activity");
            }

            if(!info.error) {
                navigate("/activities");
            }

            fetchActivities();

            setDescription("");

            return info;

        } catch (error) {
            throw error;
        }
    }

    return <form
        className="activities_add_form"
        onSubmit={editActivityHandler}
    >
        <p>{activityInfo.name}</p>
        <input
            required
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
                setDescription(e.target.value)
            }}
        />
        <button>
            Update
        </button>
        <button
            onClick={() => {
                navigate("/activities");
            }}
        >
            Cancel
        </button>
        <p>{error}</p>
    </form>
}


export default UpdateActivity;