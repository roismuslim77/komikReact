import React from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import axios from 'axios'

import { getMangaSearchFul, getMangaSearchPending, getMangaSearchRejected } from '../../public/actions/mangaSearch'
import Shimmer from '../../public/shimmer/shimmer'

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

    getListSearch = ()=>{
        if(this.state.loading){return;}
        this.setState({loading: true})
        this.props.dispatch(getMangaSearchPending())
        // alert(this.props.query)
        //axios.get('https://api.jikan.moe/v3/search/anime/?q='+this.props.query+'&order_by=title&genre=&page='+this.state.current_page_exp)
        axios.post('http://192.168.88.229:7000/manga/list?limit=10')
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
                    <View style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Shimmer style={{width: 99, height: 139}}/>
                        </View>
                        <View style={{flex: 2.4 ,width: '100%', marginRight: 22.27,}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Shimmer numberOfLines={1} style={{flex: 7,color:'#E0E0E0', marginTop: 5, fontSize: 16, lineHeight: 19,fontWeight: 'bold'}} ellipsizeMode='tail'></Shimmer>
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
                    <View style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Image style={{width: 99, height: 139, borderRadius: 10}} source={{uri: data.image}}/>
                        </View>
                        <View style={{flex: 2.4 ,width: '100%', marginRight: 22.27,}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Text numberOfLines={1} style={{flex: 7,color:'#E0E0E0', marginTop: 5, fontSize: 16, lineHeight: 19,fontWeight: 'bold'}} ellipsizeMode='tail'>{data.title}</Text>
                                <TouchableHighlight style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%'}} onPress={()=> alert('click')}>
                                    <Icon name='heart' style={{color: '#4AAFF7', fontSize: 22}}/>
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
                <Text style={{color: '#DDDDDD', fontFamily: 'Roboto', fontSize: 14, fontWeight: 'bold', marginLeft: 18}}>Result - {this.props.getMangaSearch.manga.length}</Text>
                <ScrollView style={{marginLeft: 18, marginTop: 10}}>
                    {this.cardSearch()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
    return state
}

export default connect(mapStateToProps)(Index)
