import React from 'react'
import { View, TouchableOpacity} from 'react-native'
import { Icon } from 'native-base'
import { connect } from 'react-redux'

import Shimmer from '../../public/shimmer/shimmer'

class Index extends React.Component{
    render(){
        if(this.props.getMangaRecent.isLoading){
            return(
                <View style={{width: 99, marginTop: 9, marginRight: 9}}>
                    <Shimmer autoRun={true} visible={false} style={{width: 99, height: 139}} borderRadiusContainer={10}>
                    </Shimmer>
                    <View style={{height: 35, marginBottom: 4}}>
                            <Shimmer autoRun={true} visible={false} style={{width: 99, height: 30, marginTop: 7}} borderRadiusContainer={5}></Shimmer>
                    </View>
                    <Shimmer autoRun={true} visible={false} style={{width: 99, height: 10, marginTop: 7}} borderRadiusContainer={5}></Shimmer>
                </View>
            )
        }else{
            return(
                <TouchableOpacity onPress={()=>{alert('pressed')}} style={{width: 99, marginTop: 9, marginRight: 9}}>
                    <View style={{width: 99, height: 139, backgroundColor: '#4B4B4B', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='add-circle' type='Ionicons' style={{fontSize: 30, color: '#4AAFF7'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const mapStateToProps=(state)=>{
    return state
}

export default connect(mapStateToProps)(Index)