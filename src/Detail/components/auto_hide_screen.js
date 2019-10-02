import React from 'react'
import {View} from 'react-native'

const CustomView = (props)=>{
    const { children, hide, style } = props
    if(hide) return null
    return (
        <View style={style} {...this.props}>
            {children}
        </View>
    ) 
}

export default CustomView