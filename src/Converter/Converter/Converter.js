import React from 'react'

import ModalWindow from '../ModalWindow'

const Converter = props => {

    const {
        curse: { firstOneCurrent, secondOneCurrent },
        inputValue: { firstValue, secondValue },
        defaultValue: { defaultObjectFirst: dOF},
        modalState,
        getData,
        defaultAllObject,
        modal,
        calendar,

        setNewCurrency,
        changeInput,
        buttons,
    } = props

    let usd = {}
    let eur = {}
    
    dOF.forEach(elem => {
        const { Value: v, Previous: p, CharCode: c} = elem

        if (c === 'USD') 
        usd = {
            usdVal: `${v.toFixed(2)}₽`,
            usdD: `${(v - p).toFixed(2)} (${((v - p) / p * 100).toFixed(2)}%)`,
            usdDif: v - p
        }
        if (c === 'EUR') 
        eur = {
            eurVal: `${v.toFixed(2)}₽`,
            eurD: `${(v - p).toFixed(2)} (${((v - p) / p * 100).toFixed(2)}%)`,
            eurDif: v - p
        }   
        
    })

    const firstBtn = modalState === 'first' ? 'active' : ''
    const secondBtn = modalState === 'second' ? 'active' : ''

    const window = modalState !== '' ? <ModalWindow 
                        dAO={defaultAllObject} 
                        set={`#${modalState}Set`}
                        sNC={setNewCurrency}
                        modal={modal}
                        /> : ''
        
    const differenceUSD = usd.usdDif > 0 ? `+${usd.usdD}` : usd.usdD
    const differenceEUR = eur.eurDif > 0 ? `+${eur.eurD}` : eur.eurD


    const outInContainer = (outIn, set) => (
        <div className={`${outIn}_container`}>

            <span>{outIn === 'out' ? 'У меня есть' : 'Хочу приобрести'}</span>

            <div className={`${outIn}_buttons`}>
                {buttons(`${set}Set`)}
                <button onClick={() => modal(set)} className={`button_currency ${set === 'first' ? firstBtn : secondBtn}`}>X</button>
            </div>

            <div className='input_container'>
                <div className={`${outIn}_input_wrap`}>
                    <input onChange={(e) => changeInput(e, `${set}Set`)} className={`${outIn}_input`} maxLength='10' value={set === 'first' ? firstValue : secondValue} type='text' />
                </div>
                <div className='currency_equally_container'>
                    <span className='currency_equally'>{set === 'first' ? firstOneCurrent : secondOneCurrent}</span>
                </div>
            </div>

        </div>
    )

    const currentCurse = (cur, CUR, val, dif) => (
        <div className={`curse_${cur}`}>
            <span className='current_name'>{CUR}</span>
            <span className='current_value'>{val}</span>
            <span className={`${cur}_comparison ${dif <= 0 ? 'green' : 'red'}`}>
                {cur === 'usd' ? differenceUSD : differenceEUR}
            </span>
        </div>
    )

    return (
        <div className='converter_container'>
            <div className='main_converter'>
                <div className='out_in_container'>
                    {outInContainer('out', 'first')}
                    {window}
                    {outInContainer('in', 'second')}
                </div>
                <div className='calendar_btn_container'>
                    <div className='current_curse_container'>
                        <div className='current_curse'>
                            {currentCurse('usd', 'USD', usd.usdVal, usd.usdDif)}
                            {currentCurse('eur', 'EUR', eur.eurVal, eur.eurDif)}
                        </div>
                    </div>
                    <div className='calendar_btn' onClick={() => calendar()}>
                        <span>{`Данные за ${getData}`}</span>
                    </div>
                </div>
            </div>        
        </div>  
    )
}
export default Converter
