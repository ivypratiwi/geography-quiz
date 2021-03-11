import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard';
import {Difficulty, QuestionState} from './API'
import {FetchQuiz} from './API'
import { isGetAccessorDeclaration } from 'typescript';

//User answer compared with the correct answer
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
  const [userAnswer,setUserAnswer]=useState<AnswerObject[]>([]);
  const [score,setScore]=useState(0);
  const [gameOver,setGameOver]=useState(true);

  console.log(questions)


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
        setScore(prev=>prev+1);
      }
      //Save state
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
    const nextQuestion=number+1;
    if(nextQuestion===TOTAL){
      setGameOver(true)
    }else{
      setNumber(nextQuestion);
    }
  }


  return (
    <div className="App">
      <h1>EASY GEOGRAPHY QUIZ</h1>
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

    </div>
  );
}

export default App;
