import { createStore } from 'redux'
const initState = {
    text: 'hello world',
    bottomText: 'click bottom'
}
function reducer(state = initState, action) {
    switch (action.name || action.type) {
        case 'reverse_text':
            state.text = state.text.split('').reverse().join('')
            return state;
        case 'reverse_button':
            state.bottomText = state.bottomText.split('').reverse().join('')
            return state;
        default:
            return state;
    }
}
export const store = createStore(reducer, initState)
