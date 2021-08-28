import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinkButton from '../Shared/LinkButton';
import React from 'react'

const Coinflip = ({ name, questioned, question, answer, coinFlipHandler }) => {

    return (
        <>
            {questioned === name ?
                <>
                    <Grid item xs={12}>
                        <h1>Flip a coin to see if the question will be revealed</h1>
                        <p>{question}</p>
                    </Grid>
                    <Grid item xs={12}>
                        <LinkButton name="Coinflip" onClickHandler={coinFlipHandler} />
                    </Grid>

                </>
                :
                <>

                    <Grid item xs={12}>
                        <h1>{questioned} answered: {answer}</h1>
                        <CircularProgress />
                    </Grid>
                </>
            }
        </>
    );
}

export default Coinflip;