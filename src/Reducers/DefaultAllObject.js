import { DEFAULT_ALL_VALUE } from '../Actions'

export default function defaultAllValue(state = [], action) {
    if (action.type === DEFAULT_ALL_VALUE) {
        state = action.payload
    }
    return state
}