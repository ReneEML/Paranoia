import { TextField, Grid } from '@material-ui/core';
import LinkButton from '../Shared/LinkButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react'

const Ask = ({ asker, name, questioned, questionInput, handleQuestionInput, askQuestionHandler }) => {
    return (
        <>
            {asker === name ?
                <>
                    <Grid item xs={12}>
                        <h1>Ask {questioned} a question:</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Standard" value={questionInput} onChange={handleQuestionInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <LinkButton name="ask" onClickHandler={askQuestionHandler} />
                    </Grid>
                </>
                :
                <Grid item xs={12}>
                    <h1>Waiting for {asker} to ask {questioned} a question.</h1>
                    <CircularProgress />
                </Grid>
                
            }
        </>
    );
}

export default Ask;