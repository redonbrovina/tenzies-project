import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.number}</h2>
        </div>
    )
}