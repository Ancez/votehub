import React from "react"
import { Room } from "./Room"
import { Home } from "./Home"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/room/:name" component={Room} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  )
}

export default App
