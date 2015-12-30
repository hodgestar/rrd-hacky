import * as React from 'react';
import * as d3 from 'd3';

export class Diagram extends React.Component<{}, {}> {

  static displayName = 'Diagram';

  static propTypes = {
    title: React.PropTypes.string,
  };

  constructor () {
    super();
  }

  getDefaultProps () {
    return {
      title: "Unknown diagram",
    };
  }

  render () {
    return (
      <Diagram>
      </Diagram>
    );
  }
}
