import React from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import axios from 'axios';

import Shimmer from '../../public/shimmer/shimmer'
import { lovedPending, lovedFul, lovedRejected } from '../../public/actions/loved'

const base_api = 'https://apimanga.idmustopha.com/public'
class Index extends React.Component{
    componentDidMount(){
        this.getListSaved()
    }

    sendUnlikeManga=(manga_id)=>{
        axios.get(base_api+'/manga/'+manga_id+'/unlove/1')
        .then((res)=>{
            this.getListSaved()
        }).catch((err)=>{
            alert(err)
        })
    }

    getListSaved = ()=>{
        this.props.dispatch(lovedPending())
        axios.get(base_api+'/manga/loved/1')
        .then((res)=>{
            var id=[]
            if(res.data.result.length == 0){
                this.props.dispatch(lovedFul(id))
            }else{
                res.data.result.rows.map((data,key)=>{
                    id.push(data.manga_id)
                })
                axios.post(base_api+'/manga/list',{
                    'id': id
                }).then((res)=>{
                    this.props.dispatch(lovedFul(res.data.result.rows))
                }).catch((err)=>{
                    alert('erorro'+err)
                })
            }
        }).catch((err)=>{
            alert('error bro..'+err)
        })
    }

    renderListSaved=()=>{
        var element=[]
        if(this.props.getLoved.isLoading){
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
            if(this.props.getLoved.manga.length == 0){
                return(<View>
                    <Text style={{color: 'white'}}>Not Found</Text>
                </View>)
            }else{
                return (this.props.getLoved.manga.map((data, key)=>{
                    return(
                        <TouchableWithoutFeedback onPress={()=>{this.props.navigation.navigate('DetailScreen',{ id: data.id})}}>
                            <View style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
                                <View style={{flex: 1}}>
                                    <Image style={{width: 99, height: 139, borderRadius: 10}} source={{uri: data.image}}/>
                                </View>
                                <View style={{flex: 2.4 ,width: '100%', marginRight: 22.27,}}>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                        <Text numberOfLines={1} style={{flex: 7,color:'#E0E0E0', marginTop: 5, fontSize: 16, lineHeight: 19,fontWeight: 'bold'}} ellipsizeMode='tail'>{data.title}</Text>
                                        <TouchableHighlight style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%'}} onPress={()=> this.sendUnlikeManga(data.id)}>
                                            <Icon name='heart' style={{color: '#4AAFF7', fontSize: 22}}/>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text numberOfLines={1} style={{color:'#E0E0E0', marginTop: 5, fontSize: 12, lineHeight: 14}}>{data.genre}</Text>
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
                        </TouchableWithoutFeedback>
                    )
                }))
            }
        }
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={styles.headerBlack}>
                    <View style={{marginLeft: 20, marginRight: 21,flexDirection: 'row',justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                        <View>
                            <Text style={{color: '#FFFBFB', fontWeight: 'bold', fontSize: 20, lineHeight: 23}}>Saved</Text>
                        </View>
                        <View style={{backgroundColor: '#4AAFF7', height: 31, width: 46, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon style={{color: '#FFFFFF', fontSize: 16}} name="search"/>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <ScrollView style={{marginLeft: 20}}>
                        {this.renderListSaved()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state)=>{
    return state
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