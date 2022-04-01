import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../App";
import AddActivity from "./AddActivity";
import AddMyRoutineActivity from "./AddMyRoutineActivity";
import AddMyRoutines from "./AddMyRoutines";

import "./css/MyRoutines.css";
import UpdateMyRoutineActivity from "./UpdateMyRoutineActivity";
import UpdateRoutine from "./UpdateRoutine";

const MyRoutines = ({ user, fetchRoutines, routines }) => {
    const [routineInfo, setRoutineInfo] = useState({});
    const [routineId, setRoutineId] = useState("");
    const [routineActivity, setRoutineActivity] = useState({});
    const [clickedId, setClickedId] = useState("");

    const userId = user?.id;

    const navigate = useNavigate();

    const filteredRoutines = routines.filter((routine) => {
        if (routine.creatorId === userId) {
            return true;
        }
    });

    const deleteRoutineHandler = async (routineId) => {
        const lstoken = localStorage.getItem("token");
        const resp = await fetch(`${BASE_URL}api/routines/${routineId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${lstoken}`,
            },
        });

        const info = await resp.json();

        fetchRoutines();

        return info;
    };

    const deleteRoutineActivityHandler = async (routineActivityId) => {
        const lstoken = localStorage.getItem("token");
        const resp = await fetch(
            `${BASE_URL}api/routine_activities/${routineActivityId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${lstoken}`,
                },
            }
        );

        const info = await resp.json();

        fetchRoutines();

        return info;
    };

    useEffect(() => {
        fetchRoutines();
    }, []);

    return (
        <div className="myroutines_main">
            <div className="myroutines_title-link">
                <h1>My Routines</h1>
                {user && (
                    <Link
                        className="myroutines_add_link"
                        to="/myroutines/addRoutine"
                    >
                        ( + New Routine )
                    </Link>
                )}
            </div>
            <div>
                <Routes>
                    <Route
                        path="/addRoutine"
                        element={
                            <AddMyRoutines fetchRoutines={fetchRoutines} />
                        }
                    />
                </Routes>
            </div>
            <div>
                <Routes>
                    <Route
                        path="updateRoutine/:id"
                        element={
                            <UpdateRoutine
                                fetchRoutines={fetchRoutines}
                                routineInfo={routineInfo}
                            />
                        }
                    />
                </Routes>
            </div>
            <div>
                <Routes>
                    <Route
                        path="updateActivity"
                        element={
                            <UpdateMyRoutineActivity
                                routineActivity={routineActivity}
                                fetchRoutines={fetchRoutines}
                            />
                        }
                    />
                </Routes>
            </div>
            <div>
                {filteredRoutines?.map((routine) => {
                    return (
                        <div key={routine.id} className="myroutines_container">
                            <div className="position-left">
                                <div className="myroutines_creator-title">
                                    <h2>{routine.name.toUpperCase()}</h2>
                                    <span>( {routine.creatorName} )</span>
                                </div>

                                {routine.activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="myroutines_activities_container"
                                    >
                                        <p className="myroutines_activities_title">
                                            {activity.name}
                                        </p>
                                        <p>
                                            <span>Count: </span>
                                            {activity.count}
                                        </p>
                                        <p>
                                            <span>Duration: </span>
                                            {activity.duration}
                                        </p>
                                        <p>{activity.description}</p>
                                        <div>
                                            <Link
                                                onClick={() => {
                                                    setRoutineActivity(
                                                        activity
                                                    );
                                                }}
                                                to="/myroutines/updateActivity"
                                            >
                                                Update
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    deleteRoutineActivityHandler(
                                                        activity?.routineActivityId
                                                    );
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <Routes>
                                        <Route
                                            path="/addActivity"
                                            element={
                                                <AddMyRoutineActivity
                                                    fetchRoutines={
                                                        fetchRoutines
                                                    }
                                                    routineId={routineId}
                                                />
                                            }
                                        />
                                    </Routes>
                                </div>
                                <p className="routines_goal">
                                    <span>Goal:</span>
                                    {routine.goal}
                                </p>
                                {
                                    <AddMyRoutineActivity
                                        routineId={routine.id}
                                        fetchRoutines={fetchRoutines}
                                        clickedId={clickedId}
                                        setClickedId={setClickedId}
                                    />
                                }
                            </div>
                            <div className="position-right">
                                <Link
                                    onClick={() => {
                                        fetchRoutines();
                                        setRoutineInfo(routine);
                                    }}
                                    to={`updateRoutine/${routine.id}`}
                                >
                                    Update Routine
                                </Link>
                                <button
                                    onClick={() => {
                                        deleteRoutineHandler(routine?.id);
                                        navigate("/myroutines");
                                    }}
                                >
                                    Delete Routine
                                </button>
                                <button
                                    onClick={(e) => {
                                        setClickedId(routine.id);
                                    }}
                                >
                                    New Activity
                                </button>
                                {/* <Link
                                    onClick={() => {
                                        setRoutineId(`${routine?.id}`);
                                    }}
                                    to={`/myroutines/addActivity`}
                                >
                                    New Activity
                                </Link> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyRoutines;
