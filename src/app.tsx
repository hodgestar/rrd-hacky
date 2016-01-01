/// <reference path="../typings/tsd.d.ts" />
// Please Ignore the above line.  It helps with intellisense in my dumb text editor.

//import {Diagram} from './diagram';
import {Diagram} from './react-diagram';
import * as React  from 'react';
import * as ReactDOM from 'react-dom';

var sampleData = [
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
];

export interface IAppState {
    data: IAppNode[];
}

export interface IAppNode {
    title: string;
    id: number;
    w: number;
    h: number;
    x: number;
    y: number;
}

class App extends React.Component<IAppState, {}> {

    public render() {
        return (
            <div className="app-container">
                <div className="toolbar">Toolbar</div>
                <div className="bottom-container">
                    <div className="toolbox">Toolbox</div>
                    <Diagram data={ this.props.data } />
                    <div className="properties">Properties</div>
                </div>
            </div>
        );
    }

}

ReactDOM.render(<App data={ sampleData } />, document.getElementById("react-root"));