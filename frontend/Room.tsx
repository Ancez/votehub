import React, { MouseEvent, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { votehub } from "canisters/votehub"


export class Room extends React.Component<RouteComponentProps<any>> {
  async componentDidMount() {
    const room = await votehub.getRoom('test')
    console.log(room)
  }

  async vote(event: MouseEvent, value: string) {
    const room = await votehub.vote(this.props.match.params.name, event.nativeEvent.offsetX, event.nativeEvent.offsetY)
    console.log(room)
  }

  startVoting() {

  }

  render() {
    return (
    <div className="h-full text-center">
      <h3 className="mt-10 text-3xl font-bold tracking-tight text-gray-900">Room</h3>
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">{this.props.match.params.id}</h2>

      <div className="mt-2 max-w-7xl mx-auto mt-24 bg-blue-400 rounded p-1 shadow-sm grid grid-cols-3 gap-1">
        <div onClick={(event) => this.vote(event, '1')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 p-4 text-3xl font-medium tracking-tight text-gray-900">1</h3>
        </div>
        <div onClick={(event) => this.vote(event, '2')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">2</h3>
        </div>
        <div onClick={(event) => this.vote(event, '3')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">3</h3>
        </div>
        <div onClick={(event) => this.vote(event, '5')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">5</h3>
        </div>
        <div onClick={(event) => this.vote(event, '8')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">8</h3>
        </div>
        <div onClick={(event) => this.vote(event, '13')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">13</h3>
        </div>
        <div onClick={(event) => this.vote(event, '21')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">21</h3>
        </div>
        <div onClick={(event) => this.vote(event, 'infinity')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">Infinity</h3>
        </div>
        <div onClick={(event) => this.vote(event, 'not_sure')} className="h-40 bg-white rounded flex items-center justify-center">
          <h3 className="p-4 text-3xl font-medium	 tracking-tight text-gray-900">Not Sure</h3>
        </div>
      </div>

      <div>
        <button
         className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Start Voting
        </button>
      </div>
    </div>
    )
  }
}