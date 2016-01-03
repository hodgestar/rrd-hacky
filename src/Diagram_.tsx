/// <reference path="../typings/tsd.d.ts" />

import { IAppState, IAppAction, IDiagramShape, toggleWidth } from './dux/AppDux';
import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';


interface IDiagramActions {
    toggleWidth?: (id:number) => void;
}

interface IDiagramProps extends IAppState, IDiagramActions, React.Props<Diagram> {}

@connect(
    Diagram.mapStateToProps,
    Diagram.mapDispatchToProps,
    Diagram.mergeProps
)
export class Diagram extends React.Component<IDiagramProps, {}> {

     public static mapStateToProps(state: IAppState, props: IDiagramProps): IDiagramProps {
        return state;
    }
    
    public static mapDispatchToProps(dispatch, ownProps: IDiagramProps): IDiagramActions {
        return Redux.bindActionCreators({ 
            toggleWidth: toggleWidth
        }, dispatch);
    }

    public static mergeProps(stateProps: IDiagramProps, dispatchProps: IDiagramActions, ownProps: IDiagramProps): IDiagramProps {
        return Object.assign({}, stateProps, dispatchProps);
    }

    public render () {
        return (
            <svg className="diagram">
                <g className="diagram-nodes">
                {
                    this.props.shapes.map((d, i, arr) =>
                        <rect className="diagram-node" key={d.id} x={d.x} y={d.y} width={d.w} height={d.h} onClick={ () => this.props.toggleWidth(d.id) } />)
                }
                </g>
            </svg>
        );
  }
}
