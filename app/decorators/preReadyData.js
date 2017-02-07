import React from 'react';

export default function preReadyData(obj){
    return DecoratedComponent =>{
        return class preReadyDataComponent extends React.Component{
            static fetch(state,dispatch){
                let fetch_obj={};
                Object.keys(obj).forEach((key)=>{
                    fetch_obj[key]=dispatch(obj[key]());
                })
                return fetch_obj;
            }
            constructor(props){
                super(props);
            }
            render(){
                return(
                    <DecoratedComponent {...this.props} />
                )
            }
        }
    }
}
