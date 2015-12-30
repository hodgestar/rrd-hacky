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
      var svg = d3.select(el)
          .attr('width', 400)
          .attr('height', 400);
      svg.append('g')
          .attr('class', 'diagram-nodes');
      Diagram._updateDiagram(el, state);
  }

  private static _updateDiagram (el, state) {
      var g = d3.select(el).selectAll('.diagram-nodes');

      var node = g.selectAll('.diagram-node')
          .data(state.data, function(d) { return d.id; });

        // enter
        node.enter()
            .append('rect')
            .attr('class', 'diagram-node');

        // enter and update
        node
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .attr('width', function(d) { return d.w; })
            .attr('height', function(d) { return d.h; });

        // exit
        node.exit()
            .remove();

  }

  private static _destroyDiagram (el) {
      var svg = d3.select(el);
      svg.remove();
  }

  private getDOMNode () {
    return ReactDOM.findDOMNode(this);
  }

  public componentDidMount () {
      var el = this.getDOMNode();
      Diagram._createDiagram(el, this.getChartState());
  }

  //DO NOT USE
  //React will keep removing the existing d3 DOM.
//   public componentDidUpdate () {
//       var el = this.getDOMNode();
//       Diagram._updateDiagram(el, this.getChartState());
//   }
  
  //RATHER UPDATE IN THE BELOW METHOD and RETURN false.
  public shouldComponentUpdate() {
      var el = this.getDOMNode();
      Diagram._updateDiagram(el, this.getChartState());
      return false;
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
      <svg class="diagram"></svg>
    );
  }
}
