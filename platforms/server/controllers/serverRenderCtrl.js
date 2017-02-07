import React from 'react';
import {RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import config from '../../common/config';
import configureStore from '../../../app/store/configureStore';
const store = configureStore();

export default async(ctx, next, renderProps) => {
    // const route = renderProps.routes[renderProps.routes.length - 1];
    let prefetchTasks = [];
    let prefetchKey=[];
    for (let component of renderProps.components) {
        if (component && component.WrappedComponent && component.WrappedComponent.fetch) {
            const _tasks = component.WrappedComponent.fetch(store.getState(), store.dispatch);
            if(_tasks && typeof _tasks==='object'){
                prefetchKey=Object.keys(_tasks);
                prefetchTasks=Object.values(_tasks);
            }
        }
    }
    await Promise.all(prefetchTasks);
    const state=store.getState();
    let reduxData={};
    for(let key of prefetchKey){
        reduxData[key]=state[key];
    }
    await ctx.render('index', {
        title: config.title,
        dev: ctx.app.env === 'development',
        reduxData: reduxData,
        app: renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps}/>
            </Provider>
        )
    })
}
