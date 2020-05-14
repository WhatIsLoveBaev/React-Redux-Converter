import { GET_DATA } from '../Actions'

export default function getData(state = '', action) {
    if (action.type === GET_DATA) {
        state = action.payload
    }
    return state
}