import React, { useState } from 'react'
import QuestionCard from './components/QuestionCard';
import {Difficulty} from './API'
import {FetchQuiz} from './API'

const TOTAL=5;

const App=()=> {
  const [loading,setLoading]=useState(false);
  const [questions,setQuestions]=useState([]);
  const [number, setNumber]=useState(0);
  const [userAnswer,setUserAnswer]=useState([]);
  const [score,setScore]=useState(0);
  const [gameOver,setGameOVer]=useState(true);


  console.log(FetchQuiz(TOTAL,Difficulty.EASY))

  const startTrivia = async()=>{

  }
  
  const checkAnswer=(e: React.MouseEvent<HTMLButtonElement>)=>{

  }
  
  const nextQuestion=()=>{

  }


  return (
    <div className="App">
      <h1>EASY GEOGRAPHY QUIZ</h1>
      <button className="start" onClick={startTrivia}>Start Trivia</button>
      <p className="score">Score: </p>
      <p>Loading Questions</p>
      {/* <QuestionCard 
        questionNr={number+1} 
        totalQuestions={TOTAL} 
        question={questions[number].question} 
        answers={questions[number].answers} 
        userAnswer={userAnswer? userAnswer[number]:undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>Next Question</button>

    </div>
  );
}

export default App;
