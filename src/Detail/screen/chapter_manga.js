import React from 'react'
import { View, Image, ScrollView, Text, TouchableHighlight, TextInput, PanResponder , Modal} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import CustomView from '../components/auto_hide_screen'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            hidden: false,
            clearId: 0,
        }
    }

    render(){
        // alert(this.props.navigation.getParam('id'))
        return(
            <View style={{flex: 1}}>
                <CustomView hide={this.state.hidden}>
                    <View style={{opacity: 0.7,elevation: 1, position: 'absolute',backgroundColor: '#474747', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: 65, paddingLeft: 22, paddingTop: 27, paddingRight: 25, width: '100%'}}> 
                        <View style={{flexDirection: 'row'}}>
                            {/* <Icon onPress={()=>{alert('tes')}} style={{color: '#FFFFFF', fontSize: 25}} name="arrow-left"/> */}
                            <Text style={{marginLeft: 16,fontSize: 25, lineHeight: 29, color: '#FFFFFF', fontWeight: 'bold'}}>Chapter 21</Text>
                        </View>
                        {/* <Icon onPress={()=>{alert('tes')}} style={{color: '#FFFFFF', fontSize: 25}} name="info-circle"/> */}
                    </View>
                </CustomView>
                <ScrollView
                maximumZoomScale={10}
                onScrollEndDrag={()=>{this.setState({clearId: setTimeout(()=>{this.setState({hidden: true})}, 4000)})}} onScroll={()=>{this.setState({hidden: false})}} style={{flex: 1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View>
                        <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        >
                        <Image style={{ flex: 1, width: '100%', height: 597 }}
                                source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-276.jpg?quality=65'}}
                                resizeMode="contain" />
                        </ReactNativeZoomableView>
                    </View>
                    <View>
                        <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        >
                        <Image style={{ flex: 1, width: '100%', height: 597 }}
                                source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-276.jpg?quality=65'}}
                                resizeMode="contain" />
                        </ReactNativeZoomableView>
                    </View>
                    <View>
                        <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        >
                        <Image style={{ flex: 1, width: '100%', height: 597 }}
                                source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-276.jpg?quality=65'}}
                                resizeMode="contain" />
                        </ReactNativeZoomableView>
                    </View>
                    <View>
                        <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        >
                        <Image style={{ flex: 1, width: '100%', height: 597 }}
                                source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-276.jpg?quality=65'}}
                                resizeMode="contain" />
                        </ReactNativeZoomableView>
                    </View>
                    <View>
                        <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        >
                        <Image style={{ flex: 1, width: '100%', height: 597 }}
                                source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-276.jpg?quality=65'}}
                                resizeMode="contain" />
                        </ReactNativeZoomableView>
                    </View>
                    <View>
                        <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        >
                        <Image style={{ flex: 1, width: '100%', height: 597 }}
                                source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-276.jpg?quality=65'}}
                                resizeMode="contain" />
                        </ReactNativeZoomableView>
                    </View>
                </ScrollView>
                <CustomView hide={this.state.hidden}>
                    <View style={{elevation: 1, bottom: 0, position: 'absolute', opacity: 0.7, backgroundColor: '#474747',justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: 18, paddingTop: 16, paddingRight: 15, width: '100%'}}> 
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 10, justifyContent: 'center', alignItems: 'flex-start', borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.9)', marginRight: 19, paddingLeft: 13}}>
                                <TextInput onFocus={()=>clearTimeout(this.state.clearId)} style={{width: 331, height: 41, fontSize: 14, lineHeight: 16, fontWeight: 'bold'}} placeholder='What do you fill?'/>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Icon name='caret-right' style={{fontSize: 50, color: '#FFFFFF'}}/>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15, marginBottom: 18}}>
                            <View><Icon onPress={()=>alert('tes')} name='chevron-left' style={{fontSize: 25, color: '#FFFFFF'}}/></View>
                            <View><Icon name='thumbs-up' style={{fontSize: 25, color: '#FFFFFF'}}/></View>
                            <View><Icon name='comments' style={{fontSize: 25, color: '#FFFFFF'}}/></View>
                            <View><Icon name='cog' style={{fontSize: 25, color: '#FFFFFF'}}/></View>
                            <View><Icon onPress={()=>{alert('tes')}} style={{color: '#FFFFFF', fontSize: 25}} name="info-circle"/></View>
                            <View><Icon name='chevron-right' style={{fontSize: 25, color: '#FFFFFF'}}/></View>
                        </View>
                    </View>
                </CustomView>
            </View>
        )
    }
}

export default Index