import {COUNTER} from '../actions/counter';
import Immutable from 'immutable';
import createReducer from '../lib/createReducer';

const initialState=Immutable.fromJS({num:0});

export default createReducer(initialState,{
    [COUNTER.increment_counter](state,action){
        return state.set('num',state.get('num')+1);
    },
    [COUNTER.decrement_counter](state,action){
        return state.set('num',state.get('num')-1);
    }
})
