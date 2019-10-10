import React from 'react'

import Account from './accountScreen'
import Login from './login'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            login_acces: false,
        }
    }
    render(){
        return this.state.login_acces == true ? <Account/> : <Login/> 
    }
}

export default Index