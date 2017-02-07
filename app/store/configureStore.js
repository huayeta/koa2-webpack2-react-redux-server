import {
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger =createLogger();

let arr=[thunk,promise];

if(process.env.NODE_ENV === 'development' && !__SERVER__){
    arr.push(logger);
}

const createStoreWithMiddleware = applyMiddleware.apply(this,arr)(createStore)

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept(['../reducers'], () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
