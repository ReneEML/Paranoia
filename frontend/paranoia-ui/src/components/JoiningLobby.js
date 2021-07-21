import React from 'react'
import LinkButton from './LinkButton'
import { TextField } from '@material-ui/core';
import { useHistory } from "react-router";
const JoiningLobby = ({ isCreate }) => {

    const history = useHistory();

    const handleCreate = async () => {

        history.push("/lobby");
    }
    const handleJoin = async () => {
        history.push("/lobby");
    }

    return (
        <div>
            <h>Paranoia</h>
            <div>
                <TextField label="Name"></TextField>
                {!isCreate ?
                    <TextField label="Game ID"></TextField>
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