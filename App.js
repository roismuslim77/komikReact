/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';

import HomeScreen from './src/Home/screen'
import RootNavigator from './src/public/navigator/RootNavigator'

export default class App extends React.Component{
  render(){
    return(
      <RootNavigator/>
    )
  }
}
