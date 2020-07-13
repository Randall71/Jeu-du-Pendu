import React from 'react'
import './App.css'
import {Words, letters} from './Words'


const escape = '_ '
class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      word: [],
      renderWord:  [],
      lettersClickTab: [],
      imageCount: 0,
      message: '',
      messageClass: '', 
    }
   
    this.entierAleatoire = this.entierAleatoire.bind(this)
    this.chooseWord = this.chooseWord.bind(this)
    this.convertStringToArray = this.convertStringToArray.bind(this)
    this.checkLettersInWord = this.checkLettersInWord.bind(this)
    this.displayMessage = this.displayMessage.bind(this)
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
       renderWord: new Array(wordsTab[index].length).fill(escape, 0, wordsTab[index].length)
      }))
  }

  convertStringToArray(string){
    return [...string]
  }

  checkLettersInWord(letterClick){
    const {word, renderWord, lettersClickTab, imageCount} = this.state 
    const newRenderWord = [...renderWord] 
    let newImageCount = imageCount
    let renderWordCounter  = renderWord.length

    if(lettersClickTab.includes(letterClick)){
      return ; 
    }else{
      if(imageCount !== 6 && renderWord.includes(escape)){
      lettersClickTab.push(letterClick)
      word.forEach((letter, index) => {
        if(letter === letterClick){
          newRenderWord[index] = letter
          renderWordCounter--
        }
      })
      }
  }
    //Si la lettre ne fait pas partir du mot on incrémente imageCount
     if(renderWordCounter === renderWord.length && newImageCount < 6){
       newImageCount++
      this.setState((state, props) => ({imageCount: newImageCount}))
    }

    this.setState({ renderWord: newRenderWord})
    this.displayMessage(newImageCount, word, newRenderWord)

  }

  displayMessage(imageCountParam, wordParam, renderWordParam){
    
    const LOOSER = `le mot était ${wordParam.join('')} 🙁`
    const WINNER = 'Felicitation vous avez trouvé le mot 🎊🎉✨'
    if(this.isEqual(wordParam, renderWordParam)){
      this.setState({messageClassName: 'messageWinner', message: WINNER  })
    }
    if(imageCountParam === 6){
      this.setState({messageClassName: 'messageLooser', message: LOOSER })
    }
  }

  entierAleatoire(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Comparez si deux tablaux sont égaux 
  isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  render(){
    const {renderWord, imageCount, messageClassName, message} = this.state
    console.log(this.state.word)
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
      <div className="messageContainer">
         <p className={messageClassName}>{message}</p>
      </div>
      <div>
        <p>
          {message !== '' ?
        <button className="rejouer" onClick={()=>window.location.reload()}>rejouer</button> : 
        null}
        </p>
      </div>
      <div className="imagePendu">
        <img  src={`assets/Hangman-${imageCount}.png`}  alt="pendu" />
      </div>
     </div>
    )
  }
}

export default App