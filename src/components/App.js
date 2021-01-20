import React, { useState, useEffect } from "react";
// 👉 TASK 1 - import the axios lib from node_modules
import axios from "axios";

// 👉 TASK 2 - import the constants from constants/index.js
import { BASE_URL, API_KEY } from "../constants";

import Details from "./Details";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [currentFriendId, setCurrentFriendId] = useState(null);

  const openDetails = (id) => {
    setCurrentFriendId(id);
  };

  const closeDetails = () => {
    setCurrentFriendId(null);
  };

  // 👉 TASK 3 - make an effect that runs after FIRST DOM surgery
  // caused by the first render only. You'll need `useEffect` from React.
  // The effect should consist of a call to the API using axios.
  // On success, set the array of friend objects from the API into state.

  // Side effects are anything that affects something outside the scope of this component. ALL side effects should be handled inside the "useEffect" react hook.

  // common side effects are network requests, direct DOM manipulations, even console logs!

  useEffect(() => {
    // fetch list of friends from the API
    axios.get(`${BASE_URL}/friends?api_key=${API_KEY}`);
  });

  let count = 0;
  useEffect(() => {
    // this is where we run the side effect
    document.title = "Side Effect ⚛️";
    count++;
    console.log("How many times have I run this effect?", count);
  });

  const Friend = (props) => (
    <div className="friend">
      {props.info.name}
      <button onClick={() => openDetails(props.info.id)}>See details</button>
    </div>
  );

  return (
    <div className="container">
      <h1>Some of my friends:</h1>
      {
        // If the initial value of `friends` state weren't an empty array,
        // this would crash due to invoking `map` method on non-array.
        // We'd need a guard against this.
        friends.map((fr) => {
          return <Friend key={fr.id} info={fr} />;
        })
      }
      {currentFriendId && (
        <Details friendId={currentFriendId} close={closeDetails} />
      )}
    </div>
  );
}
