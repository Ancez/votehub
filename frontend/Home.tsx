import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { votehub } from "canisters/votehub"

export function Home() {
  const [roomId, setRoomId] = useState<string>()

  const createRoom = async () => {
    const room = await votehub.createRoom('test', { letscore: null })
    setRoomId('/room/test')
  }

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6 bg-white m-8 rounded shadow-sm">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Welcome to</h1>
        <button className="bg-red-500" onClick={createRoom}>
          Create Room
        </button>
      </div>

      { roomId && <Redirect to={roomId} />}
    </div>
  )
}