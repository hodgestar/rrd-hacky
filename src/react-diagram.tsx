/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import * as d3 from 'd3';
import { IAppState, IAppNode } from './app';

//I've rewritten diagram to use React Rendering.  It is much more succint and I think we should go with this.
//It also integrates better with my debugging and testing tools.
//However the scaling and translation helpers in d3 rock (we could use this to map diagram coords to viewport for zooming and panning).
//Likewise I'm sure we're going to get a lot of use out of other d3 helpers.

//Important things to notice about the render method below:
//* className is used to set HTML (and SVG classes) as class is a reserved word in JS.
//* the key property must always be set on collections as it drastically improves DOM update efficiency.
//* arrow functions rule :P 
export class Diagram extends React.Component<IAppState, {}> {

  public render () {
    return (
      <svg className="diagram" width="400" height="400">
        <g className="diagram-nodes">
            {
                this.props.data.map((d, i, arr) =>
                    <rect className="diagram-node" key={d.id} x={d.x} y={d.y} width={d.w} height={d.h}  />)
            }
        </g>
      </svg>
    );
  }
}
