import React from 'react'
import {View, Text, StyleSheet, ScrollView, Image, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class Index extends React.PureComponent{
    render(){
        return(
            <View key={this.props.data.id} style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
                <View style={{flex: 1}}>
                    <Image style={{width: 99, height: 139, borderRadius: 10}} source={{uri: this.props.data.image}}/>
                </View>
                <View style={{flex: 2 ,width: '100%', marginRight: 22.27,}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Text numberOfLines={1} style={{flex: 7,color:'#E0E0E0', marginTop: 5, fontSize: 16, lineHeight: 19,fontWeight: 'bold'}} ellipsizeMode='tail'>{this.props.data.title}</Text>
                        <TouchableHighlight style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%'}} onPress={()=> {this.sendMangaLoved(this.props.data.id, this.state.id)}}>
                            <Icon name='heart' style={{color: '#ffffff', fontSize: 22}}/>
                            {/* <View>{this.getIconLoved(this.props.data.id)}</View> */}
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1}}>
                        <Text numberOfLines={1} style={{color:'#E0E0E0', marginTop: 5, fontSize: 12, lineHeight: 14}}>{this.props.data.genre}</Text>
                    </View>
                    <View style={{flex: 2,}}>
                        <Text numberOfLines={5} style={{color:'#E0E0E0',fontSize: 11, lineHeight: 12, textAlignVertical: 'top'}} ellipsizeMode='tail'>{this.props.data.sinopsis}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-start', paddingLeft: 5}}>
                        <View style={{flexDirection: 'row', marginRight: 14}}>
                            <Icon name='eye' style={{color: '#4AAFF7', fontSize: 11, marginRight: 3}}/>
                            <Text style={{color: '#4AAFF7', fontSize: 12, fontWeight: 'bold', lineHeight: 14}}></Text>
                        </View>
                        <View style={{flexDirection: 'row', marginRight: 14}}>
                            <Icon name='heart' style={{color: '#4AAFF7', fontSize: 11, marginRight: 3}}/>
                            <Text style={{color: '#4AAFF7', fontSize: 12, fontWeight: 'bold', lineHeight: 14}}></Text>
                        </View>
                        <View style={{flexDirection: 'row', marginRight: 14}}>
                            <Icon name='star' style={{color: '#4AAFF7', fontSize: 11, marginRight: 3}}/>
                            <Text style={{color: '#4AAFF7', fontSize: 12, fontWeight: 'bold', lineHeight: 14}}>{this.props.data.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Index