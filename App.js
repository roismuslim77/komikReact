/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react'
import { Provider } from 'react-redux'

import HomeScreen from './src/Home/screen'
import RootNavigator from './src/public/navigator/RootNavigator'
import store from './src/public/store'

export default class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    )
  }
}
