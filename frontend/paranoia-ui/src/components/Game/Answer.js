import { MenuItem, TextField, Grid } from '@material-ui/core';
import LinkButton from '../Shared/LinkButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react'

const Answer = ({ asker, name, questioned, question, answerInput, handleAnswerInput, answerQuestionHandler, players }) => {
    return (
        <>
            {questioned === name ?
                <>
                    <Grid item xs={12}>
                        <h1>Answer {asker}'s question:</h1>
                        <p>{question}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Answer"
                            value={answerInput}
                            onChange={handleAnswerInput}
                            helperText="Please select your answer"
                        >
                            {players.filter(player => (player.playerName != questioned && player.playerName != asker))
                                .map((option) => (
                                    <MenuItem key={option.playerName} value={option.playerName}>
                                        {option.playerName}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <LinkButton name="answer" onClickHandler={answerQuestionHandler} />
                    </Grid>
                </>
                :
                <>
                    <Grid item xs={12}>
                        <h1>Waiting for {questioned} to answer {asker}'s question.</h1>
                        <CircularProgress />
                    </Grid>
                    
                </>
            }
        </>
    );
}

export default Answer;