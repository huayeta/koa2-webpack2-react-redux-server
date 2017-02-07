import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-actions';
import keymirror from 'keymirror';

const fetchStatusUrl=__SERVER__?global.fetchStatusUrl:'';

export const USER=keymirror({
    user_type:null,
    user_type_isfetching:null,
    user_type_didinvalidate:null
})

export const user_action=createAction(USER.user_type,(users)=>{
    return{
        isFetching:false,
        isFetched:true,
        info:users
    }
})
export const user_action_isfetching=createAction(USER.user_type_isfetching,()=>{
    return{
        isFetching:true,
    }
})
export const user_action_didinvalidate=createAction(USER.user_type_didinvalidate,()=>{
    return{
        didInvalidate:true
    }
})

export const user_action_fetch=()=>{
    return dispatch=>{
        dispatch(user_action_isfetching());
        return fetch(fetchStatusUrl+'/api/users').then(res=>res.json()).then(res=>{
            return dispatch(user_action(res.info));
        })
    }
}
