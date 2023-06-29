
import Intro from "./components/Intro"
import GameBoard from "./components/GameBoard"
import Confetti from "react-confetti"
import { useState } from 'react'

export default function App() {
    
  const [start, setStart] = useState(false)
 
  const [score, setScore] = useState(0)
  const [url, setUrl] = useState("")
  
  return (
      <main>
          {score === 5 && <Confetti />}
          { !start ?
            <Intro 
                setUrl={setUrl}
                setStart={setStart}
            />
          :
            <GameBoard 
                url = {url}
                score={score}
                setScore= {setScore}
                setStart={setStart}
            />
          }
      </main>
  )
}
