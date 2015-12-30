import {Diagram} from './diagram';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

var sampleData = [];

interface IAppState {
    data: any[];
    
}

class App extends React.Component<IAppState, IAppState> {
    
    public getInitialState(): IAppState {
        return {data: sampleData};
    }
    
    public render() {
        return (<div>
            <Diagram data={ this.state.data } />
        </div>);
    }
    
}

ReactDOM.render(React.createElement(App, null), document.getElementById("react-root"));
