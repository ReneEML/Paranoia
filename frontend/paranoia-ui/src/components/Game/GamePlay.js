import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Stomp from "stompjs";
import { Container, Grid, makeStyles } from '@material-ui/core';
import { URL } from '../../app/constants';
import {
    selectGameId,
    selectPlayerName,
} from '../../reducers/playerSlice';
import SockJs from 'sockjs-client';
import { POST } from '../../app/requests';
import Ask from './Ask';
import Answer from './Answer';
import Coinflip from './Coinflip';
import Show from './Show';

const useStyles = makeStyles({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    }
});


const GamePlay = () => {
    const styles = useStyles();
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
    const [questionInput, setQuestionInput] = useState("");
    const [answerInput, setAnswerInput] = useState("");
    // TODO: At beginning of round subscribe to different endpoint based on role (ASKER, QUESTIONED, SPECTATOR)
    // This will make it so that the question and answer are not sent to the client if they are a spectator.
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
            if (data && data !== undefined) {
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
        if (questionInput && questionInput !== undefined) {
            const data = {
                question: questionInput,
                gameId: gameId
            };
            setQuestionInput("");
            stompClient.send("/app/ask", {}, JSON.stringify(data));
        }
    }

    const answerQuestion = () => {
        if (answerInput && answerInput !== undefined) {
            const data = {
                answer: answerInput,
                gameId: gameId
            };
            setAnswerInput("");
            stompClient.send("/app/answer", {}, JSON.stringify(data));
        }

    }

    const coinFlip = () => {
        const data = {
            gameId: gameId
        }
        stompClient.send("/app/show", {}, JSON.stringify(data))
    }

    const nextRound = () => {
        const data = {
            gameId: gameId
        }
        stompClient.send("/app/next", {}, JSON.stringify(data))
    }

    const handleQuestionInput = (e) => setQuestionInput(e.target.value);

    const handleAnswerInput = (e) => setAnswerInput(e.target.value);

    return (
        <Container className={styles.container}>


            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12}>
                    <p>Game: {gameId}</p>
                    <p>Username: {name}</p>
                </Grid>
                {
                    phase === "ASK" ?
                        <Ask
                            asker={asker}
                            name={name}
                            questioned={questioned}
                            questionInput={questionInput}
                            handleQuestionInput={handleQuestionInput}
                            askQuestionHandler={askQuestion}
                        />
                        : <></>
                }
                {
                    phase === "ANSWER" ?
                        <Answer
                            asker={asker}
                            name={name}
                            questioned={questioned}
                            answerInput={answerInput}
                            handleAnswerInput={handleAnswerInput}
                            answerQuestionHandler={answerQuestion}
                            players={players}
                            question={question}
                        />
                        : <></>
                }
                {
                    phase === "COINFLIP" ?
                        <Coinflip
                            name={name}
                            questioned={questioned}
                            question={question}
                            answer={answer}
                            coinFlipHandler={coinFlip}
                        />

                        : <></>
                }
                {
                    phase === "SHOW" ?
                        <Show
                            showQuestion={show}
                            question={question}
                            answer={answer}
                            asker={asker}
                            questioned={questioned}
                            nextRoundHandler={nextRound}
                        />
                        : <></>
                }
            </Grid>
        </Container>
    );
}

export default GamePlay;