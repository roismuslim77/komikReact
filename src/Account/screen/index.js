import React from 'react'
import {AsyncStorage} from 'react-native'

import Account from './accountScreen'
import Login from './login'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            login_acces: false,
            name: '',
            email: '',
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('name', (err, result)=>{
            if(result) this.setState({name: result})
        })
        AsyncStorage.getItem('email', (err, result)=>{
            if(result){
                this.setState({email: result, login_acces: true})
            }
        })
    }
    render(){
        return this.state.login_acces == true ? <Account/> : <Login/> 
    }
}

export default Index