import React, { Component } from 'react';
import Modal from './Modal'
import './GameBoard.css'
import button1 from '../sounds/simonSound1.mp3'
import button2 from '../sounds/simonSound2.mp3'
import button3 from '../sounds/simonSound3.mp3'
import button4 from '../sounds/simonSound4.mp3'
const sequence = ['button1', 'button2', 'button3', 'button4']

class GameBoard extends Component{
  constructor(){
    super()

    this.state = {
      round: 0,
      cpu: [],
      human: [],
      showModal: false,
      button1: {
        id: 1,
        color: 'yellow',
        active: false
      },
      button2: {
        id: 2,
        color: 'red',
        active: false
      },
      button3: {
        id: 3,
        color: 'green',
        active: false
      },
      button4: {
        id: 4,
        color: 'blue',
        active: false
      }
    }
  }

handleShowModal = () => {
  let modalStatus = this.state.showModal
  this.setState({showModal: !modalStatus})
}

handleCloseModal = () => {
  let modalStatus = this.state.showModal
  this.setState({showModal: modalStatus})
}

handleClick = (e) => {
  e.preventDefault()
  let yellowStatus = this.state.button1.active
  let redStatus = this.state.button2.active
  let greenStatus = this.state.button3.active
  let blueStatus = this.state.button4.active
  let button = e.target.classList[0]

  if (e.target.classList[0] === 'button1'){
      new Audio(button1).play()
      this.setState({button1:{active: !yellowStatus}})
      setTimeout(() => {
        this.setState({button1:{active: yellowStatus}})
      }, 200)
      this.setState({human: this.state.human.concat(button)}, () => {this.compare()})

  } if (e.target.classList[0] === 'button2'){
      new Audio(button2).play()
      this.setState({button2:{active: !redStatus}})
      setTimeout(() => {
        this.setState({button2:{active: redStatus}})
      }, 200)
      this.setState({human: this.state.human.concat(button)}, () => {this.compare()})

  } if (e.target.classList[0] === 'button3'){
      new Audio(button3).play()
      this.setState({button3:{active: !greenStatus}})
      setTimeout(() => {
        this.setState({button3:{active: greenStatus}})
      }, 200)
      this.setState({human: this.state.human.concat(button)}, () => {this.compare()})

  } if (e.target.classList[0] === 'button4'){
      new Audio(button4).play()
      this.setState({button4:{active: !blueStatus}})
      setTimeout(() => {
        this.setState({button4:{active: blueStatus}})
      }, 200)
      this.setState({human: this.state.human.concat(button)}, () => {this.compare()})
  }
}

play = () => {
  let humanSet = []
  let cpuSet = []
  let round = this.state.round
  let randomButton = sequence[Math.floor(Math.random()*sequence.length)]
  if (round === 'game-over'){
    this.setState({round: 0})
    this.setState({human: humanSet})
    this.setState({cpu: cpuSet})
    setTimeout(() => {
        this.setState({cpu: this.state.cpu.concat(randomButton)})
        this.simonSequence()
      }, 1000)
  } else {
    this.setState({round: round + 1})
      setTimeout(() => {
          this.setState({cpu: this.state.cpu.concat(randomButton)})
          this.simonSequence()
      }, 1000)
    this.setState({human: humanSet})
  }
}

simonSequence = () => {
  let items = this.state.cpu.length
  let index = 0
  let number = 1
  let intervalId = setInterval(() => {
    let button = this.state.cpu[index]

      if(number === items){
        clearInterval(intervalId)
      }

    if (button === 'button1'){
      new Audio(button1).play()
    } else if (button === 'button2'){
      new Audio(button2).play()
    } else if (button === 'button3'){
      new Audio(button3).play()
    } else {
      new Audio(button4).play()
    }
    this.setState({[button]: {active: true}})
    setTimeout(() => {
      this.setState({[button]: {active: false}})
    }, 200)
    number++
    index++
  }, 300)
}

gameOver = () => {
  this.setState({round: 'game-over'})
}

compare = (index) => {
  let userSequence = this.state.human
  let cpuSequence = this.state.cpu
  let isSame = (userSequence.length === cpuSequence.length && userSequence.every(function(element, index){
    return element === cpuSequence[index]
  }))
  if (isSame && this.state.human.length === this.state.cpu.length){
    this.play()
  } else if (!isSame && this.state.human.length === this.state.cpu.length) {
    this.gameOver()
  }
}

  render(){

    return(
      <div className='theater'>
      <div onClick={this.handleShowModal} className='info'>
        {this.state.showModal ?
          <Modal onClose={this.handleCloseModal} >
            <p>press play button to begin or reset game</p>
            <hr></hr>
            <p>The device has four colored buttons,
             each producing a particular tone when
             it is pressed or activated by the device.
              A round in the game consists of the device
               lighting up one or more buttons in a random order,
                after which the player must reproduce that
                 order by pressing the buttons. As the game
                  progresses, the number of buttons to be pressed increases.</p>
              <hr></hr>
              <p>***click anywhere to return to game***</p>
          </Modal> : <p>instructions</p>}
      </div>
        <div className='gameboard'>
          {this.state.round !== 'game-over' ?
          <div id={this.state.button1.id} onClick={this.handleClick} className={`button1 ${this.state.button1.active ? 'active' : null}`}></div>
          : <div className='blank-button'></div>}
          {this.state.round !== 'game-over' ?
          <div id={this.state.button2.id} onClick={this.handleClick} className={`button2 ${this.state.button2.active ? 'active' : null}`}></div>
          : <div className='blank-button'></div>}
          {this.state.round !== 'game-over' ?
          <div id={this.state.button3.id} onClick={this.handleClick} className={`button3 ${this.state.button3.active ? 'active' : null}`}></div>
          : <div className='blank-button'></div>}
          {this.state.round !== 'game-over' ?
          <div id={this.state.button4.id} onClick={this.handleClick} className={`button4 ${this.state.button4.active ? 'active' : null}`} ></div>
          : <div className='blank-button'></div>}
          {this.state.round !== 'game-over' ?
          <div className='center'>
            <h3>round</h3>
            <p>{this.state.round}</p>
          </div>
          : <div className='game-end'>
            <h2>game over</h2>
            <p>simon</p>
            <p>wins</p>
          </div>
          }

      </div>
        {this.state.round === 'game-over' || this.state.round === 0 ?
        <div onClick={this.play} className='play'><p>play</p></div> :
        <div className='blank'></div>}
      </div>
    )
  }
}


export default GameBoard
