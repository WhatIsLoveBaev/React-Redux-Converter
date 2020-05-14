import React, { Component } from 'react'

export default class ModalWindow extends Component {

  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.modal('')
    }
  }

    render() {
        const { set, sNC, dAO } = this.props

        const currency = dAO.map((elem, i) => (

              <div key={i} className='modal_elem_wrapper' onClick={(e) => sNC(elem.CharCode, set, e)}>
                  <span>{elem.Name}</span>
                  <span>{elem.CharCode}</span>
              </div>
                    
        ))
        return <div ref={this.setWrapperRef} className='modal_container'>{currency}</div>   
    }
}
