# recon
Redux Controller Pattern

## Status: In Developement
This library is currently in developement and open to suggestions.

## The problem
Redux is wonderful, but writing the boilerplate required to update and retrieve state can be tedious.
The intention of this library is to reduce the boilerplate needed to do all things redux.
There are many libraries that make managing parts of redux easier such as: reselect, normalizr, autodux, redux-fsa.
But there isnt a tool kit out there that brings all these together and make it easy to implement.
That is where Redux Controller comes in. 

## The solution: Redux Controller
A Controller configures and manages a specific slice of the store, actions, reducer and selectors.

## Redux Controller

### Action Handlers
The are the functions which have the responsibilty of updating the store when an action is dispatched. Most redux tutorials/implementations use a switch statement. A `ReduxController` will return a reducer that uses an `Object` to map an action to its handler function. 

[ ] - Should allow user to create actions
[ ] - Should return an object with a prop of reducer
[ ] - Should allow user to define selectors 
[ ] - Should allow user to easily use an action in multiple reducers.
[ ] - Provides HOC for dispatching actions to fetch data required for a component.
[ ] - 
[ ] - 

## Considerations

Namespacing for redux actions is important but how should it be name?
- should it be named after the slice/substate the controller or action is part of?
- should we allow a actionPrefix to be passed/configured?
