import blobOne from './assets/blob-one.png'
import blobTwo from './assets/blob-two.png'
import blobThree from './assets/blob-three.png'
import blobFour from './assets/blob-four.png'
import React from "react"
import Question from "./components/Question"
import {decode} from "html-entities"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    
  const [start, setStart] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [solved, setSolved] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [round, setRound] = React.useState(0)
  
  
  React.useEffect(() => {
      fetch('https://opentdb.com/api.php?amount=5')
          .then(res => res.json())
          .then(data => {
              setQuestions(getQuestion(data.results))
          })
  }, [round])
  
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
      function shuffle(arr) {
          arr.sort(() => Math.random() - 0.5);
      }
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
          setSolved(true)
          let num = 0
          questions.forEach(question =>{
          const arr = question.allAnswer.filter(ans =>{
              return ans.isHeld === true && ans.isAnswer === true
          })
          setScore(prev => prev += arr.length)
          })
  }
  
  function startQuiz() {
      setStart(true)
  }
  
  function NewGame() {
      setRound(prev => prev + 1)
      setSolved(false)
      setScore(0)
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
  
  return (
      <main>
          {score === 5 && <Confetti />}
          { !start ?
          <div className="intro">
              <img className="blob-one" src={blobOne} />
              <img className="blob-two" src={blobTwo} />
              <h1 className="intro-name" >Quizzical</h1>
              <p className="desc" >Test Out Your Knowledge On Some Quiz</p>
              <button 
                  className="start-btn" 
                  onClick={startQuiz} 
              >
                  Start quiz
              </button>
          </div> 
          :
          <div className="question-container" >
              <img className="blob-one" src={blobThree} />
              <img className="blob-two" src={blobFour} />
              <h1 className="intro-name page-title" >Quizzical</h1>
              {questionEl}
              <div className="result" >
                  {solved && <h3 className="score">
                  {score === 5 ? "You got all questions!" :
                  `You scored ${score}/5 correct answers`}
                  </h3>}
                  {solved ? 
                  <button 
                      className="answer-btn" 
                      onClick={NewGame}
                  >
                      New Game 
                  </button> :
                  <button 
                      className="answer-btn" 
                      onClick={checkAnswer}
                  >
                      Check Answers
                  </button>
                  }
              </div>
          </div>
          }
      </main>
  )
}
