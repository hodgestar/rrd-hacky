import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';

export class Diagram extends React.Component<{}, {}> {

  static displayName = 'Diagram';

  static propTypes = {
    data: React.PropTypes.array,
  };

  constructor (props) {
    super(props);
  }

  private static _createDiagram (el, state) {
      // TODO
  }

  private static _updateDiagram (el, state) {
      // TODO
  }

  private static _destroyDiagram (el) {
      // TODO
  }

  private getDOMNode () {
    return ReactDOM.findDOMNode(this);
  }

  public componentDidMount () {
      var el = this.getDOMNode();
      Diagram._createDiagram(el, this.getChartState());
  }

  public componentDidUpdate () {
      var el = this.getDOMNode();
      Diagram._updateDiagram(el, this.getChartState());
  }

  public getChartState () {
      return {
        data: this.props.data,
      };
  }

  public componentWillUnmount () {
      var el = this.getDOMNode();
      Diagram._destroyDiagram(el);
  }

  public render () {
    return (
      <div>
        Like Foo
      </div>
    );
  }
}
