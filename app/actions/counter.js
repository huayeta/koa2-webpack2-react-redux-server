import {createAction} from 'redux-actions';
import keymirror from 'keymirror';

export const COUNTER=keymirror({
    increment_counter:null,
    decrement_counter:null
});

export const increment= createAction(COUNTER.increment_counter);

export const decrement= createAction(COUNTER.decrement_counter);

export function incrementIfOdd() {
    return (dispatch, getState) => {
        const {
            counter
        } = getState()

        if (counter % 2 === 0) {
            return
        }
        dispatch(increment())
    }
}

export function incrementAsync() {
    return (dispatch,getStatus) => {
        setTimeout(() => {
            dispatch(increment())
        }, 1000)
    }
}
