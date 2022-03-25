import React, { useState, useEffect } from "react";

const MyRoutines = () => {
  const [userRoutines, setUserRoutines] = useState([]);
  const [createdRoutine, setCreatedRoutine] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  //will need token here

  //show form to create new routine with text fields for name and goal
  //each routine should be able to update name and goal,
  //delete entire routine,
  //add an activity to a routine via small form which has a dropdown
  //for all activities, and inputs for count and duration
  //update duration or count of any activity
  //be able to remove activity from the routine

  const fetchUserRoutines = async (username) => {
    //need the username to pass in
    const resp = fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routine`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const info = await resp.json();
    setUserRoutines(info);
  };

  useEffect(() => {
    fetchUserRoutines();
  }, []);

  const createNewRoutine = async (token) => {
    const resp = fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
      method: "POST",
      body: JSON.stringify({
        name,
        goal,
        isPublic: true,
      }),
    });
    const info = await resp.json();
    setCreatedRoutine(info);

    setName("");
    setGoal("");
  };

  const updateRoutine = async () => {
    const resp = fetch("http://fitnesstrac-kr.herokuapp.com/api/routines/6", {
      method: "PATCH",
      body: JSON.stringify({
        name: "Long Cardio Day",
        goal: "To get your heart pumping!",
      }),
    });
    const info = await resp.json();
    setUserRoutines(info);
  };

  const deleteRoutine = async (routineId) => {
    const resp = fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const info = await resp.json();
    if (info) {
      const newRoutines = userRoutines.filter(
        (routine) => routine.id !== routineId
      );
      setUserRoutines(newRoutines);
    }
  };
  //   console.log(userRoutines);
  return (
    <>
      <h1>My Routines</h1>

      <h2>Create Routine</h2>
      <form>
        <label>
          Name
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Goal
          <input
            required
            type="text"
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
            }}
          ></input>
        </label>
        <button type="submit" onClick={createNewRoutine}>
          Submit
        </button>
      </form>

      {userRoutines.map((routine) => (
        <div key={userRoutines.id} id="routines">
          <h2>{routine.name}</h2>
          <h3>Goal: {routine.goal}</h3>
          {routine.activities.map((activity) => (
            <div key={routine.id}>
              <h3>Activities: {activity.name}</h3>
              <h4>Description: {activity.description}</h4>
              <p>Count: {activity.count}</p>
              <p>Duration: {activity.duration}</p>
              <button
                value={routine.id}
                onClick={(e) => {
                  const id = e.target.value;
                  deleteRoutine(id);
                }}
              >
                Delete Routine
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default MyRoutines;
