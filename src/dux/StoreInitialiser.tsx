/// <reference path="../../typings/tsd.d.ts" />

import { appReducer, IAppState } from './AppDux';
import { loggerMiddleWare } from './middleware';
import * as React from 'react';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

interface IStoreInitialiserProps extends React.Props<StoreInitialiser> {
    initialState: IAppState
}

export class StoreInitialiser extends React.Component<IStoreInitialiserProps, {}> {
	
	public render(): JSX.Element {
        var w:any = {};
        if(typeof window !== 'undefined') {
            w = window;
        }
        var storeCreator = Redux.compose(
            Redux.applyMiddleware(loggerMiddleWare),
            //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
            w.devToolsExtension ? w.devToolsExtension() : f => f
        )(Redux.createStore);
        var store = storeCreator(appReducer, this.props.initialState);
        return (
            <Provider store={ store }>
            	{ React.Children.only(this.props.children) }
            </Provider>
        );
    }
}
