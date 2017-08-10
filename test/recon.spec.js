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

  it('should return proper selector', () => {
    const { selectors } = testController;

    const actualSelectors = Object.keys(selectors);
    const expectedSelectors = ['getUsers'];

    expect(expectedSelectors).to.have.all.members(actualSelectors);
  });
});
