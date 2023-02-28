import Option from "./Option"

export default function Question(props) {
    const answersEl = props.options.map((answer) => {
        return <Option
        key={answer.id}
        click={() => props.selected(props.qId, answer.id)}
        held={answer.isHeld}
        value={answer.value}
        solved={props.solved}
        isAnswer={answer.isAnswer}
        />
    })
    
    return(
        <div className="question">
            <h3 className="question-title" >{props.title}</h3>
            <div className="all-answers">
                {answersEl}
            </div>
            <hr/>
        </div>
    )
}