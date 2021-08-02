import React from 'react';
import Home from '../Home/Home';
import Lobby from '../Lobby/Lobby';
import JoiningLobby from '../Lobby/JoiningLobby';
import GamePlay from '../Game/GamePlay';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route path="/join">
                    <JoiningLobby isCreate={false} />
                </Route>
                <Route path="/create">
                    <JoiningLobby isCreate={true} />
                </Route>
                <Route path="/lobby">
                    <Lobby />
                </Route>
                <Route path="/game">
                    <GamePlay />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routing;