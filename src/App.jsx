
import Intro from "./components/Intro"
import GameBoard from "./components/GameBoard"
import { useState } from 'react'

export default function App() {
  const [start, setStart] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [url, setUrl] = useState("")
  
  return (
      <main>
          { !start ?
            <Intro 
                setUrl={setUrl}
                setStart={setStart}
                setTotalQuestions={setTotalQuestions}
            />
          :
            <GameBoard 
                url = {url}
                setStart={setStart}
                totalQuestions={totalQuestions}
            />
          }
      </main>
  )
}
