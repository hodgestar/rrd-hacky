/// <reference path="../typings/tsd.d.ts" />

import { Diagram } from './Diagram';
import { StoreInitialiser } from './dux/StoreInitialiser';
import { IAppState } from './dux/AppDux';
import * as React  from 'react';
import * as ReactDOM from 'react-dom';

var sampleData = {
    shapes: [
        {
            title: "Node 1",
            id: 1,
            w: 80, h: 40,
            x: 50, y: 50,
        },
        {
            title: "Node 2",
            id: 2,
            w: 80, h: 40,
            x: 150, y: 150,
        },
    ]
};

interface IAppProps extends IAppState, React.Props<App> {}

class App extends React.Component<IAppState, {}> {

    public render() {
        return (
            <StoreInitialiser initialState={ sampleData } >
                <div className="app-container">
                    <div className="toolbar">Toolbar</div>
                    <div className="bottom-container">
                        <div className="toolbox">Toolbox</div>
                        <Diagram />
                        <div className="properties">Properties</div>
                    </div>
                </div>
            </StoreInitialiser>
        );
    }

}

ReactDOM.render(<App />, document.getElementById("react-root"));