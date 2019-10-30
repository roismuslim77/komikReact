import React, { Component } from 'react';
import {View,Text,StyleSheet,NativeModules,TouchableHighlight,Image, } from 'react-native';
import {connect} from 'react-redux'

import {authPending} from '../../public/actions/auth'
const GoogleUtil = NativeModules.GoogleUtil;

class GoogleLoginButton extends Component {
    constructor (props) {
        super(props);
    
        this.onLogin = this.onLogin.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    
        this.state = {
          status: false,
          text: 'Sign out'
        };
      }

      onLogin() {
        if(this.state.status)
          this.logout()
        else
          this.login()
      }
    
      login() {
        this.props.dispatch(authPending())
        GoogleUtil.setup()
        .then(() => {
          GoogleUtil.login(
            (err,data) => {
              this.handleLogin(err,data)
            }
          );
        });
      }
    
      logout() {
        GoogleUtil.logout((err, data) => {
          this.setState({status:false});
          this.handleLogin(err, data);
        })
      }
    
      handleLogin(e, data) {
        const result = e || data;
        if (result.eventName == "onLogin") {
          this.setState({status:true});
        } 

        if(result.eventName && this.props.hasOwnProperty(result.eventName)){
          const event = result.eventName;
          delete result.eventName;
          this.props[event](result);
        }
      }

      render(){
        const text = this.state.text;
        return (
          <TouchableHighlight style={{flex: 1, height: 40}} onPress={this.onLogin}  >
              <Image style={{height: '100%', borderRadius: 4}} source={{uri: 'https://raw.githubusercontent.com/eloew/AuthNative/master/img/btn_google_signin_light_normal_web.png'}}  />
          </TouchableHighlight>
        )
      }
}

const mapStateToProps = (state)=>{
  return state.reducer
}

export default connect(mapStateToProps)(GoogleLoginButton)

const styles = StyleSheet.create({
    button: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      height: 45,
      backgroundColor: 'white',
    },
    blakText: {
      color: 'black'
    }
  });