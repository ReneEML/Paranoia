import React from 'react';
import LinkButton from '../Shared/LinkButton'
import '../../styles/home.css';
import { useHistory } from "react-router";
const Home = () => {
    const history = useHistory();
    const createHandler = () => {
        history.push("/create");
    }
    const joinHandler = () => {
        history.push("/join");
    }
    return (
        <div className="homepage">
            <h id="title">Paranoia</h>

            <div className="buttondiv">
                <LinkButton name="Create Room" onClickHandler={createHandler}/>
                <LinkButton name="Join Room" onClickHandler={joinHandler}/>
            </div>
        </div>
    );
}

export default Home;