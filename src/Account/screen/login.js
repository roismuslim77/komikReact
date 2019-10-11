import React from 'react'
import {AsyncStorage, AppRegistry, View, Text, StyleSheet, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'

import GoogleLogin from '../components/googleAuth'
import FacebookLogin from '../components/facebookAuth'
import Account from '../screen/accountScreen'

import { authFul, authPending, authRejected} from '../../public/actions/auth'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin: false,
            modal: false
        }
    }
    loginApp = async(result)=>{
        if(result.profile){
            await this.props.dispatch(authFul(result.profile))
            this.setState({isLogin: true})
        }else{
            await this.props.dispatch(authRejected())
        }
    }

    componentDidMount(){
        if(this.props.getUser.user.name != undefined) {
            this.setState({isLogin: true})
        }
        else{
            this.setState({isLogin: false})
        }
    }

    render(){
        return this.props.getUser.isLoading === true ?
        <View style={{backgroundColor: 'rgba(0,0,0,0.8)', flex: 1, justifyContent: 'center', alignItems: 'center'}} > 
            <ActivityIndicator color="white" size="large"/>
        </View>
        : 
        this.state.isLogin === false ? 
            <View style={styles.header_black}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '85%'}}>
                    <View style={{width: 30, alignItems: 'center'}}>
                        <Icon style={{color: 'grey', fontSize: 20}} name='envelope'/>
                    </View>
                    <TextInput style={{color: 'grey', marginLeft: 3, fontSize: 20, marginRight: 50}} placeholderTextColor='grey' placeholder="Username"/>
                </View>
                <View style={{backgroundColor: 'grey', height: 1, width: '85%'}}/>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '85%', marginTop: 20}}>
                    <View style={{width: 30, alignItems: 'center'}}>
                        <Icon style={{color: 'grey', fontSize: 20}} name='lock'/>
                    </View>
                    <TextInput secureTextEntry={true} style={{color: 'grey', marginLeft: 3, fontSize: 20, marginRight: 50}} placeholderTextColor='grey' placeholder="Password"/>
                </View>
                <View style={{backgroundColor: 'grey', height: 1, width: '85%'}}/>
                <TouchableHighlight style={{backgroundColor: '#4AAFF7', justifyContent: 'center', alignItems: 'center', width: '85%', marginTop: 45, height: 40, borderRadius: 7}}>
                    <Text style={{color: 'white'}}>LOG IN</Text>
                </TouchableHighlight>
                <View style={{width: '100%', alignItems: 'center', marginTop: 5}}>
                    <Text style={{color: 'grey'}}>Forgot Password?</Text>
                </View>
                <View style={{flexDirection: 'row', width: '85%', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <GoogleLogin
                        onLogin={(result)=>{
                            if(result.message){
                                alert('error '+result.message+result.code)
                            }else{
                                alert('Login successful '+result.name+', '+result.email)
                            }
                        }}
                        onLogout={()=>alert('logged out')}
                        onError={(result)=>{
                            if (result.error) {
                                alert('error:  '+ result.error)
                              } else {
                                alert('error')
                              }
                        }}
                    />
                    <View style={{flex: 0.1}}/>
                    <FacebookLogin
                        loginStatus={false}
                        onLogin={(result)=>{
                            this.loginApp(result)
                        }}
                        // onLogout={}
                    />
                </View>
            </View>
            : <Account/>
    }
}

const styles = StyleSheet.create({
    header_black:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)', 
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state)=>{
    return state.reducer
}
export default connect(mapStateToProps)(Index)