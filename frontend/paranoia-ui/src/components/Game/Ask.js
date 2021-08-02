import { TextField } from '@material-ui/core';
import LinkButton from '../Shared/LinkButton';
import React from 'react'

const Ask = ({asker, name, questioned, questionInput, handleQuestionInput, askQuestionHandler}) => {
    return (
        <div>
            {asker === name ? 
                <div>
                    <h1>Ask {questioned} a question:</h1>
                    <TextField id="standard-basic" label="Standard" value={questionInput} onChange={handleQuestionInput}/>
                    <LinkButton name="ask" onClickHandler={askQuestionHandler} />
                </div>
                 : 
                 <h1>Waiting for {asker} to ask {questioned} a question.</h1>
            }
        </div>
    );
}

export default Ask;