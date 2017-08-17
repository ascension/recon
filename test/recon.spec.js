/* global describe, it, before */

import chai from 'chai';
import reduxController from '../lib/library.js';

chai.expect();

const expect = chai.expect;

const initialState = { users: { 1: { name: 'Johnny' } } };
let testController;

describe('Redux Controller', () => {
  before(() => {
    const actions = {
      updateEmail: {
        // updateEmail(123, 'johny.appleseef@apple.com')
        createPayload: (userId, email) => ({ userId, email }),
        handler: ({ users }, { userId, email }) => {
          const user = users[userId];

          return { users: { ...users, [userId]: { ...user, email } } };
        }
      },
      updateName: {
        createPayload: (userId, name) => ({ userId, name }),
        handler: ({ users }, { userId, name }) => {
          const user = users[userId];

          return { users: { ...users, [userId]: { ...user, name } } };
        }
      }
    };

    const selectors = {
      getUsers: state => state.users
    };

    testController = reduxController(initialState, actions, selectors);
  });

  it('should have the proper initial state', () => {
    expect(testController.initial).to.be.eql(initialState);
  });

  it('should return proper set of actions', () => {
    const { actions } = testController;

    const actualActions = Object.keys(actions);

    const expectedAction = ['updateEmail', 'updateName'];

    expect(expectedAction).to.have.all.members(actualActions);
  });

  describe('actions', () => {
    it('should have a property of `type`', () => {
      const { actions } = testController;

      const actualActions = Object.keys(actions);

      actualActions.forEach(key => {
        const action = actions[key];

        expect(action).to.have.property('type');
        expect(action.type).to.be.eql(key);
      });
    });
  });

  it('should return proper selector', () => {
    const { selectors } = testController;

    const actualSelectors = Object.keys(selectors);
    const expectedSelectors = ['getUsers'];

    expect(expectedSelectors).to.have.all.members(actualSelectors);
  });

  it('should have a reducer function', () => {
    const { reducer } = testController;

    expect(reducer).to.be.a('function');
  });

  it('should handle an action and update state properly', () => {
    const { reducer, actions: { updateEmail } } = testController;
    const mockAction = updateEmail(1, 'test@example.com');

    expect(mockAction).to.have.property('type');
    expect(mockAction).to.have.property('payload');

    const { type, payload } = mockAction;

    expect(type).to.equal('updateEmail');
    expect(payload).to.have.property('userId');
    expect(payload).to.have.property('email');

    const newState = reducer(initialState, mockAction);

    expect(newState).to.have.property('users');
    expect(newState).to.be.eql({ users: { '1': { name: 'Johnny', email: 'test@example.com' } } });
  });

  describe('selector', () => {
    it('should be a function', () => {
      const { selectors: { getUsers } } = testController;

      expect(getUsers).to.be.a('function');
    });
    it('should return the proper value for a state fragement', () => {
      const mockState = initialState;
      const { selectors: { getUsers } } = testController;

      expect(getUsers(mockState)).to.be.eql(mockState.users);
    });
  });
});
