import React, { useState } from 'react'

const GamePlay = () => {
    const [phase, setPhase] = useState("");
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);

    const askPhase = () => {
        if (type === "ASKER") {
            return (
                <div>
                    <p>enter question</p>
                </div>
            );
        }
        return (
            <div>
                <p>Player x is asking a question</p>
            </div>
        );
    }

    const answerPhase = () => {
        if (type === "QUESTION") {
            return (
                <div>
                    <p>answer question</p>
                </div>
            );
        }
        return (
            <div>
                <p>Player x is answering a question</p>
            </div>
        );
    }

    const showPhase = () => {
        return (<div>
            {show ?
                <p>Showing question</p>
                :
                <p>Not showing question</p>
            }
        </div>)
    }

    const displayPhase = () => {
        if (phase === "ASK") {
            return askPhase();
        }
        else if (phase === "ANSWER") {
            return answerPhase();
        }
        else if (phase === "SHOW") {
            return showPhase();
        }
        return <div>Error not in any specified game phase</div>
    }
    return (
        <div>
            {displayPhase()}
        </div>
    );
}

export default GamePlay;