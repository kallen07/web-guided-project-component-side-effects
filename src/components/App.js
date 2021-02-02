// WOW this file sure is empty
// ICE
import React, { useEffect, useState } from 'react';
import Details from './Details';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants/index';

// 6. component will rerender and friends slice of state will have real data in it
function App() {
  // 1. parse through and execute code from top to bottom
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const closeDetails = () => {
    setSelectedFriend(null);
  }

  const fetchFriends = () => {
    axios.get(`${BASE_URL}/friends/?api_key=${API_KEY}`)
      .then(response => {
        console.log(response);
        // 5. update our friends slice of state
        setFriends(response.data);
      })
      .catch(err => console.log(err))
  }

  // 2. queue the callbackFn but DO NOT EXECUTE THE callbackFn yet
  // 4. pull the callbackFn out of the queue, execute it
  // 7. we will not queue fetchFriends callback again because it was already queued the first time
       // because of the empty dependency array
  useEffect(fetchFriends, [])  // callback function, dependency array
  // useEffect(() => {}, [])

  const Friend = (props) => {
    return (
      <div className="friend">
        {props.friend.name}
        <button onClick={() => setSelectedFriend(props.friend.id)}>see details</button>
      </div>
    )
  }

  // 3. render the component
  return (
    <div className="container">
      <h1>My Friends:</h1>
      {
        friends.map(friend => <Friend key={friend.id} friend={friend}/>)
      }
      { selectedFriend && <Details friendId={selectedFriend} close={closeDetails} /> }
    </div>
  )
}

export default App;