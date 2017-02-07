import React,{Component,PropTypes} from 'react';
import {user_action_fetch} from '../../actions/user';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import Log from '../../decorators/log';
import preReadyData from '../../decorators/preReadyData';

@connect(({user}) => ({state:{user}}))
@preReadyData({
    user:user_action_fetch
})
@Log()
class User extends React.Component {
    constructor(){
        super();
    }
    static propTypes={
        state:PropTypes.shape({
            user:PropTypes.instanceOf(Immutable.Map).isRequired
        })
    }
    componentDidMount(){
        const {user:user_map} = this.props.state;
        const user=user_map.toJS();
        const {dispatch}=this.props;
        if(!user.isFetched){
            dispatch(user_action_fetch());
        }
    }
    render(){
        const {user:user_map} = this.props.state;
        const user=user_map.toJS();
        return (
            <div>
                {user.info.map((user,index)=>{
                    return(
                        <p key={index}>{user.name}</p>
                    )
                })}
            </div>
        )
    }
}

export default User;
