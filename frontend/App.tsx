import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { RoomView } from "./RoomView"
import { HomeView } from "./HomeView"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room/:name" component={RoomView} />
        <Route path="/" exact component={HomeView} />
      </Switch>
    </Router>
  )
}

export default App
