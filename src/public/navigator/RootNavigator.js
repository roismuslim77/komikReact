import React from 'react';
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Icon } from 'native-base'

import HomeScreen from '../../Home/screen'
import ExploreScreen from '../../Explore/screen'
import SavedScreen from '../../Saved/screen'
import AccountScreen from '../../Account/screen'
import DetailScreen from '../../Detail/screen/detail_manga'
import ChapterScreen from '../../Detail/screen/chapter_manga'
import GenreScreen from '../../Genres/screen'

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
        screen: SavedScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='book' type='MaterialIcons' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    },
    Account: { 
        screen: AccountScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='person' type='Ionicons' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    }
},{
    activeTintColor: '#4AAFF7',
    inactiveTintColor: '#DDDDDD',
    shifting: true,
    labeled: 'bold',
    barStyle: {
        backgroundColor: '#181818',
    },
    initialRouteName: 'Account'
})

const RootNav = createStackNavigator({
    HomeRoot: BottomNav,
    DetailScreen: {
        screen: DetailScreen
    },
    ChapterScreen: {
        screen: ChapterScreen
    },
    GenreScreen: {
        screen: GenreScreen
    }
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