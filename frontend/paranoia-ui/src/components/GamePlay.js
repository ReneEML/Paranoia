import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Stomp from "stompjs";
import LinkButton from './LinkButton';
import { URL } from '../app/constants';
import {
    selectGameId,
    selectPlayerName,
} from '../reducers/playerSlice';
import SockJs from 'sockjs-client';
import { POST } from '../app/requests';

const GamePlay = () => {
    const gameId = useSelector(selectGameId);
    const name = useSelector(selectPlayerName);
    const [stompClient, setStompClient] = useState(null);
    const [players, setPlayers] = useState([]);
    const [phase, setPhase] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [show, setShow] = useState(false);
    const [asker, setAsker] = useState("");
    const [questioned, setQuestioned] = useState("");

    const connectToSocket = () => {
        let socketEndpoint = URL + '/paranoia';
        const socket = new SockJs(socketEndpoint);
        let stomp = Stomp.over(socket);
        stomp.connect({}, (frame) => {
            let endpoint = '/topic/gameplay/' + gameId;
            stomp.subscribe(endpoint, (response) => {
                let data = JSON.parse(response.body);
                setPlayers(data.players);
                setPhase(data.phase);
                setAnswer(data.answer);
                setQuestion(data.question);
                setShow(data.showAnswer);
                setAsker(data.asker.playerName);
                setQuestioned(data.questioned.playerName);
            });
        })
        setStompClient(stomp);

    }

    useEffect(() => {
        connectToSocket();
        POST('/game/get', { gameId: gameId }).then(data => {
            if(data && data !== undefined){
                setPlayers(data.players);
                setPhase(data.phase);
                setAnswer(data.answer);
                setQuestion(data.question);
                setShow(data.showAnswer);
                setAsker(data.asker.playerName);
                setQuestioned(data.questioned.playerName);
            }
        });

    }, [])
    const askQuestion = () => {
        const data = {
            question: "Who is the best at calisthenics?",
            gameId: gameId
        }
        stompClient.send("/app/ask", {}, JSON.stringify(data))
    }

    const answerQuestion = () => {
        const data = {
            answer: "Abdulla :)",
            gameId: gameId
        }
        stompClient.send("/app/answer", {}, JSON.stringify(data))
    }

    const showQuestion = () => {
        const data = {
            gameId: gameId
        }
        stompClient.send("/app/show", {}, JSON.stringify(data))
    }

    return (
        <div>
            <p>Game: {gameId}</p>
            <p>Username: {name}</p>
            <p>phase: {phase}</p>
            <p>question: {question}</p>
            <p>answer: {answer}</p>
            <p>show: {show.toString()}</p>
            <p>questioned: {questioned}</p>
            <p>asker: {asker}</p>

            {phase === "ASK" ? <LinkButton name="ask" onClickHandler={askQuestion} /> : <></>}
            {phase === "ANSWER" ?  <LinkButton name="answer" onClickHandler={answerQuestion} /> : <></>}
            {phase === "SHOW" ? <LinkButton name="show" onClickHandler={showQuestion} /> : <></>}
            {players.map(x => <p>{x.playerName}</p>)}
        </div>
    );
}

export default GamePlay;