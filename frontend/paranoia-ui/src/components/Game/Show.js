import LinkButton from '../Shared/LinkButton';
import React from 'react'

const Show = ({showQuestion, question, answer, asker, questioned, nextRoundHandler}) => {

    return (
        <div>
            {showQuestion ?
                <>
                    <h1>{asker} asked: {question}</h1>
                    <h1>{questioned} answered: {answer}</h1>
                </>
                :
                <>
                   <h1>{questioned} answered: {answer}</h1> 
                   <h1>We'll never know the question...</h1>
                </>
            }
            <LinkButton name="Next Round" onClickHandler={nextRoundHandler} />
        </div>
    );
}

export default Show;