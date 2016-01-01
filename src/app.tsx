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
        w: 50, h: 50,
        x: 50, y: 50,
    },
    {
        title: "Node 2",
        id: 2,
        w: 50, h: 50,
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
        return <Diagram data={ this.props.data } />;
    }

}

ReactDOM.render(<App data={ sampleData } />, document.getElementById("react-root"));