import React, { useState, useEffect } from 'react'
import LinkButton from './LinkButton'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/home.css';
import { Box } from '@material-ui/core';
import { useHistory } from "react-router";
import {
    selectGameId,
    selectPlayerName,
} from '../reducers/playerSlice';
import { useSelector } from 'react-redux';
import { POST } from '../app/requests';

const Lobby = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const gameId = useSelector(selectGameId);
    const playerName = useSelector(selectPlayerName);
    const [players, setPlayers] = useState({});

    const startHandler = () => {
        history.push('/game');
    }
    const leaveHandler = () => {
        history.push('/');
    }

    useEffect(() => {
        POST('/game/get', {gameId: gameId}).then(response => {
            if(response !== undefined && response) {
                setPlayers(response.players.map(x => x.playerName));
                setIsLoading(false);
            }
        });
        
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
                                        <TableCell align="center">{row}</TableCell>
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
            <LinkButton name="start" onClickHandler={startHandler} />
            <LinkButton name="leave" onClickHandler={leaveHandler} />
        </div>
    );
}

export default Lobby;