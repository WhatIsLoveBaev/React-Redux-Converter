import { combineReducers } from 'redux'

import getData from './GetData'
import currentCurse from './CurrentCurse'
import defaultAllObject from './DefaultAllObject'
import defaultValue from './DefaultValue'
import inputValue from './InputValue'
import modal from './Modal'
import preloader from './Preloader'

export default combineReducers({
    preloader,
    getData,
    currentCurse,
    defaultAllObject,
    defaultValue,
    inputValue,
    modal
})