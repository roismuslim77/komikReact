import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class Index extends React.Component{
    render(){
        return(
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
            </View>
        )
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
export default Index