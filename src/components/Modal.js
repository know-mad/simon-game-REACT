import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
const modalRoot = document.getElementById('modal-root')

class Modal extends Component{



  render(){

    return ReactDOM.createPortal(
      <div className='modal-body'>
        <div className='modal'>
          {this.props.children}

        </div>
      </div>,
      modalRoot,
    )
  }
}

export default Modal
