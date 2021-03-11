import React from 'react';
import {AnswerObject} from '../App'
import styled from 'styled-components'

type Props={
    question:string;
    answers:string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswer:AnswerObject | undefined;
    questionNr: number;
    totalQuestions:number;
}

const QuestionCard: React.FC<Props> =({question,answers, callback, userAnswer, questionNr, totalQuestions})=>(
    <Wrapper>
        <p className="number">
            Question:{questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html:question}}/>
        <div>
            {answers.map(ans=>(
                <ButtonWrapper correct={userAnswer?.answer===ans} userClick={userAnswer?.answer===ans} key={ans}>
                    <button disabled={userAnswer ? true: false} value={ans} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:ans}} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
)

export default QuestionCard;


const Wrapper=styled.div`
    max-width:1100px;
    background:#ebfeff;
    border-radius:10px;
    border:2px solid #0085a3;
    padding:20px;
    box-shadow:0px 5px 10px rgba(0,0,0,0.25);
    text-align:center;

    p{
        font-size:1rem;
    }

`

type ButtonWrapperProps={
    correct:boolean;
    userClick:boolean;
}

const ButtonWrapper=styled.div<ButtonWrapperProps>`
    transition:all 0.3s ease;
    :hover{
        opacity:0.8;
    }

    button{
        cursor:pointer;
        user-select:none;
        font-size:0.8rem;
        width:100%;
        height:40px;
        margin:5px 0;
        background: ${({correct, userClick})=>correct ? 'linear-gradient(180deg,white,gray)':(!correct && userClick) ? 'linear-gradient(90deg,#ff5656,#c16868)':'linear-gradient(90deg,#56ccff,#6eafb4)'};
        border:3px solid #ffff;
        box-shadow: 1px 2px 0px rgba(0,0,0,0.1)
        border-radius:10px;
        text-shadow:0px 1px 0px rgba(0,0,0,0.25)
    }
`