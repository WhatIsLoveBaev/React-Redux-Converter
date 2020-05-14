import { DEFAULT_VALUE } from '../Actions'

export default function defaultValue(state = {defaultObjectFirst: [], defaultObjectSecond: []}, action) {
    if (action.type === DEFAULT_VALUE) {
        state = action.payload
    }
    return state
}