import { MenuItem, TextField } from '@material-ui/core';
import LinkButton from '../Shared/LinkButton';
import React from 'react'

const Answer = ({ asker, name, questioned, question, answerInput, handleAnswerInput, answerQuestionHandler, players }) => {

    return (
        <div>
            {questioned === name ?
                <div>
                    <h1>Answer {asker}'s question:</h1>
                    <p>{question}</p>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Answer"
                        value={answerInput}
                        onChange={handleAnswerInput}
                        helperText="Please select your answer"
                    >
                        {players.filter(player => (player.playerName != questioned && player.playerName != asker)).map((option) =>(
                            <MenuItem key={option.playerName} value={option.playerName}>
                                {option.playerName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <LinkButton name="answer" onClickHandler={answerQuestionHandler} />
                </div>
                :
                <h1>Waiting for {questioned} to answer {asker}'s question.</h1>
            }
        </div>
    );
}

export default Answer;