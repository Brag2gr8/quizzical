import { useState, useEffect } from "react"
import blobThree from '../assets/blob-three.png'
import blobFour from '../assets/blob-four.png'
import Question from "./Question"
import {decode} from "html-entities"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function GameBoard(props) {
    const [questions, setQuestions] = useState([])
    const [solved, setSolved] = useState(false)
    const [score, setScore] = useState(0)
    const {url, setStart, totalQuestions} = props

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                    setQuestions(getQuestion(data.results))
            })
            .catch(err => console.log(err))
    }, [url])

    function getQuestion(array) {
        const newArr = []
        array.map((item, i) => {
            newArr.push({
                    id: nanoid(),
                    question: decode(item.question, {level: "html5"}),
                    allAnswer: getAnswers(array, i)
            })
        })
        return newArr
    }
    
    function getAnswers(array, i) {
        const newArr =  array[i].incorrect_answers
        newArr.push(array[i].correct_answer)
        newArr.sort(() => Math.random() - 0.5)
        return newArr.map((item) => (
            {
                value: decode(item, {level: "html5"}),
                id: nanoid(),
                isHeld: false,
                isAnswer: item === array[i].correct_answer ? true : false,
            }
        ))
    }
    
    function selectAnswer(qId, aId) {
        setQuestions(prev => (
            prev.map(item => {
                return item.id === qId ?
                    {...item,
                        allAnswer: item.allAnswer.map(ans => {
                            return ans.id === aId ? 
                            {...ans, isHeld: !ans.isHeld} :
                            {...ans, isHeld: false}
                        })
                    }: item
            })
        ))
    }

    function checkAnswer() {
        if (questions.length > 0) {
            setSolved(true)
            let num = 0
            questions.forEach(question =>{
                const arr = question.allAnswer.filter(ans =>{
                return ans.isHeld === true && ans.isAnswer === true
            })
                setScore(prev => prev += arr.length)
            })
        }
    }

    function newGame() {
        setStart(false)
    }

    const questionEl = questions.map(question => (
        <Question 
            key={question.id}
            title={question.question}
            options={question.allAnswer}
            qId={question.id}
            selected={selectAnswer}
            solved ={solved}
        />
    ))

    const skeletonEl = new Array(7).fill(0).map((el, i) => {
        return (
            <div className="question" key={i}>
            <h3>{<Skeleton width={400} />}</h3>
            <div className="all-answers">
                {<Skeleton width={60} />}
                {<Skeleton width={60} />}
                {<Skeleton width={60} />}
                {<Skeleton width={60} />}
            </div>
            <hr/>
        </div>
        )
    })

    console.log(typeof score, typeof totalQuestions)

    return (
        <div className="question-container" >
            {score === parseFloat(totalQuestions) && <Confetti />}
            <img className="blob-one" src={blobThree} />
            <img className="blob-two" src={blobFour} />
            <h1 className="intro-name page-title" >Quizzical</h1>
            { questions.length > 0 ?
                questionEl
                :
                skeletonEl
            }
            <div className="result" >
                {solved ? 
                <>
                    <h3 className="score">
                    {score === totalQuestions ? "You got all questions!" :
                    `You scored ${score}/${totalQuestions} correct answers`}
                    </h3>
                    <button 
                        className="answer-btn" 
                        onClick={newGame}
                    >
                        New Game 
                    </button> 
                </>
                :
                    <button 
                        className="answer-btn" 
                        onClick={checkAnswer}
                    >
                        Check Answers
                    </button>
                }
            </div>
        </div>
    )
}