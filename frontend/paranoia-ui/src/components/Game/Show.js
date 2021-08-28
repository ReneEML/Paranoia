import { Grid } from '@material-ui/core';
import LinkButton from '../Shared/LinkButton';
import React from 'react'

const Show = ({ showQuestion, question, answer, asker, questioned, nextRoundHandler }) => {

    return (
        <div>
            {showQuestion ?
                <>
                    <Grid item xs={12}>
                        <h1>{asker} asked: {question}</h1>
                        <h1>{questioned} answered: {answer}</h1>
                    </Grid>

                </>
                :
                <>
                    <Grid item xs={12}>
                        <h1>{questioned} answered: {answer}</h1>
                        <h1>We'll never know the question...</h1>
                    </Grid>

                </>
            }
            <Grid item xs={12}>
                <LinkButton name="Next Round" onClickHandler={nextRoundHandler} />
            </Grid>

        </div>
    );
}

export default Show;