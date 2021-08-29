import { MenuItem, Select, Grid, FormControl, InputLabel } from '@material-ui/core';
import LinkButton from '../Shared/LinkButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react'
import CustomTextField from '../Shared/CustomTextField';
import useStyles from '../../styles/Styles';

const Answer = ({ asker, name, questioned, question, answerInput, handleAnswerInput, answerQuestionHandler, players }) => {
    const styles = useStyles();
    return (
        <>
            {questioned === name ?
                <>
                    <Grid item xs={12}>
                        <h1>Answer {asker}'s question:</h1>
                        <p>{question}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            className={styles.formControl}
                            variant='filled'
                        >
                            <InputLabel
                                color='primary'
                                className={styles.label}
                            >
                                Answer
                            </InputLabel>
                            <Select
                                value={answerInput}
                                onChange={handleAnswerInput}
                                //className={styles.select}
                                classes={{root: styles.input}}
                            >
                                {players.filter(player => (player.playerName != questioned && player.playerName != asker))
                                    .map((option) => (
                                        <MenuItem key={option.playerName} value={option.playerName}>
                                            {option.playerName}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <LinkButton name="Submit" onClickHandler={answerQuestionHandler} />
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