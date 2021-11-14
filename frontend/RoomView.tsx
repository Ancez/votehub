import React, { MouseEvent, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { votehub } from 'canisters/votehub'
import { Room, RoomId, Vote } from '.dfx/local/canisters/votehub/votehub.did'
import { Header } from "./components/Header"

interface RoomParams {
  name: string;
}

export function RoomView() {
  const { name } = useParams<RoomParams>()
  const [room, setRoom] = useState<Room>()
  const [roomLoaded, setRoomLoaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [voting, setVoting] = useState<boolean>(false)
  const [roomNotFound, setRoomNotFound] = useState<boolean>(false)
  const [votes, setVotes] = useState<Array<Vote>>([])

  const block1 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchRoom()
  }, [])

  useEffect(() => {
    if (block1.current) {
      let height = block1.current.offsetHeight;
      let width  = block1.current.offsetWidth;
    }

  }, [block1]);

  const fetchRoom = async () => {
    const response = await votehub.getRoom(name)

    if (response[0] !== undefined) {
      setRoom(response[0])
      await fetchVotes(response[0].id)
      setRoomLoaded(true)
    } else {
      setRoomNotFound(true)
    }
  }

  const fetchVotes = async (id: RoomId) => {
    const response = await votehub.getVotes(id)
    setVotes(response)
  }

  const startVoting = async () => {
    if (room) {
      setLoading(true)
      const response = await votehub.startVoting(room.id)

      if (response === 'success') {
        room.state = { voting: null }
        setLoading(false)
        setVoting(true)
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
      await fetchVotes(room.id)
    }
  }

  return (
    <div className="h-full bg-gray-800 flex flex-col justify-center items-center">
      <Header></Header>

      {voting ? (
        <div className="w-full p-4">
          <div className="h-4 text-xs flex rounded overflow-hidden bg-gray-900">
            <div style={{ width: '30%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"></div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <h4 className="m-4 text-3xl font-bold tracking-tight text-gray-100">{name}</h4>

          <button onClick={startVoting} className="bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700">
            Start Voting
          </button>
        </div>
      )}

      {roomLoaded ? (
        <>
          <div className="m-4 pl-4 pr-4 w-full h-full">
            <div className="p-2 w-full h-full bg-gray-700 rounded shadow-sm grid grid-cols-3 gap-1">
              <div ref={block1} onClick={(event) => vote(event, '1')} className="h-full bg-gray-800 bg-transparent rounded flex items-center justify-center relative">
                <h3 className="text-3xl font-medium tracking-tight">1</h3>

                { votes.filter(v => v.name === '1').map(v =>
                  <div className="absolute" style={{ left: (block1.current ? (v.offsetWidth * block1.current.clientWidth) / 100 : 1), top: block1.current ? (v.offsetHeight * block1.current.clientHeight) / 100 : 1 }}>x</div>)
                }
              </div>
              <div onClick={(event) => vote(event, '2')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">2</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === '2').map(v => 'x') }
                </div>
              </div>
              <div onClick={(event) => vote(event, '3')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">3</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === '3').map(v => 'x') }
                </div>
              </div>
              <div onClick={(event) => vote(event, '5')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">5</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === '5').map(v => 'x') }
                </div>
              </div>
              <div onClick={(event) => vote(event, '8')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">8</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === '8').map(v => 'x') }
                </div>
              </div>
              <div onClick={(event) => vote(event, '13')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">13</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === '13').map(v => 'x') }
                </div>
              </div>
              <div onClick={(event) => vote(event, '21')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">21</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === '21').map(v => 'x') }
                </div>
              </div>
              <div onClick={(event) => vote(event, 'infinity')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">Infinity</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === 'infinity').map(v => 'x') }
                </div>
              </div>
              <div onClick={(event) => vote(event, 'not_sure')} className="h-full bg-gray-800 rounded flex items-center justify-center relative">
                <h3 className="p-4 text-3xl font-medium tracking-tight">Not Sure</h3>
                <div className="absolute right-0">
                  { votes.filter(v => v.name === 'not_sure').map(v => 'x') }
                </div>
              </div>
            </div>
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
