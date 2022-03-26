import React, { useState, useEffect } from "react";

const MyRoutines = ({ token, user }) => {
  const [userRoutines, setUserRoutines] = useState([]);
  const [createdRoutine, setCreatedRoutine] = useState([]);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  //will need token here

  // console.log(user);
  //show form to create new routine with text fields for name and goal
  //each routine should be able to update name and goal,
  //delete entire routine,
  //add an activity to a routine via small form which has a dropdown
  //for all activities, and inputs for count and duration
  //update duration or count of any activity

  //be able to remove activity from the routine

  const fetchUserRoutines = async () => {
    // console.log(user);
    //need the username to pass in
    if (user) {
      const resp = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/users/${user.username}/routines`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const info = await resp.json();
      // console.log(info);
      setUserRoutines(info);
    }
  };

  const createNewRoutine = async (e) => {
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          goal,
          isPublic: true,
        }),
      }
    );
    const info = await resp.json();
    console.log(info);
    // setCreatedRoutine(info);
    setUserRoutines(info);

    setName("");
    setGoal("");
  };

  const updateRoutine = async (id) => {
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          name,
          goal,
        }),
      }
    );
    const info = await resp.json();
    setUserRoutines(info);
  };
  // console.log(user);
  // console.log(userRoutines);
  const deleteRoutine = async (routineId) => {
    const resp = await fetch(
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
    console.log("===>", info);
    if (info) {
      const newRoutines = userRoutines.filter(
        (routine) => routine.creatorid !== user.id
      );
      setUserRoutines(newRoutines);
    }
  };

  useEffect(() => {
    fetchUserRoutines();
  }, [user, userRoutines]);

  if (!user) {
    return <div></div>;
  }

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
        <div key={routine.id} id="routines">
          <h2>{routine.name}</h2>
          <h3>Goal: {routine.goal}</h3>
          <button
            value={routine.id}
            onClick={(e) => {
              const id = e.target.value;
              deleteRoutine(id);
            }}
          >
            Delete Routine
          </button>
          <button
            value={routine.id}
            onClick={(e) => {
              const id = e.target.value;
              updateRoutine(id);
            }}
          >
            Update Routine
          </button>
          {routine.activities.map((activity) => (
            <div key={activity.id}>
              <h3>Activities: {activity.name}</h3>
              <h4>Description: {activity.description}</h4>
              <p>Count: {activity.count}</p>
              <p>Duration: {activity.duration}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default MyRoutines;
