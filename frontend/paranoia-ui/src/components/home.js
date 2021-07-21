import React from 'react';
import LinkButton from './LinkButton'
import '../styles/home.css';

const Home = () => {
    return (
        <div className="homepage">
            <h id="title">Paranoia</h>

            <div className="buttondiv">
                <LinkButton name="Create Room" path="/lobby"/>
                <LinkButton name="Join Room" path="/lobby"/>
            </div>
        </div>
    );
}

export default Home;