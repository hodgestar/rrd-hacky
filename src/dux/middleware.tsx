
export let loggerMiddleWare = (store: Redux.Store) => next => (action) => {
    console.log('Action: ', action);
    return next(action);
}