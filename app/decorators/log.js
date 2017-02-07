import React from 'react';

export default function Log(){
    return DecoratedComponent=>{
        return class LogDecorator extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                if(!__SERVER__)console.log(DecoratedComponent.name,'render');
                return (
                    <DecoratedComponent {...this.props} />
                )
            }
            componentDidMount(){
                if(!__SERVER__)console.log(DecoratedComponent.name,'componentDidMount');
            }
        }
    }
}
