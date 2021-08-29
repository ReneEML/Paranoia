import React, { useState } from 'react'
import LinkButton from '../Shared/LinkButton'
import CustomTextField from '../Shared/CustomTextField';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import {
    joinGame,
    createGame,
    selectLoading

} from '../../reducers/playerSlice';
import useStyles from '../../styles/Styles';

const JoiningLobby = ({ isCreate }) => {
    const styles = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [gameId, setGameId] = useState("");
    const loading = useSelector(selectLoading);

    const handleNameChange = (val) => {
        setName(val);
    }

    const handleGameIdChange = (val) => {
        setGameId(val);
    }

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
                            <h1>Create Room</h1> :
                            <h1>Join Room</h1>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            label="Name"
                            value={name}
                            onChangeHandler={handleNameChange}
                        />
                    </Grid>
                    {!isCreate ?
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                label="Game Id"
                                value={gameId}
                                onChangeHandler={handleGameIdChange}
                            />
                        </Grid>
                        :
                        <> </>
                    }
                    <Grid item xs={12} 
                        >

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