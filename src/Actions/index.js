import moment from 'moment'
import CurrencyService from '../Service/CurrencyService'

export const GET_DATA = 'GET_DATA'
export const DEFAULT_VALUE = 'DEFAULT_VALUE'
export const DEFAULT_ALL_VALUE = 'DEFAULT_ALL_VALUE'
export const CURRENT_CURSE = 'CURRENT_CURSE'
export const MODAL = 'MODAL'
export const INPUT_VALUE = 'INPUT_VALUE'
export const PRELOADER = 'PRELOADER'

const currencyService = new CurrencyService()

export const getData = () => dispatch => {
    currencyService.getAllObject().then(d => {
        dispatch({ type: GET_DATA, payload: moment(d.Timestamp).format('DD.MM.YYYY') })
    })       
}
export const defaultValue = () => dispatch => {  
    currencyService.getObjectValute().then(def => {
        const defaultObjectFirst = []
        const defaultObjectSecond = []

        const rus = {
            ID: "RUB001",
            NumCode: "0001",
            CharCode: "RUB",
            Nominal: 1,
            Name: "Российский рубль",
            Value: 1,
            Previous: 1
        }

        defaultObjectFirst.push(
            rus, def['USD'], def['EUR'], def['UAH']
        )
        defaultObjectSecond.push(
            rus, def['USD'], def['EUR'], def['UAH']
        )
        dispatch({ type: DEFAULT_VALUE, payload: {defaultObjectFirst, defaultObjectSecond} })   
    }) 
}
export const defaultAllValue = () => dispatch => {  
    currencyService.getObjectValute().then(def => {
        const allObjectsArray = []

        for (let key in def) {
            allObjectsArray.push(def[key])
            
        }
        allObjectsArray.unshift(
            {
                ID: "RUB001",
                NumCode: "0001",
                CharCode: "RUB",
                Nominal: 1,
                Name: "Российский рубль",
                Value: 1,
                Previous: 1
            }
        )
        
        allObjectsArray.splice(22, 1)
        allObjectsArray.splice(26, 1)

        allObjectsArray.forEach(elem => {
            let { CharCode: eC, Name: eN } = elem

            if (eC === 'GBP') elem.Name = eN.substring(0, eN.lastIndexOf(' С'))
            
            else if (eC === 'XDR') allObjectsArray.splice()
        })
        dispatch({ type: DEFAULT_ALL_VALUE, payload: allObjectsArray })
    }) 
}
export const currentCurse = (first, second) => dispatch => {

    let currentCurseFirst = {value: 1, charCode: 'RUB'}
    let currentCurseSecond = {value: 1, charCode: 'USD'}

    let firstOneCurrent = ''
    let secondOneCurrent = ''

    currencyService.getObjectValute().then(def => {
        const allObjectsArray = []

        for (let key in def) {
            allObjectsArray.push(def[key])   
        }

        allObjectsArray.unshift(
            {
                ID: "RUB001",
                NumCode: "0001",
                CharCode: "RUB",
                Nominal: 1,
                Name: "Российский рубль",
                Value: 1,
                Previous: 1
            }
        )
        currentCurseSecond = {value: def['USD'].Value, charCode: def['USD'].CharCode}
        
        allObjectsArray.forEach(elem => {
            const { Value: eV, Nominal: eN, CharCode: eC } = elem

            const { charCode: ccfC, value: ccfV } = currentCurseFirst
            const { charCode: ccsC, value: ccsV } = currentCurseSecond

            if (eC === first) currentCurseFirst = {value: eV / eN, charCode: eC}
            if (eC === second) currentCurseSecond = {value: eV / eN, charCode: eC}
            
            firstOneCurrent = `1 ${ccfC} = ${(ccfV / ccsV).toFixed(4).replace(/\.0*$/,"")} ${ccsC}`
            secondOneCurrent = `1 ${ccsC} = ${(ccsV / ccfV).toFixed(4).replace(/\.0*$/,"")} ${ccfC}`       
        })
        dispatch({ type: CURRENT_CURSE, payload: {currentCurseFirst, currentCurseSecond, firstOneCurrent, secondOneCurrent} })
    })
    
}
export function modal(payload) {
    return {
        type: MODAL,
        payload
    }
}
export const inputValue = (first, second) => dispatch => {  
    dispatch({ type: INPUT_VALUE, payload: {firstValue: first, secondValue: second} })   
}
export const preloader = () => dispatch => {
    setTimeout(() => {
        dispatch({ type: PRELOADER })
    }, 1200)
    
}
