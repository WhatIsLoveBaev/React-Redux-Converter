import { CURRENT_CURSE } from '../Actions'

const initial = {
    currentCurseFirst: {value: '', charCode: ''}, 
    currentCurseSecond: {value: '', charCode: ''}
}

export default function currentCurse(state = initial, action) {
    if (action.type === CURRENT_CURSE) {
        state = action.payload
    }
    return state
}