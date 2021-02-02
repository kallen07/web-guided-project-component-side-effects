import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  // 👉 TASK 4 - Create a side effect 🥇 that runs only after first render.
  // see App.js

  // 👉 TASK 5 - Create a side effect 👻 that runs only after first render
  // and puts a 'click' event handler on document.
  // See what happens if we don't clean up.

  useEffect(() => {
    const consoleEventListener = () => {
      console.log("you clicked me!")
    }
    document.addEventListener("click", consoleEventListener)

    return () => {
      document.removeEventListener('click', consoleEventListener)
    }
  }, [friendId])


  // 👉 TASK 6 - Create a side effect 🥵 that runs after every render.
  // We pretty much never want to do this, but it would be
  // note the missing dependency array
  // useEffect(() => {
  //   console.log("i run after every render")
  // })

  // 👉 TASK 7 - Create a side effect 📲 that runs when a particular variable changes:
  // Whenever props.friendId updates we should trigger a fetch for details of the friend.
  // The URL should end up looking like `http://localhost:4000/friends/1?api_key=xyz`
  // On success, put the details of the friend in `details` slice of state
  
  const fetchDetails = () => {
    axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
      .then(response => {
        console.log(response)
        setDetails(response.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(fetchDetails, [friendId]);

  return (
    <div className='container'>
      <h2>Details (of friend with id {friendId}):</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
