import React from 'react';
import LinkButton from '../Shared/LinkButton'
import '../../styles/home.css';
import { useHistory } from "react-router";
import { Container, Grid, makeStyles } from '@material-ui/core';
import useStyles from '../../styles/Styles'

const Home = () => {
    const styles = useStyles();
    const history = useHistory();
    const createHandler = () => {
        history.push("/create");
    }
    const joinHandler = () => {
        history.push("/join");
    }
    return (
        <Container 
            className={styles.container} 
            >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                height
            >
                <Grid item xs={12}>
                    <h1 className={styles.title}>PARANOIA</h1>
                </Grid>
                <Grid item xs={12}>
                    <LinkButton name="Create Room" onClickHandler={createHandler} />
                    <LinkButton name="Join Room" onClickHandler={joinHandler} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;