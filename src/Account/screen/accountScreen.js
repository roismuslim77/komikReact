import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'

import Faded from '../components/Faded'
import Facebook from '../components/facebookAuth'
import LoginScreen from '../screen/login'

import { authClear, authPending } from '../../public/actions/auth'
import { lovedClear } from '../../public/actions/loved'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin: true,
            image: 'http://google.com',
            name: '',
            email: ''
        }
    }

    componentDidMount(){
        // alert(JSON.stringify(this.props.getUser.user.name))
        if(this.props.getUser.user.name != undefined) 
        this.setState({
            isLogin: true,
            image: this.props.getUser.user.picture.data.url,
            name: this.props.getUser.user.name,
            email: this.props.getUser.user.email
        })
        else
        this.setState({isLogin: false})
    }

    render(){
        // alert(JSON.stringify(this.props.getUser.user))
        return this.state.isLogin === false ? <LoginScreen/> :
            <View style={{flex: 1}}>
                <ImageBackground resizeMode='cover' style={styles.image_background} source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/12-Beast.jpg'}}>
                    <View style={styles.headerBlack}>
                        <View style={{marginLeft: 20, marginRight: 21,flexDirection: 'row',justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                            <View>
                            </View>
                            <View>
                                <Icon style={{color: '#4AAFF7', fontSize: 25, marginRight: 5}} name="ellipsis-v"/>
                            </View>
                        </View>
                        <View style={{flex: 3}}>
                            <View style={{width: 100, height: 100, marginLeft: 50, borderColor: 'white', borderWidth: 3, borderRadius: 100}}>
                                <Image style={{width: '100%', height: '100%', borderRadius: 100}} source={{uri: this.state.image}}/>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.content}>
                    <Faded color="#181818" height={60}/>
                    <View style={{justifyContent: 'space-between', marginLeft: 45, marginTop: '-10%'}}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, lineHeight: 25, fontFamily: 'roboto'}}>{this.state.name}</Text>
                        <Text style={{color: 'grey', fontSize: 12, lineHeight: 25, fontFamily: 'roboto'}}>{this.state.email}</Text>
                        <View style={{height: 25, width: '50%', marginTop: '5%'}}>
                            <Facebook loginStatus={true} onLogout={()=>{
                                this.props.dispatch(lovedClear())
                                this.props.dispatch(authClear())
                                this.setState({isLogin: false})
                            }}/>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'rgba(255,255,255,0.1)', height: 5, marginLeft: 50, marginTop: 35, marginBottom: 10}}/>
                    <View style={{flexDirection: 'row', marginLeft: 55, justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 35}}>23</Text>
                            <Text style={{color: 'grey', fontSize: 12}}>Manga Liked</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 35, marginLeft: -40}}>40</Text>
                            <Text style={{color: 'grey', fontSize: 12, marginLeft: -40}}>Comments</Text>
                        </View>
                        <View style={{backgroundColor: '#4AAFF7', height: 40, width: 130, justifyContent: 'center', alignItems: 'flex-start', borderRadius: 50, marginRight: -30}}>
                            <Text style={{color: 'white', fontSize: 16, marginLeft: 23}}>Donate</Text>
                        </View>
                    </View>
                    <Text style={{color: 'grey', marginLeft: 50, marginTop: 30}}>RECENT VIEWS</Text>
                    <View style={{backgroundColor: 'rgba(255,255,255,0.1)', height: 5, marginTop: 7, marginLeft: 50, marginBottom: 10}}/>
                    <View style={{marginLeft: 50}}>
                        <ScrollView horizontal={true}>
                            <View style={{backgroundColor: 'grey', height: 150, width: 90, marginRight: 10}}></View>
                            <View style={{backgroundColor: 'grey', height: 150, width: 90, marginRight: 10}}></View>
                            <View style={{backgroundColor: 'grey', height: 150, width: 90, marginRight: 10}}></View>
                            <View style={{backgroundColor: 'grey', height: 150, width: 90, marginRight: 10}}></View>
                            <View style={{backgroundColor: 'grey', height: 150, width: 90, marginRight: 10}}></View>
                            <View style={{backgroundColor: 'grey', height: 150, width: 90, marginRight: 10}}></View>
                            <View style={{backgroundColor: 'grey', height: 150, width: 90, marginRight: 10}}></View>
                        </ScrollView>
                    </View>
                </View>
            </View>
    }
}

const styles = StyleSheet.create({
    headerBlack:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
    },
    content:{
        flex: 2,
        backgroundColor: '#181818',
        marginTop: -2
    },
    image_background:{
        flex: 1.1,
        width: '100%'
    }
})

const mapStateToProps = (state)=>{
    return state.reducer
}

export default connect (mapStateToProps)(Index)