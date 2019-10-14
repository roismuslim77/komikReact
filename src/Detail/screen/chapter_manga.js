import React from 'react'
import { View, Image, ScrollView, Text, TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Axios from 'axios';
import {connect} from 'react-redux'
import Images from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import CustomView from '../components/auto_hide_screen'
import {getMangaChapterFul, getMangaChapterPending, getMangaChapterRejected} from '../../public/actions/mangaChapter'

const base_uri = 'http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            hidden: false,
            clearId: 0,
            chapter: this.props.navigation.getParam('chapter'),
            id_manga: this.props.navigation.getParam('id'),
            img_load: false
        }
    }

    componentDidMount(){
        this.getListChapter(1)
    }
    
    getListChapter = (datas)=>{
        let params =null
        if(datas == 1){
            params = 1
        }
        this.props.dispatch(getMangaChapterPending())
        Axios.post(base_uri+'/manga/'+this.state.id_manga+'/chapter/'+this.state.chapter+'?limit=5&page=1')
        .then((res)=>{
            this.props.dispatch(getMangaChapterFul(res.data.result.rows, params))
        }).catch((err)=>{
            alert(err)
        })
    }

    renderListChapter =()=>{
        // alert(JSON.stringify(this.props.getMangaChapter.manga))
        return this.props.getMangaChapter.manga.map((data, key)=>{
            return(
                <View key={key}>
                    <ReactNativeZoomableView
                    maxZoom={2}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    >
                    <Images
                        source={{ uri: String(data.url_image)}} 
                        resizeMode="contain"
                        indicator={Progress.Circle}
                        style={styles.image}/>
                    </ReactNativeZoomableView>
                </View>
            )
        })
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <CustomView hide={this.state.hidden}>
                    <View style={styles.header_auto}> 
                        <View style={{flexDirection: 'row'}}>
                            {/* <Icon onPress={()=>{alert('tes')}} style={{color: '#FFFFFF', fontSize: 25}} name="arrow-left"/> */}
                            <Text style={styles.text}>Chapter 21</Text>
                        </View>
                        {/* <Icon onPress={()=>{alert('tes')}} style={{color: '#FFFFFF', fontSize: 25}} name="info-circle"/> */}
                    </View>
                </CustomView>
                <ScrollView
                maximumZoomScale={10}
                onScrollEndDrag={()=>{this.setState({clearId: setTimeout(()=>{this.setState({hidden: true})}, 4000)})}} 
                onScroll={()=>{this.setState({hidden: false})}} 
                style={{flex: 1}} 
                showsHorizontalScrollIndicator={false} 
                showsVerticalScrollIndicator={false}>
                    {this.renderListChapter()}
                </ScrollView>
                <CustomView hide={this.state.hidden}>
                    <View style={styles.footer_container}> 
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.search}>
                                <TextInput onFocus={()=>clearTimeout(this.state.clearId)} style={styles.search_input} placeholder='What do you fill?'/>
                            </View>
                            <View style={styles.search_btn}>
                                <Icon name='caret-right' style={styles.search_icon}/>
                            </View>
                        </View>
                        <View style={styles.footer_icon_contain}>
                            <View><Icon onPress={()=>alert('tes')} name='chevron-left' style={styles.footer_icon}/></View>
                            <View><Icon name='thumbs-up' style={styles.footer_icon}/></View>
                            <View><Icon name='comments' style={styles.footer_icon}/></View>
                            <View><Icon name='cog' style={styles.footer_icon}/></View>
                            <View><Icon onPress={()=>{alert('tes')}} style={styles.footer_icon} name="info-circle"/></View>
                            <View><Icon name='chevron-right' style={styles.footer_icon}/></View>
                        </View>
                    </View>
                </CustomView>
            </View>
        )
    }
}

const mapStateToProps = (state)=>{
    return state.reducer
}

const styles = StyleSheet.create({
    image:{
        height:597,
        flex:1,
        width: '100%'
    },
    header_auto:{
        opacity: 0.7,
        elevation: 1,
        position: 'absolute',
        backgroundColor: '#474747',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 65, paddingLeft:22,
        paddingTop: 27,
        paddingRight: 25,
        width: '100%'
    },
    text:{
        marginLeft: 16,
        fontSize: 25,
        lineHeight: 29, 
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    footer_container:{
        elevation: 1,
        bottom: 0,
        position: 'absolute',
        opacity: 0.7,
        backgroundColor: '#474747',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 18,
        paddingTop: 16,
        paddingRight: 15,
        width: '100%'
    },
    footer_icon_contain:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
        marginBottom: 18
    },
    footer_icon:{
        fontSize: 25, 
        color: '#FFFFFF'
    },
    search:{
        flex: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginRight: 19,
        paddingLeft: 13
    },
    search_input:{
        width: 331,
        height: 41,
        fontSize: 14,
        lineHeight: 16,
        fontWeight: 'bold'
    },
    search_btn:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    search_icon:{
        fontSize: 50, 
        color: '#FFFFFF'
    }
})

export default connect(mapStateToProps)(Index)