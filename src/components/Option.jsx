export default function Options(props) {
    let color
    
    if(props.isAnswer) {
        color = "#94D7A2"
    } else if (props.held && !props.isAnswer) {
        color = "#F8BCBC"
    } else {
        color = "transparent"
    }
    
    const styles ={
        backgroundColor: props.held ? "#D6DBF5" : "transparent"
    }
    
    const answered ={
        backgroundColor: color,
        opacity: props.isAnswer ? "1" : "0.5"
    }
    
    return(
        <p 
            className="answer" 
            style={props.solved ? answered : styles}
            onClick={props.click}
        > 
            {props.value}
        </p>
    )
}