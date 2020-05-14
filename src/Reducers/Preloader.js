import { PRELOADER } from '../Actions'

export default function preloader(state = false, action) {
    if (action.type === PRELOADER) {
        state = true
    }
    return state
}