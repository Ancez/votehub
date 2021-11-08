import React, { MouseEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { votehub } from 'canisters/votehub'
import { Room, RoomId, Vote } from '.dfx/local/canisters/votehub/votehub.did'
import CSS from 'csstype';
interface RoomParams {
  name: string;
}

export function RoomView() {
  const { name } = useParams<RoomParams>()
  const [room, setRoom] = useState<Room>()
  const [roomLoaded, setRoomLoaded] = useState<boolean>(false)
  const [roomNotFound, setRoomNotFound] = useState<boolean>(false)
  const [votes, setVotes] = useState<Array<Vote>>([])

  useEffect(() => {
    fetchRoom()
  }, [])

  const fetchRoom = async () => {
    const response = await votehub.getRoom(name)

    if (response[0] !== undefined) {
      setRoom(response[0])
      fetchVotes(response[0].id)
      setRoomLoaded(true)
    } else {
      setRoomNotFound(true)
    }
  }

  const fetchVotes = async (id: RoomId) => {
    // if (room) {
      const response = await votehub.getVotes(id)
      setVotes(response)
    // }
  }

  const startVoting = async () => {
    if (room) {
      const response = await votehub.startVoting(room.id)

      if (response === 'success') {
        room.state = { voting: null }
      }
    }
  }

  const vote = async (event: MouseEvent, value: string) => {
    if (room && Object.keys(room.state)[0] === 'voting') {
      let newVote: Vote = {
        name: value,
        offsetWidth: (event.nativeEvent.offsetX * 100) / event.currentTarget.clientWidth,
        offsetHeight: (event.nativeEvent.offsetY * 100) / event.currentTarget.clientHeight,
        roomId: room.id
      }

      const response = await votehub.createVote(room.id, newVote)
      fetchVotes(room.id)
    }
  }

  const iconStyles: CSS.Properties = {
    right: 0,
  };

  return (
    <div className="h-full text-center">
      <h4 className="mt-10 text-3xl font-bold tracking-tight text-gray-900">{name} Room</h4>

      {roomLoaded ? (
        <>
        <div className="mt-2 max-w-7xl mx-auto mt-24 bg-blue-400 rounded p-1 shadow-sm grid grid-cols-3 gap-1">
          <div onClick={(event) => vote(event, '1')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 p-4 text-3xl font-medium tracking-tight text-gray-900">1</h3>
            { votes.filter(v => v.name === '1').map(v => <div className="absolute" style={iconStyles}>x</div>) }
          </div>
          <div onClick={(event) => vote(event, '2')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">2</h3>
            { votes.filter(v => v.name === '2').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
          <div onClick={(event) => vote(event, '3')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">3</h3>
            { votes.filter(v => v.name === '3').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
          <div onClick={(event) => vote(event, '5')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">5</h3>
            { votes.filter(v => v.name === '5').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
          <div onClick={(event) => vote(event, '8')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">8</h3>
            { votes.filter(v => v.name === '8').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
          <div onClick={(event) => vote(event, '13')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">13</h3>
            { votes.filter(v => v.name === '13').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
          <div onClick={(event) => vote(event, '21')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">21</h3>
            { votes.filter(v => v.name === '21').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
          <div onClick={(event) => vote(event, 'infinity')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">Infinity</h3>
            { votes.filter(v => v.name === 'infinity').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
          <div onClick={(event) => vote(event, 'not_sure')} className="h-40 bg-white rounded flex items-center justify-center relative">
            <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">Not Sure</h3>
            { votes.filter(v => v.name === 'not_sure').map(v => <div className="absolute" style={iconStyles}></div>) }
          </div>
        </div>

        <div>
          <button onClick={startVoting} className="inline-flex items-center mt-4 px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
