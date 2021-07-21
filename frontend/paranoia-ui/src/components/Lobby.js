import React, { useState, useEffect } from 'react'
import LinkButton from './LinkButton'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../styles/home.css';
import { Box } from '@material-ui/core';


const Lobby = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [gameId, setGameId] = useState('');
    const [players, setPlayers] = useState({});
    const createUrl = "http://localhost:8080/game/create";
    const createGame = async (url = '', data = {}) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, requestOptions)
        .then(res => res.json())
        .then(res => {
            setPlayers(res.players.map(x => x.login));
            setGameId(res.gameId);
            setIsLoading(false);
        });
    }
    const classes = makeStyles();
    useEffect(() => {
        const data = {
            login: "Abdulla",
            type: 2
        }
        createGame(createUrl, data);

        
    }, [])
    return (
        <div className="homepage" >
            <Box width="50%">
                {!isLoading ?
                    <TableContainer component={Paper} width="600">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Players - {gameId}</TableCell>
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
            <LinkButton name="start" path="/game" />
            <LinkButton name="leave" path="/" />
        </div>
    );
}

export default Lobby;