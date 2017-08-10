// import { createSelector } from 'reselect';

export const reduxController = (initialState = {}, actionHandlers = {}, selectors = {}, fragment = '') => {
  function reducer(state = initialState, { type, payload } = {}) {
    const handler = actionHandlers[type];

    return handler ? handler(state, payload) : state;
  }

  const mappedSelectors = Object.keys(selectors).reduce(
    (selectorsObj, key) =>
      Object.assign({}, selectorsObj, {
        [key]: selectors[key]
      }),
    {}
  );

  //   const actions = {};
  // Map action handlers to actions
  const actions = Object.keys(actionHandlers).reduce(
    (actionsObj, key) =>
      Object.assign({}, actionsObj, {
        [key]: Object.assign(
          (...args) => ({
            type: `${key}`,
            payload:
              typeof actionHandlers[key].createPayload === 'function' ?
                actionHandlers[key].createPayload(...args) :
                undefined
          }),
          { type: `${key}` } // allows us to call action.type = 'updateEmail'
        )
      }),
    {}
  );

  return {
    initial: initialState,
    actions,
    reducer,
    selectors: mappedSelectors
  };
};

export default reduxController;
