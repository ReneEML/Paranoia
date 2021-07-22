import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import Stomp from "stompjs";
import LinkButton from './LinkButton';
import {
    selectGameId,
    selectUserName,
    se
} from '../reducers/userSlice'

import SockJs from 'sockjs-client'

const GamePlay = () => {
    const [stompClient, setStompClient] = useState(null);
    const [gameId, setGameId] = useState("");
    const [game, setGame] = useState({});
    const url = "http://localhost:8080";

    const connectToSocket = () => {
        const socket = new SockJs(`http://localhost:8080/paranoia`);
        let stomp = Stomp.over(socket);
        stomp.connect({}, (frame) => {
            console.log("connected " + frame);
            console.log(gameId);
            let endpoint = '/topic/gameplay/' + gameId;
            stomp.subscribe(endpoint, (response) =>{
                console.log(JSON.parse(response.body).content);
            });
        })
        setStompClient(stomp);
        
    }

    useEffect(() => {
        setGameId("84dea7e5-9847-42e4-b8d8-bbccd5604176")
        connectToSocket();
    }, [])
    const askQuestion = () => {
        const data = {
            question: "Who is the best at calisthenics?",
            gameId: gameId
        }
        stompClient.send("/app/ask",{}, JSON.stringify(data))
    }

    const answerQuestion = () => {
        const data = {
            answer: "Abdulla :)",
            gameId: gameId
        }
        stompClient.send("/app/answer",{}, JSON.stringify(data))
    }

    const showQuestion = () => {
        const data = {
            gameId: gameId
        }
        stompClient.send("/app/show",{}, JSON.stringify(data))
    }
    return (
        <div>
            <LinkButton name="ask" onClickHandler={askQuestion} />
            <LinkButton name ="answer" onClickHandler={answerQuestion} />
            <LinkButton name ="show" onClickHandler={showQuestion} />
        </div>
    );
}

export default GamePlay;