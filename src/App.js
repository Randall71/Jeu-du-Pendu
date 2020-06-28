import React from 'react'
import './App.css'

const letters = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U','V', 'W', 'X', 'Y', 'Z']

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return(
      <div className="lettersContainer">
        {
          letters.map((letter,index) =>(
            <div className="letter">
              {letter}
            </div>
          ))
        }
      </div>
    )
  }

}


export default App