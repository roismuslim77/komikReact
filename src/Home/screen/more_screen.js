import React from 'react'
import {View, Text, StyleSheet, ScrollView, Image, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import Shimmer from '../../public/shimmer/shimmer'

import {getMangaTopMoreFul, getMangaTopMorePending, getMangaTopMoreRejected} from '../../public/actions/mangaTop'
import {getMangaRecentMoreFul, getMangaRecentMorePending, getMangaRecentMoreRejected} from '../../public/actions/mangaRecent'
import ListMore from '../components/listMore'

const base_api ='http://apimanga.idmustopha.com/public'
class Index extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            from: this.props.navigation.getParam('header'),
            love_loading: false,
            hasMoreTop: true,
            loading: false,
            current_page_top: 1,
            current_page_recent: 1,
            lastPageTop: -1,
        }
    }

    componentDidMount(){
        if(this.state.from == 'top') {
            this.getMoreMangaTop(1)
        }
        if(this.state.from == 'recent') {
            this.getMoreMangaRecent(1)
        }
    }

    getMoreMangaRecent = async(data)=>{
        this.props.dispatch(getMangaRecentMorePending())
        await axios.post(base_api+'/manga/list?page='+this.state.current_page_recent+'&limit=10&category=Recent')
        .then((res)=>{
            this.setState({
                hasMoreGenre: (this.state.current_page_genre <= res.data.last_page),
                lastPageGenre: res.data.last_page,
                loading: false,
                current_page_genre: this.state.current_page_genre + 1
            })
            // alert(JSON.stringify(res.data.result))
            this.props.dispatch(getMangaRecentMoreFul(res.data.result.rows, data))
        }).catch((err)=>{
            this.props.dispatch(getMangaRecentMoreRejected())
            alert(JSON.stringify(err.response))
        })
    }
    
    getMoreMangaTop = async(data)=> {
        this.props.dispatch(getMangaTopMorePending())
        await axios.post(base_api+'/manga/list?page='+this.state.current_page_top+'&limit=10&category=Top')
        .then((res)=>{
            this.setState({
                hasMoreGenre: (this.state.current_page_genre <= res.data.last_page),
                lastPageGenre: res.data.last_page,
                loading: false,
                current_page_genre: this.state.current_page_genre + 1
            })
            // alert(JSON.stringify(res.data.result))
            this.props.dispatch(getMangaTopMoreFul(res.data.result.rows, data))
        }).catch((err)=>{
            this.props.dispatch(getMangaTopMoreRejected())
            alert(err)
        })
    }

    renderListMore = ()=> {
        var element=[]
        if(this.state.from == 'top' ? this.props.getMangaTop.isLoading : this.state.from == 'recent' ? this.props.getMangaRecent.isLoading : false){
            for (let i = 0; i < 4; i++) {
                element.push(
                    <View key={i} style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Shimmer style={{width: 99, height: 139}}/>
                        </View>
                        <View style={{flex: 2 ,width: '100%', marginRight: 22.27,}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Shimmer numberOfLines={1} style={{flex: 7,color:'#E0E0E0', marginTop: 5, fontSize: 16, lineHeight: 19,fontWeight: 'bold'}} ellipsizeMode='tail'></Shimmer>
                            </View>
                            <View style={{flex: 1}}>
                                <Shimmer numberOfLines={2} style={{color:'#E0E0E0', marginTop: 5, fontSize: 12, lineHeight: 14}}></Shimmer>
                            </View>
                            <View style={{flex: 2}}>
                                <Shimmer numberOfLines={5} style={{height: 50, color:'#E0E0E0', marginTop: 5, fontSize: 11, lineHeight: 12}} ellipsizeMode='tail'></Shimmer>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-start'}}>
                                <View style={{flexDirection: 'row', marginRight: 14}}>
                                    <Shimmer style={{color: '#4AAFF7', fontSize: 11, marginRight: 3}}/>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
            return(element)
        }else{
            return this.state.from == 'top' ? 
                this.props.getMangaTop.manga_more.map((data, key)=>{
                    return(
                        <ListMore data={data}/>
                    )
                }) 
                : this.state.from == 'recent' ?
                this.props.getMangaRecent.manga_more.map((data, key)=>{
                    return(
                        <ListMore data={data}/>
                    )
                }) : null
        }
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={styles.headerBlack}>
                    <View style={{marginLeft: 20, marginRight: 21,flexDirection: 'row',justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                        <View>
                            <Text style={{color: '#FFFBFB', fontWeight: 'bold', fontSize: 20, lineHeight: 23}}>{this.state.from == 'top' ? 'Top Manga' : this.state.from == 'recent' ? 'Recent Manga' : null}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{justifyContent: 'center', marginLeft: 20}}>
                    <ScrollView style={{marginTop: 10}}>
                        {this.renderListMore()}
                    </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    return state.reducer
}

export default connect(mapStateToProps)(Index)

const styles = StyleSheet.create({
    headerBlack:{
        backgroundColor: '#181818',
        flex: 1,
        paddingBottom: 2,
    },
    borderSearch:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        height: '100%',
        marginTop: 21,
        marginBottom: 15,
        marginLeft: 18,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    content:{
        flex: 9,
        backgroundColor: '#181818',
    },
})