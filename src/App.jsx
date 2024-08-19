import React from "react"
import './App.css'
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [ dice, setDice ] = React.useState(allNewDice());
  const [ tenzies, setTenzies] = React.useState(false);
  const [ count, setCount ] = React.useState(0)

  React.useEffect(() => {
    let state = true;
        const testing = dice.map(die => {
            if(die.isHeld == false){
                state = false
            }
            return die
        })
        let val = dice[0].value
        for(let i = 1; i<dice.length; i++){
            if(dice[i].value != val ){
                state = false
            }
        }
        if(state === true){
            console.log("You win!")
            setTenzies(true)
        }
  }, [dice])
  
  function allNewDice() {

    const arr = []
    for(let i = 0; i<10; i++){
      arr.push({
        id: nanoid(),
        number: Math.ceil(Math.random() * 6),
        isHeld: false,
      })
    }
    return arr
  
  }

  const diceElements = dice.map(die => <Die key={die.id} number={die.number} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

  function roll() {
    if(tenzies === false){
      setDice(oldDice => oldDice.map(die => {
        if(die.isHeld === true){
          return die
        }
        return {
          id: nanoid(),
          number: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      }))
      setCount(count+1)
    }else{
      setDice(allNewDice())
      setTenzies(false)
      setCount(0)
    }
  }

  function holdDice(id) {
    const toFlip = dice.map(die => {
        if(die.id === id){
            return {
                ...die,
                isHeld: !die.isHeld
            }
        }

        return die

    })
    setDice(toFlip)
 }

  return (
    <>
      <main>
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="descriptor">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="grid-container">
            {diceElements}
          </div>
          <button className="roll-btn" onClick={roll}>{tenzies ? "New Game" : "Roll" }</button>
          <h1 className="roll-count">Rolls: {count}</h1>
      </main>
    </>
  )
}

export default App
