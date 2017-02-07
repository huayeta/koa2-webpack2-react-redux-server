import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';

export default class Counter extends Component {
    static propTypes = {
        increment: PropTypes.func.isRequired,
        incrementIfOdd: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        counter: PropTypes.instanceOf(Immutable.Map).isRequired
    }
    render() {
        const {increment, incrementIfOdd, incrementAsync, decrement, counter} = this.props;
        return (
            <p>
                Counter: {counter.get('num')}
                times {' '}
                <button onClick={increment.bind(this)}>+</button>
                {' '}
                <button onClick={decrement}>-</button>
                {' '}
                <button onClick={incrementIfOdd}>Increment if odd</button>
                {' '}
                <button onClick={incrementAsync}>Increment Async</button>
            </p>
        )
    }
}
