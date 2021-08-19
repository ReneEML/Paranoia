import React, { useState } from 'react'
import LinkButton from '../Shared/LinkButton'
import { TextField, Container, Grid } from '@material-ui/core';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import {
    joinGame,
    createGame,
    selectLoading

} from '../../reducers/playerSlice';
import { POST } from '../../app/requests';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../Shared/Header';


const useStyles = makeStyles({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    }
});


const JoiningLobby = ({ isCreate }) => {
    const styles = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [gameId, setGameId] = useState("");
    const loading = useSelector(selectLoading);

    const handleCreate = async () => {
        const data = {
            playerName: name,
            playerType: 0
        };

        dispatch(createGame(data));
        history.push("/lobby");

    }

    const handleJoin = async () => {
        let data = {
            player: {
                playerName: name,
                playerType: 0
            },
            gameId: gameId,
        };
        dispatch(joinGame(data));
        history.push("/lobby");

    }

    return (
        <>
            <Container className={styles.container}>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        {isCreate ?
                            <h1>Creating Game</h1> :
                            <h1>Joining Game</h1>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant='outlined'
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} direction="row"
                        justifyContent="center"
                        alignItems="flex-start">

                        {!isCreate ?
                            <TextField
                                label="Game ID"
                                value={gameId}
                                onChange={(e) => setGameId(e.target.value)}
                                variant='outlined'
                            />
                            :
                            <> </>
                        }

                    </Grid>
                    <Grid item xs={12} direction="row"
                        justifyContent="center"
                        alignItems="flex-start">

                        {isCreate ?
                            <LinkButton name="Create" onClickHandler={handleCreate} />
                            :
                            <LinkButton name="Join" onClickHandler={handleJoin} />
                        }

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default JoiningLobby;