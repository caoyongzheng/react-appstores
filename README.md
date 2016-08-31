# react-app-store
a react store util, dispatch state and actions to child components

# Componets
1. AppStores: a class to store all kinds of states and actions,also dispatch state to related Connectors  when state changed.

2. AppStoresProvider: a React Componet to pass the global AppStores instance child components

3. Connectors: a React Componet to connect AppStores, pass its state and actions to children

4. Store: this app store class for init AppStores

# Usage
see examples director
```
npm i
npm start
http://localhost:9090/examples
```
