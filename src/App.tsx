import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard';
import {Difficulty, QuestionState} from './API'
import {FetchQuiz} from './API'
import {Style, Wrapper} from './App.styles'

export type AnswerObject={
  question:string;
  answer: string;
  correct:boolean;
  correctAnswer:string;
}

const TOTAL=5;

const App=()=> {
  const [loading,setLoading]=useState(false);
  const [questions,setQuestions]=useState<QuestionState[]>([]);
  const [number, setNumber]=useState(0);
  const [correct,setCorrect]=useState<boolean>(true)
  const [userAnswer,setUserAnswer]=useState<AnswerObject[]>([]);
  const [score,setScore]=useState(0);
  const [gameOver,setGameOver]=useState(true);

  const startTrivia = async()=>{
    setLoading(true);
    setGameOver(false);

    const newQuestions = await FetchQuiz(TOTAL,Difficulty.EASY)
    //Refresh every data in the state.
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }
  
  const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>)=>{
    if (!gameOver){
      const answer=e.currentTarget.value;
      //Check answer with the correct value
      const correct=questions[number].correct_answer===answer;
      //Adding score
      if (correct){
        setCorrect(true)
        setScore(prev=>prev+1);
      }else{
        setCorrect(false)
      }
      //Save to state
      const answerObject={
        question: questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      };
      setUserAnswer(prev=>[...prev, answerObject])
    }
  }
  
  const nextQuestion=()=>{
    setCorrect(true);
    const nextQuestion=number+1;
    if(nextQuestion===TOTAL){
      setGameOver(true)
    }else{
      setNumber(nextQuestion);
    }
  }


  return (
    <>
      <Style />
        <Wrapper>
          <h1>Geography Quiz</h1>
          <h3>Check your geography knowledge by taking this simple quiz!</h3>
          {gameOver || userAnswer.length===TOTAL ? (
            <button className="start" onClick={startTrivia}>Start Trivia</button>
          ):null}
          {!gameOver ? (<p className="score">Score: {score}</p>):null}
          {loading && (<p>Loading Questions...</p>)}
          {!loading && !gameOver &&(
              <QuestionCard 
              questionNr={number+1} 
              totalQuestions={TOTAL} 
              question={questions[number].question} 
              answers={questions[number].answers} 
              userAnswer={userAnswer? userAnswer[number]:undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver && !loading && userAnswer.length===number+1 && number !== TOTAL-1 ? (
            <button className="next" onClick={nextQuestion}>Next Question</button>
          ):null}
          {!correct && <h4>Wrong! The correct answer is {questions[number].correct_answer}</h4>}
        </Wrapper>
    </>
  );
}

export default App;
