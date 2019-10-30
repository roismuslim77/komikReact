import React from 'react'
import {AsyncStorage, AppRegistry, View, Text, StyleSheet, TextInput, TouchableHighlight, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'

import GoogleLogin from '../components/googleAuth'
import FacebookLogin from '../components/facebookAuth'
import Account from '../screen/accountScreen'
import axios from 'axios'

import { authFul, authPending, authRejected} from '../../public/actions/auth'
import { lovedClear, lovedFul } from '../../public/actions/loved'

const base_api = 'http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin: false,
            modal: false,
            userInput: '',
            passwordInput: ''
        }
    }

    loginApp = async() => {
        this.props.dispatch(authPending())
        await axios.post(base_api+'/auth/login',{
            'email':this.state.userInput,
            'password':this.state.passwordInput
        }).then((res)=>{
            axios.post(base_api+'/auth/verify',{
                'token': res.data.data.token
            }).then((res)=>{
                if(res.data.status == 200){
                    axios.get(base_api+'/manga/loved/'+res.data.data.id)
                    .then((res)=>{
                        var id=[]
                        if(res.data.result.length == 0){
                            this.props.dispatch(lovedFul(id))
                        }else{
                            res.data.result.rows.map((data)=>{
                                id.push(data.manga_id)
                            })
                            axios.post(base_api+'/manga/list',{
                                'id':id
                            }).then((res)=>{
                                this.props.dispatch(lovedFul(res.data.result.rows))
                            }).catch((err)=>{
                                alert(err)
                            })
                        }
                    }).catch((err)=>alert('loved'+err))
                    this.props.dispatch(authFul(res.data.data, 'native'))
                    this.setState({isLogin: true})
                }else{
                    this.props.dispatch(authRejected())
                }
            }).catch((err)=>{
                alert(JSON.stringify(err))
                this.props.dispatch(authRejected())
            })
        }).catch((err)=>{
            Alert.alert('Notify',err.response.data.message)
            this.props.dispatch(authRejected())
        })
    }

    loginFb = async(result)=>{
        if(result.profile){
            await axios.get(base_api+'/manga/loved/'+result.profile.id)
            .then((res)=>{
                var id=[]
                if(res.data.result.length == 0){
                    this.props.dispatch(lovedFul(id))
                }else{
                    res.data.result.rows.map((data)=>{
                        id.push(data.manga_id)
                    })
                    axios.post(base_api+'/manga/list',{
                        'id':id
                    }).then((res)=>{
                        this.props.dispatch(lovedFul(res.data.result.rows))
                    }).catch((err)=>{
                        alert(err)
                    })
                }
            }).catch((err)=>alert('loved'+err))
            await this.props.dispatch(authFul(result.profile, 'fb'))
            this.setState({isLogin: true})
        }else{
            await this.props.dispatch(authRejected())
        }
    }

    loginGoogle = async(result)=>{
        if(result.id != undefined){
            await axios.get(base_api+'/manga/loved/'+result.id)
            .then((res)=>{
                var id=[]
                if(res.data.result.length == 0){
                    this.props.dispatch(lovedFul(id))
                }else{
                    res.data.result.rows.map((data)=>{
                        id.push(data.manga_id)
                    })
                    axios.post(base_api+'/manga/list',{
                        'id':id
                    }).then((res)=>{
                        this.props.dispatch(lovedFul(res.data.result.rows))
                    }).catch((err)=>{
                        alert(err)
                    })
                }
            }).catch((err)=>alert('loved'+err))
            await this.props.dispatch(authFul(result, 'google'))
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
                    <TextInput onChangeText={(key)=>{this.setState({userInput: key})}} style={{color: 'grey', marginLeft: 3, fontSize: 20, marginRight: 50}} placeholderTextColor='grey' placeholder="Username"/>
                </View>
                <View style={{backgroundColor: 'grey', height: 1, width: '85%'}}/>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '85%', marginTop: 20}}>
                    <View style={{width: 30, alignItems: 'center'}}>
                        <Icon style={{color: 'grey', fontSize: 20}} name='lock'/>
                    </View>
                    <TextInput onChangeText={(key)=>{this.setState({passwordInput: key})}} secureTextEntry={true} style={{color: 'grey', marginLeft: 3, fontSize: 20, marginRight: 50}} placeholderTextColor='grey' placeholder="Password"/>
                </View>
                <View style={{backgroundColor: 'grey', height: 1, width: '85%'}}/>
                <TouchableHighlight onPress={()=>this.loginApp()} style={{backgroundColor: '#4AAFF7', justifyContent: 'center', alignItems: 'center', width: '85%', marginTop: 45, height: 40, borderRadius: 7}}>
                    <Text style={{color: 'white'}}>LOG IN</Text>
                </TouchableHighlight>
                <View style={{width: '100%', alignItems: 'center', marginTop: 5}}>
                    <Text style={{color: 'grey'}}>Forgot Password?</Text>
                </View>
                <View style={{flexDirection: 'row', width: '85%', marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <GoogleLogin
                        onLogin={(result)=>{
                            this.props.dispatch(lovedClear())
                            this.loginGoogle(result)
                        }}
                        loginStatus={false}
                        onError={()=> this.props.dispatch(authRejected())}
                    />
                    <View style={{flex: 0.1}}/>
                    <FacebookLogin
                        loginStatus={false}
                        onLogin={(result)=>{
                            this.props.dispatch(lovedClear())
                            this.loginFb(result)
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