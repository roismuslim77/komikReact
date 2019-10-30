import React from 'react';
import { StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from '../../Home/screen'
import ExploreScreen from '../../Explore/screen'
import SavedScreen from '../../Saved/screen'
import AccountScreen from '../../Account/screen/login'
import DetailScreen from '../../Detail/screen/detail_manga'
import ChapterScreen from '../../Detail/screen/chapter_manga'
import GenreScreen from '../../Genres/screen'
import MoreScreen from '../../Home/screen/more_screen'

const BottomNav = createMaterialBottomTabNavigator({
    Home: { 
        screen: HomeScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='home' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    },
    Explore: { 
        screen: ExploreScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='explore' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    },
    Saved: { 
        screen: SavedScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='book' style={[styles.IconBar,{color: tintColor}]} />
              ),
        })
    },
    Account: { 
        screen: AccountScreen,
        navigationOptions: ()=>({
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon name='person' style={[styles.IconBar,{color: tintColor}]} />
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
    initialRouteName: 'Home'
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
    },
    MoreScreen: {
        screen: MoreScreen
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