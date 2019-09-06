import React from 'react';
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Icon } from 'native-base'

import HomeScreen from '../../Home/screen'
import ExploreScreen from '../../Explore/screen'

const BottomNav = createMaterialBottomTabNavigator({
    Home: { 
        screen: HomeScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='home' type='MaterialIcons' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    },
    Explore: { 
        screen: ExploreScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='explore' type='MaterialIcons' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    },
    Saved: { 
        screen: ExploreScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='book' type='MaterialIcons' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    },
    Account: { 
        screen: ExploreScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='person' type='Ionicons' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    }
},{
    activeTintColor: '#4AAFF7',
    inactiveTintColor: '#474747',
    shifting: true,
    labeled: 'bold',
    barStyle: {
        backgroundColor: 'white',
    }
})

const RootNav = createStackNavigator({
    HomeRoot: BottomNav,
},{
    initialRouteName: 'HomeRoot',
    headerMode: 'none'
})

export default createAppContainer(RootNav)

const styles = StyleSheet.create({
    IconBar: {
        fontSize: 25,
    }
})