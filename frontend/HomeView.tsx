import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { votehub } from "canisters/votehub"
import { Header } from "./components/Header"

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
    <div className="h-full bg-gray-800 flex flex-col justify-center items-center">
      <Header></Header>

      <div className="my-4">
        <div className="relative border border-indigo-600 text-white rounded-md px-3 py-2 shadow-sm focus-within:border-gray-600">
          <label className="absolute -top-2 left-2 -mt-px inline-block bg-gray-800 px-1 text-xs font-medium">Your room name</label>
          <input type="text"
                 onChange={(input) => { setRoomName(input.currentTarget.value) }}
                 className="block w-full bg-gray-800 outline-none sm:text-sm" />
        </div>
        <button onClick={createRoom} className="w-full mt-4 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700">Create Room</button>
      </div>

      { redirectToRoom && <Redirect to={'/room/' + roomName} />}
    </div>
  )
}
