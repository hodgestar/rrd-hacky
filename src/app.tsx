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

interface IAppState {
    data: any[];

}

export class App extends React.Component<IAppState, IAppState> {

    constructor(props) {
        super(props);
    }

    public state: IAppState = {
        data: sampleData
    };

    public render() {
        return (<div>
            <Diagram data={ this.state.data } />
        </div>);
    }

}

ReactDOM.render(React.createElement(App, null), document.getElementById("react-root"));
