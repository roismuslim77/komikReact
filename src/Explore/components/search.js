import React from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import axios from 'axios'

import { lovedPending, lovedFul, lovedRejected } from '../../public/actions/loved'
import { getMangaSearchFul, getMangaSearchPending, getMangaSearchRejected } from '../../public/actions/mangaSearch'
import Shimmer from '../../public/shimmer/shimmer'

const base_api = 'http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasMoreExp: true,
            loading: false,
            current_page_exp: 1,
            lastPageExp: -1,
        }
    }

    componentDidMount(){
        this.getListSearch()
    }

    getIconLoved = (id) =>{
        let data_id
        this.props.getLoved.manga ? data_id = this.props.getLoved.manga.find(o=> o.id == id) : data_id = undefined
        if(data_id != undefined){
            return(
                <Icon name='heart' style={{color:'#4AAFF7', fontSize: 22}}/>
            )
        }
        return(
            <Icon name='heart' style={{color:'#ffffff', fontSize: 22}}/>
        )
    }

    sendMangaLoved = (manga_id) => {
        let data_s = '';
        if(this.state.id != 0){
            this.setState({modal_loading: true})
            this.props.getLoved.manga ? data_s = this.props.getLoved.manga.find(o=> o.id == manga_id) : data_s = undefined
            if(data_s != undefined){
                axios.get(base_uri+'/manga/'+manga_id+'/unlove/'+this.state.id)
                .then((res)=>{
                    this.getListSaved()
                }).catch((err)=>{
                    this.setState({modal_loading: false})
                    alert(err)
                })
            }else{
                axios.get(base_uri+'/manga/'+manga_id+'/love/'+this.state.id)
                .then((res)=>{
                    this.getListSaved()
                }).catch((err)=>{
                    this.setState({modal_loading: false})
                    alert(err)
                })
            }
        }else{
            alert('kamu belum login')
        }
    }

    getListSearch = ()=>{
        if(this.state.loading){return;}
        this.setState({loading: true})
        this.props.dispatch(getMangaSearchPending())
        // alert(this.props.query)
        //axios.get('https://api.jikan.moe/v3/search/anime/?q='+this.props.query+'&order_by=title&genre=&page='+this.state.current_page_exp)
        axios.post(base_api+'/manga/list?limit=10')
        .then((res)=>{
            // alert(JSON.stringify(res.data))
            this.setState({
                hasMoreExp: (this.state.current_page_exp <= res.data.last_page),
                lastPageExp: res.data.last_page,
                loading: false,
                current_page_exp: this.state.current_page_exp + 1
            })
            // alert(this.state.category_selected+JSON.stringify(res.data.results))
            this.props.dispatch(getMangaSearchFul(res.data.result.rows))
        }).catch((err)=>{
            this.props.dispatch(getMangaSearchRejected())
            alert('failed load data')
        })
    }

    cardSearch = () =>{
        var element=[]
        if(this.props.getMangaSearch.isLoading){
            for (let i = 0; i < 4; i++) {
                element.push(
                    <View style={styles.contain}>
                        <View style={styles.image_contain}>
                            <Shimmer style={styles.image}/>
                        </View>
                        <View style={styles.detail_container}>
                            <View style={styles.detail_title_contain}>
                                <Shimmer numberOfLines={1} style={styles.detail_title} ellipsizeMode='tail'></Shimmer>
                            </View>
                            <View style={{flex: 1}}>
                                <Shimmer numberOfLines={2} style={{color:'#E0E0E0', marginTop: 5, fontSize: 12, lineHeight: 14}}></Shimmer>
                            </View>
                            <View style={{flex: 2}}>
                                <Shimmer numberOfLines={5} style={{height: 50, color:'#E0E0E0', marginTop: 5, fontSize: 11, lineHeight: 12}} ellipsizeMode='tail'></Shimmer>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-start', paddingLeft: 5}}>
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
            return (this.props.getMangaSearch.manga.map((data, key)=>{
                return(
                    <View key={key} style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Image style={{width: 99, height: 139, borderRadius: 10}} source={{uri: data.image}}/>
                        </View>
                        <View style={{flex: 2 ,width: '100%', marginRight: 22.27,}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Text numberOfLines={1} style={{flex: 7,color:'#E0E0E0', marginTop: 5, fontSize: 16, lineHeight: 19,fontWeight: 'bold'}} ellipsizeMode='tail'>{data.title}</Text>
                                <TouchableHighlight style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%'}} onPress={()=> alert('click')}>
                                    <View>{this.getIconLoved(data.id)}</View>
                                </TouchableHighlight>
                            </View>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={{color:'#E0E0E0', marginTop: 5, fontSize: 12, lineHeight: 14}}>{data.type}</Text>
                            </View>
                            <View style={{flex: 2,}}>
                                <Text numberOfLines={5} style={{color:'#E0E0E0',fontSize: 11, lineHeight: 12, textAlignVertical: 'top'}} ellipsizeMode='tail'>{data.sinopsis}</Text>
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
                                    <Text style={{color: '#4AAFF7', fontSize: 12, fontWeight: 'bold', lineHeight: 14}}>{data.rating}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }))
        }
    }

    render(){
        return(
            <View>
                <Text style={styles.container_text}>Result - {this.props.getMangaSearch.manga.length}</Text>
                <ScrollView style={styles.container_scrollview}>
                    {this.cardSearch()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
    return state.reducer
}

const styles = StyleSheet.create({
    container_text:{
        color: '#DDDDDD',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 18
    },
    container_scrollview:{
        marginLeft: 18,
        marginTop: 10
    },
    contain:{
        flexDirection: 'row',
        width: '100%',
        marginTop: 9,
        marginRight: 9,
        marginBottom: 20
    },
    image_contain:{
        flex: 1
    },
    image:{
        width: 99,
        height: 139
    },
    detail_container:{
        flex: 2,
        width: '100%',
        marginRight: 22.27
    },
    detail_title_contain:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    detail_title:{
        flex: 7,
        color: '#E0E0E0',
        marginTop: 5,
        fontSize: 16,
        lineHeight: 19,
        fontWeight: 'bold'
    }
})

export default connect(mapStateToProps)(Index)
