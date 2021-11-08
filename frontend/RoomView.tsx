import React, { MouseEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { votehub } from 'canisters/votehub'
import { Room, RoomParams } from './types/Room'
import { Vote } from './types/Vote'

export function RoomView() {
  const { name } = useParams<RoomParams>()
  const [room, setRoom] = useState<Room>()
  const [roomLoaded, setRoomLoaded] = useState<boolean>(false)
  const [roomNotFound, setRoomNotFound] = useState<boolean>(false)

  useEffect(() => {
    fetchRoom()
  }, [])

  const fetchRoom = async () => {
    const response = await votehub.getRoom(name)

    if (response[0] !== undefined) {
      setRoom(response[0])
      setRoomLoaded(true)
    } else {
      setRoomNotFound(true)
    }
  }

  const vote = async (event: MouseEvent, value: string) => {
    if (room) {
      let vote: Vote = {
        name: value,
        offsetWidth: (event.nativeEvent.offsetX * 100) / event.currentTarget.clientWidth,
        offsetHeight: (event.nativeEvent.offsetY * 100) / event.currentTarget.clientHeight,
        roomId: room.id
      }

      const response = await votehub.createVote(room.id, vote)
      console.log(response)
    }
  }

  return (
    <div className="h-full text-center">
      <h4 className="mt-10 text-3xl font-bold tracking-tight text-gray-900">{name}</h4>

      {roomLoaded ? (
        <>
        <div className="mt-2 max-w-7xl mx-auto mt-24 bg-blue-400 rounded p-1 shadow-sm grid grid-cols-3 gap-1">
          <div onClick={(event) => vote(event, '1')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 p-4 text-3xl font-medium tracking-tight text-gray-900">1</h3>
          </div>
          <div onClick={(event) => vote(event, '2')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">2</h3>
          </div>
          <div onClick={(event) => vote(event, '3')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">3</h3>
          </div>
          <div onClick={(event) => vote(event, '5')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">5</h3>
          </div>
          <div onClick={(event) => vote(event, '8')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">8</h3>
          </div>
          <div onClick={(event) => vote(event, '13')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">13</h3>
          </div>
          <div onClick={(event) => vote(event, '21')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">21</h3>
          </div>
          <div onClick={(event) => vote(event, 'infinity')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">Infinity</h3>
          </div>
          <div onClick={(event) => vote(event, 'not_sure')} className="h-40 bg-white rounded flex items-center justify-center">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">Not Sure</h3>
          </div>
        </div>

        <div>
          <button className="inline-flex items-center mt-4 px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Start Voting
          </button>
        </div>
        </>
      ) : loadingText(roomNotFound)}
    </div>
    )
}

function loadingText(roomNotFound: boolean) {
  if (roomNotFound) {
    return <div>Room Not Found</div>
  } else {
    return <div>Loading Room</div>
  }
}
