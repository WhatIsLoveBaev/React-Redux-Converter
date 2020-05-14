import { INPUT_VALUE } from '../Actions'

export default function defaultValue(state = {firstValue: '', secondValue: ''}, action) {
    if (action.type === INPUT_VALUE) {
        state = action.payload
    }
    return state
}