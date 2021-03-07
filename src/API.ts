import {ShuffleArray} from "./utils"

export type Question = {
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;

}

export type QuestionState=Question & {answers:string[]}

export enum Difficulty{
    EASY="easy",
    MEDIUM="medium",
    HARD="hard"
}
export const FetchQuiz=async(amount:number, difficulty:Difficulty)=>{
    const url=`https://opentdb.com/api.php?amount=${amount}&category=22&difficulty=${difficulty}&type=multiple`;
    const data=await(await fetch(url)).json();
    return data.results.map((quest:Question)=>({
        ...quest,
        answers: ShuffleArray([
            ...quest.incorrect_answers,
            quest.correct_answer
        ])
    }))
}