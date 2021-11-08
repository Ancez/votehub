import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { votehub } from "canisters/votehub"

export function HomeView() {
  const [redirectToRoom, setRedirectToRoom] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>();

  const createRoom = async () => {
    if (roomName !== undefined && roomName.length > 2 && roomName.length < 18) {
      const response = await votehub.createRoom(roomName, { 'letscore': null })
      setRedirectToRoom(true)
    }
  }

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto text-center sm:px-6 lg:px-8 py-6 m-8">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Votehub</h1>
        <p>The voting station</p>
        <input type="text" onChange={(input) => { setRoomName(input.currentTarget.value) }} />
        <button className="bg-red-500" onClick={createRoom}>
          Create Room
        </button>
      </div>

      { redirectToRoom && <Redirect to={'/room/' + roomName} />}
    </div>
  )
}
