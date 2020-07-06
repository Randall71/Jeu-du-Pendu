import React from 'react'
import './App.css'
import {Words, letters} from './Words'



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      word: [],
      renderWord:  ['a','b']
    }

    this.entierAleatoire = this.entierAleatoire.bind(this)
    this.chooseWord = this.chooseWord.bind(this)
    this.convertStringToArray = this.convertStringToArray.bind(this)
    this.checkLettersInWord = this.checkLettersInWord.bind(this)
  }
  
  componentDidMount(){
   this.chooseWord()

  }

  chooseWord(){
    const wordsTab = Words.split('\n')
    const index = this.entierAleatoire(0, wordsTab.length - 1 )
    let wordChoosen = this.convertStringToArray(wordsTab[index])
    
    this.setState((state, props) => ({
       word: wordChoosen,
       renderWord: Array(wordsTab[index].length).fill('_ ', 0, wordsTab[index].length)
      }))
  }

  convertStringToArray(string){
    return [...string]
  }

  checkLettersInWord(letterClick){
    // const {word} = this.state
    // const express = '_ '
    // const newRenderWord = word.map((letter) =>{
    //  return letterClick === letter ?
    //   this.setState({renderWord : letter}) : '_ '
    // })

    // console.log(newRenderWord)
  }

  entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render(){
    console.log(this.state.word[2])
    console.log(this.state.word)

    const {renderWord} = this.state
    return(
     <div className="container">
        <div className="wordsContainer">
         {
           renderWord.map((letter, index) =>(
            <span className="word" key={index}>
              {letter}
            </span>
    ))
         }
        </div>
        <div className="lettersContainer">
        {     
          letters.map((letter,index) =>(
            <div className="letter" key={index} onClick={() => this.checkLettersInWord(letter)}>
              {letter}
            </div>
          ))
        }
      </div>
     </div>
    )
  }

}


export default App