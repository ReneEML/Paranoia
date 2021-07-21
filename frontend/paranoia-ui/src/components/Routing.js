import React from 'react'
import Home from './Home'
import Lobby from './Lobby'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route path="/lobby">
                    <Lobby />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routing;