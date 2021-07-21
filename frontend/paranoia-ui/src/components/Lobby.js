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
import { useHistory } from "react-router";


const Lobby = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [gameId, setGameId] = useState('');
    const [players, setPlayers] = useState({});

    const startHandler = () => {
        history.push('/game');
    }
    const leaveHandler = () => {
        history.push('/');
    }

    useEffect(() => {
        setPlayers([
            "joe",
            "mama",
            "ligma",
            "sigma",
            "sugandese",
            "melone brown",
            "omlette",
            "candice"
        ]);
        setIsLoading(false);
    }
        , [])
    return (
        <div className="homepage" >
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