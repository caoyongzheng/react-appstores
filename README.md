# react-store-set
a react store manager, dispatch state and actions to connected components

# Componets
1. StoreSet: a store set, when user trigger an action (one of store's action, the store is belong to StoreSet), StoreSet then dispatch the action.
in the dispatch there three step:
  1. update the store's state with newState in the action.
  2. notify the connectors to update
  3. make dispatch callBack

2. StoreSetProvider: provider the global storeSet instance to its child's components

3. Connector: a React Componet, to connect the storeSet, when the storeSet dispatch an action, the Connector will be notified to update, and pass new props to its child's Componet

4. Store: a Class with state and actions, a unit stored in the the global storeSet

# Usage
see examples directory
```
npm i
npm start
http://localhost:9090/examples
```
