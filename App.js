/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import HomeScreen from './src/Home/screen'
import RootNavigator from './src/public/navigator/RootNavigator'
import {persistor, store} from './src/public/store'

export default class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator/>
        </PersistGate>
      </Provider>
    )
  }
}
