import React, { useState } from 'react'
import LinkButton from '../Shared/LinkButton'
import { TextField } from '@material-ui/core';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import {
    joinGame,
    createGame,
    selectLoading

} from '../../reducers/playerSlice';
import { POST } from '../../app/requests';

const JoiningLobby = ({ isCreate }) => {

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
        <div>
            <h>Paranoia</h>
            <div>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)}></TextField>
                {!isCreate ?
                    <TextField label="Game ID" value={gameId} onChange={(e) => setGameId(e.target.value)}></TextField>
                    :
                    <> </>
                }
            </div>
            {isCreate ?
                <LinkButton name="Create" onClickHandler={handleCreate} />
                :
                <LinkButton name="Join" onClickHandler={handleJoin} />
            }
        </div>
    )
}

export default JoiningLobby;