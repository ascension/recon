import invariant from 'invariant';

export const reduxController = (initialState = {}, actionHandlers = {}, selectors = {}, fragment = '') => {
  function reducer(state = initialState, { type, payload } = {}) {
    const action = actionHandlers[type];

    return action && typeof action.handler === 'function' ? action.handler(state, payload) : state;
  }

  const mappedSelectors = Object.keys(selectors).reduce(
    (selectorsObj, key) =>
      Object.assign({}, selectorsObj, {
        [key]: selectors[key]
      }),
    {}
  );

  // Map action handlers to actions
  const actions = Object.keys(actionHandlers).reduce((actionsObj, key) => {
    invariant(actionsObj['key'], `You must provide actions with a unique key. Please check for a duplicate of ${key}`);
    invariant(key !== '', "An action must not be '' ");

    return Object.assign({}, actionsObj, {
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
    });
  }, {});

  return {
    initial: initialState,
    actions,
    reducer,
    selectors: mappedSelectors
  };
};

export default reduxController;
