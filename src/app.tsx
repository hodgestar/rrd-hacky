import {Diagram} from './diagram';
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

export class App extends React.Component<IAppState, {}> {

    constructor(props: IAppState) {
        super(props);
    }

    public render() {
        return <div>
            <Diagram data={ this.props.data } />
        </div>;
    }

}

ReactDOM.render(<App data={ sampleData } />, document.getElementById("react-root"));