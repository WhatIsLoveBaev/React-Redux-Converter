import { MODAL } from '../Actions'

export default function modal(state = '', action) {
    if (action.type === MODAL) {
        state = action.payload
    }
    return state
}