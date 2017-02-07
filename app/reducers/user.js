import {USER} from '../actions/user';
import Immutable from 'immutable';
import createReducer from '../lib/createReducer';

const initialState=Immutable.fromJS({
    isFetching:false,
    didInvalidate:false,
    isFetched:false,
    info:[]
})

export default createReducer(initialState,{
    [USER.user_type](state,{payload}){
        return state.merge(payload);
    },
    [USER.user_type_isfetching](state,{payload}){
        return state.merge(payload);
    },
    [USER.user_type_didinvalidate](state,{payload}){
        return state.merge(payload);
    }
})
