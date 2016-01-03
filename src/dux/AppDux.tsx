/// <reference path="../../typings/tsd.d.ts" />

export interface IAppState {
    shapes?: IDiagramShape[];
}

export interface IDiagramShape {
    title: string;
    id: number;
    w: number;
    h: number;
    x: number;
    y: number;
}

export interface IAppAction {
    type: string
    id?: number;
}

export abstract class AppActions {
    public static TOGGLE_WIDTH = "toggle/width";
}

export function appReducer(state: IAppState, action: IAppAction) {
    switch(action.type) {
        case AppActions.TOGGLE_WIDTH:
            var i = state.shapes.findIndex((shape: IDiagramShape) => {
                return shape.id === action.id;
            });
            var shapesCopy = state.shapes.slice(0);
            var toggleItem = shapesCopy[i];
            toggleItem.w = toggleItem.w === 40 ? 80 : 40;
            shapesCopy.splice(i, 1, toggleItem);
            return {
                shapes: shapesCopy
            };
        default:
            return state;
    }
}

export function toggleWidth(id: number) {
    return {
        type: AppActions.TOGGLE_WIDTH,
        id: id    
    };
}