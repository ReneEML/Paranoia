import React, { useState, useEffect } from 'react'
import LinkButton from '../Shared/LinkButton'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../../styles/home.css';
import { Box } from '@material-ui/core';
import { useHistory } from "react-router";
import {
    selectGameId,
    selectPlayerName,
} from '../../reducers/playerSlice';
import { URL } from '../../app/constants';
import { useSelector } from 'react-redux';
import { POST } from '../../app/requests';
import Stomp from "stompjs";
import SockJs from 'sockjs-client';

const Lobby = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const gameId = useSelector(selectGameId);
    const playerName = useSelector(selectPlayerName);
    const [players, setPlayers] = useState({});

    const connectToSocket = () => {
        let socketEndpoint = URL + '/paranoia';
        const socket = new SockJs(socketEndpoint);
        let stomp = Stomp.over(socket);
        stomp.connect({}, (frame) => {
            let start = '/topic/start/' + gameId;
            let player = '/topic/players/' + gameId;
            stomp.subscribe(start, () => history.push('/game'));
            stomp.subscribe(player, (response) => {
                let json = JSON.parse(response.body);
                if (json !== undefined && json.players !== undefined) {
                    setPlayers(json.players);
                }
            });
        });

    }

    const startHandler = () => {
        POST('/game/start', { gameId: gameId })
            .then(history.push('/game'))
            .catch((e) => console.log(e));
    }
    const leaveHandler = () => {
        history.push('/');
    }

    useEffect(() => {
        if (gameId && gameId !== undefined) {
            POST('/game/get', { gameId: gameId }).then(response => {
                if (response !== undefined && response.players !== undefined) {
                    console.log(response.players);
                    setPlayers(response.players);
                    setIsLoading(false);
                }
            });
            connectToSocket();
        }
    }
        , [gameId])
    return (
        <div className="homepage" >
            <h>Name: {playerName}</h>
            <h>GameId: {gameId}</h>
            <Box width="50%">
                {!isLoading ?
                    <TableContainer component={Paper} width="600">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Players</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players.map((row) => (
                                    <TableRow>
                                        <TableCell align="center">{row.playerName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <>
                        Loading
                    </>
                }
            </Box>
            {players.length > 4 ? 
                
                <LinkButton name="start" onClickHandler={startHandler} />
                : 
                <h1>Waiting for at least 5 players.</h1>
            }
            <LinkButton name="leave" onClickHandler={leaveHandler} />
        </div>
    );
}

export default Lobby;