import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getData, defaultValue, defaultAllValue, currentCurse, modal, inputValue, preloader } from '../../Actions'

import Converter from './Converter'

import '../../Styles/converter.css'

class ConverterContainer extends Component {
    

    componentDidUpdate(prevProps) {
        const { curse: {currentCurseFirst: currF, currentCurseSecond: currS }, 
                inputValue: { firstValue },
                input } = this.props

        const { curse: { currentCurseFirst: cCF, currentCurseSecond: cCS } } = prevProps
        
        const prevFirst = cCF.value
        const prevSecond = cCS.value
        
        if (prevFirst !== currF.value || prevSecond !== currS.value) {
            const val = currF.value / currS.value * firstValue
            const current = firstValue !=='' ? val.toFixed(4).replace(/\.0*$/,"") :  ''
            input(firstValue, current)   
        }
    }

    setNewCurrency = (curr, set, e) => {
        const {
            defaultValue: { defaultObjectFirst, defaultObjectSecond }, 
            curse: { currentCurseFirst: cCF, currentCurseSecond: cCS },
            defaultAllObject: dAO,
            currentCurse,
            modalState, 
            modal
        } = this.props

        let arr = set === '#firstSet' ? defaultObjectFirst : defaultObjectSecond
        if (modalState) modal('')

        if (curr !== 'RUB' && curr !== 'USD' && curr !== 'EUR') {
            dAO.forEach(elem => {
                if (elem.CharCode === curr) {
                    arr.splice(3, 1, elem)

                    setTimeout(() => {                 // ?
                        document.querySelectorAll(set)[3].classList.add('active')
                    }, 1)  
                }
            }) 
        }
        let btn = document.querySelectorAll(set)

        for (var i = 0; i < btn.length; i++) {
            btn[i].classList.remove("active")
        }
        e.currentTarget.classList.add("active")

        if (curr === 'RUB') btn[0].classList.add("active")
        if (curr === 'USD') btn[1].classList.add("active")
        if (curr === 'EUR') btn[2].classList.add("active")

        if (set === '#firstSet') currentCurse(curr, cCS.charCode)
                            else currentCurse(cCF.charCode, curr)
    }

    changeInput = (e, set) => {
        const { 
            curse: { currentCurseFirst: cCF, currentCurseSecond: cCS },
            input
        } = this.props

        const inputValue = e.target.value
        const RegExp = /^[^\D.\s]\d*\.?\d*$/

        if (RegExp.test(inputValue) || inputValue === '') {
            const value = set === 'firstSet' ? cCF.value / cCS.value * inputValue : cCS.value / cCF.value * inputValue
            const current = inputValue !=='' ? value.toFixed(4).replace(/\.0*$/,"") :  ''

            set === 'firstSet' ? input(inputValue, current) : input(current, inputValue)
        }
    }

    buttons = (set) => {
        const { defaultValue: 
            { defaultObjectFirst: dOF, defaultObjectSecond: dOS}
        } = this.props

        const arr = set === 'firstSet' ? dOF : dOS

        return arr.map((elem, i) => (
            <button 
                onClick={(e) => this.setNewCurrency(elem.CharCode, `#${set}`, e)} 
                className={`button_currency ${set === 'firstSet' ? i === 0 ? 'active' : '' : i === 1 ? 'active' : ''}`}
                id={set}
                key={i}
            >{elem.CharCode}</button>
        ))
    }

    render() {
        const { preloader, data, loader,  value , allValue, curseDispatch, calendarState,
                defaultInputValue, currentCurse, input, ...otherProps
        } = this.props

        const Preloader = <div className='loader'><div></div></div>

        const ConverterPage =   <Converter 
                                changeInput={this.changeInput}
                                buttons={this.buttons}
                                setNewCurrency={this.setNewCurrency}
                                {...otherProps}
                                />  

        return !preloader ?  Preloader : ConverterPage  
    }
}

function mapStateToProps(state) {
    return {
        preloader: state.preloader,
        getData: state.getData,
        defaultValue: state.defaultValue,
        defaultAllObject: state.defaultAllObject,
        curse: state.currentCurse,
        modalState: state.modal,
        inputValue: state.inputValue,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loader: dispatch(preloader()),
        data: dispatch(getData()),
        value: dispatch(defaultValue()),
        allValue: dispatch(defaultAllValue()),
        curseDispatch: dispatch(currentCurse()),
        defaultInputValue: dispatch(inputValue(1000)),
        currentCurse: (first, second) => dispatch(currentCurse(first, second)),
        modal: payload => dispatch(modal(payload)),
        input: (first, second) => dispatch(inputValue(first, second))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConverterContainer)
