import React, { Component } from 'react';
import {View,Text,StyleSheet,NativeModules,TouchableHighlight, AsyncStorage} from 'react-native';
const FacebookUtil = NativeModules.FacebookUtil;
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'

import {authPending} from '../../public/actions/auth'

const globals = {
  login: 'Sign in with Facebook',
  logout: 'Logout from Facebook'
};

class LoginButton extends Component {
  constructor (props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      globals: globals,
      status: this.props.loginStatus,
      text: globals.login
    };
  }

  componentDidMount(){
    if(this.state.status)
    this.setState({text: this.state.globals.logout})
    else 
    this.setState({text: this.state.globals.login})
  }

  onLogin() {
    if(this.state.status){
      this.logout()
    }
    else{
      this.props.dispatch(authPending())
      this.login()
    }
  }

  login() {
    let permissions = [];
    FacebookUtil.login(
      (err,data) => {
        console.log('returning fom loginWithPermissions')
        this.handleLogin(err,data)
      }
    );
  }

  logout() {
    FacebookUtil.logout((err, data) => {
      this.setState({status:false, text: this.state.globals.login});
      if(data){
          AsyncStorage.clear()
          this.handleLogin(err, data);
      }
    })
  }

  handleLogin(e, data) {
    const result = e || data;
    if(result.profile){
      try{
        result.profile = JSON.parse(result.profile)
        this.setState({status:true, text: this.state.globals.logout});
        // AsyncStorage.setItem('name', result.profile.name)
        // AsyncStorage.setItem('email', result.profile.email)
      } catch (err) {
        console.error(err);
      }
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
      <TouchableHighlight style={{flex: 1, height: 38}} onPress={this.onLogin}  >
         <View style={[styles.button]}>
            <Icon style={{color: 'white', flex: 1, fontSize: 25}} name='facebook-square'/>
            <Text style={[styles.whiteText]}>{text}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state)=>{
    return state.reducer
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#3B5998',
    flexDirection: 'row', 
    borderRadius: 3
  },
  whiteText: {
    flex: 3,
    color: 'white',
    fontSize: 10, fontWeight: 'bold'
  }
});

export default connect(mapStateToProps)(LoginButton)