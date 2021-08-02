import LinkButton from '../Shared/LinkButton';
import React from 'react'

const Coinflip = ({name, questioned, question, answer, coinFlipHandler}) => {

    return (
        <div>
            {questioned === name ?
                <div>
                    <h1>Flip a coin to see if the question will be revealed</h1>
                    <p>{question}</p>
                    <LinkButton name="Coinflip" onClickHandler={coinFlipHandler} />
                </div>
                :
                <h1>{questioned} answered: {answer}</h1>
            }
        </div>
    );
}

export default Coinflip;