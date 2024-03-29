import React from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableHighlight, Image, ActivityIndicator, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { connect } from 'react-redux'

import { getGenreFul, getGenrePending, getGenreRejected } from '../../public/actions/genre'
import { getMangaGenreFul, getMangaGenrePending, getMangaGenreRejected } from '../../public/actions/mangaGenre'
import { lovedPending, lovedFul, lovedRejected } from '../../public/actions/loved'
import Shimmer from '../../public/shimmer/shimmer'
import Saved from '../../Saved/screen'

const base_uri ='http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id: 0,
            hasMoreGenre: true,
            loading: false,
            current_page_genre: 1,
            lastPageExp: -1,
            genre:[],
            genre_selected: '',
            love_loading: false
        }
    }
    componentDidMount(){
        this.getGenre()
        this.getMangaByGenre(null)
        if(this.props.getUser.user) {
            this.setState({
                id: parseFloat(this.props.getUser.user.id)
            })
        }
    }

    getListSaved = ()=>{
        this.props.dispatch(lovedPending())
        axios.get(base_uri+'/manga/loved/'+this.state.id)
        .then((res)=>{
            var id=[]
            if(res.data.result.length == 0){
                this.props.dispatch(lovedFul(id))
            }else{
                res.data.result.rows.map((data,key)=>{
                    id.push(data.manga_id)
                })
                axios.post(base_uri+'/manga/list',{
                    'id': id
                }).then((res)=>{
                    this.props.dispatch(lovedFul(res.data.result.rows))
                }).catch((err)=>{
                    alert(err)
                })
            }
        }).catch((err)=>{
            alert(err)
        })
    }

    getGenre = () =>{
        this.props.dispatch(getGenrePending())
        axios.get(base_uri+'/manga/genre')
        .then((res)=>{
            this.props.dispatch(getGenreFul(res.data.result.rows))
        }).catch((err)=>{
            this.props.dispatch(getGenreRejected())
            alert('failed load genre')
        })
    }

    getSelectedGenre = async(key)=>{
        if(key==this.state.genre_selected){
            return;
        }else{
            await this.setState({genre_selected: key})
            this.getMangaByGenre(1)
        }
    }

    getMangaByGenre = async(data)=>{
        if(this.state.loading){return;}
        this.setState({loading: true})
        if(data==null){
            this.props.dispatch(getMangaGenrePending())
            axios.post(base_uri+'/manga/list?genre='+this.state.genre_selected+'&page='+this.state.current_page_genre+'&limit=8')
            .then((res)=>{
                this.setState({
                    hasMoreGenre: (this.state.current_page_genre <= res.data.last_page),
                    lastPageGenre: res.data.last_page,
                    loading: false,
                    current_page_genre: this.state.current_page_genre + 1
                })
                // alert(JSON.stringify(res.data.result))
                this.props.dispatch(getMangaGenreFul(res.data.result.rows, data))
            }).catch((err)=>{
                this.props.dispatch(getMangaGenreRejected())
                alert(err);
            })
        }else{
            await this.setState({
                hasMoreGenre: true,
                loading: false,
                current_page_genre: 1,
                lastPageGenre: -1,
            })
            this.props.dispatch(getMangaGenrePending())
            axios.post(base_uri+'/manga/list?genre='+this.state.genre_selected+'&page='+this.state.current_page_genre+'&limit=8')
            .then((res)=>{
                this.setState({
                    hasMoreGenre: (this.state.current_page_genre <= res.data.last_page),
                    lastPageGenre: res.data.last_page,
                    loading: false,
                    current_page_genre: this.state.current_page_genre + 1
                })
                // alert(this.state.genre_selected+JSON.stringify(res.data.result))
                this.props.dispatch(getMangaGenreFul(res.data.result.rows, data))
            }).catch((err)=>{
                this.props.dispatch(getMangaGenreRejected())
                alert(err)
            })
        }
    }

    sendMangaLoved = (manga_id, user_id)=>{
        let data_s = this.props.getLoved.manga.find(o=> o.id == manga_id)
        if(this.state.id != 0){
            if(data_s != undefined){
                this.setState({love_loading: true})
                axios.get(base_uri+'/manga/'+manga_id+'/unlove/'+this.state.id)
                .then((res)=>{
                    this.getListSaved()
                }).catch((err)=>{
                    this.setState({love_loading: false})
                    alert(err)
                })
            }else{
                this.setState({love_loading: true})
                axios.get(base_uri+'/manga/'+manga_id+'/love/'+this.state.id)
                .then((res)=>{
                    this.getListSaved()
                }).catch((err)=>{
                    this.setState({love_loading: false})
                    alert(err)
                })
            }
        }else{
            alert('kamu harus log in')
        }
    }

    getIconLoved =(id)=>{
        let data_id
        this.props.getLoved.manga ? data_id = this.props.getLoved.manga.find(o=> o.id == id) : data_id = undefined
        if(data_id != undefined){
            this.state.love_loading ? this.setState({love_loading: false}) : null
            return(
                <Icon name='heart' style={{color: '#4AAFF7', fontSize: 22}}/>
            )
        }
        return(
            <Icon name='heart' style={{color: '#ffffff', fontSize: 22}}/>
        )
    }

    renderListGenre=()=>{
        var element=[]
        if(this.props.getMangaGenre.isLoading){
            for (let i = 0; i < 4; i++) {
                element.push(
                    <View style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
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
            return (this.props.getMangaGenre.manga.map((data, key)=>{
                return(
                    <View style={{flexDirection: 'row',width: '100%', marginTop: 9, marginRight: 9, marginBottom: 20}}>
                        <View style={{flex: 1}}>
                            <Image style={{width: 99, height: 139, borderRadius: 10}} source={{uri: data.image}}/>
                        </View>
                        <View style={{flex: 2 ,width: '100%', marginRight: 22.27,}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                <Text numberOfLines={1} style={{flex: 7,color:'#E0E0E0', marginTop: 5, fontSize: 16, lineHeight: 19,fontWeight: 'bold'}} ellipsizeMode='tail'>{data.title}</Text>
                                <TouchableHighlight style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%', height: '100%'}} onPress={()=> {this.sendMangaLoved(data.id, this.state.id)}}>
                                    {/* <Icon name='heart' style={{color: '#ffffff', fontSize: 22}}/> */}
                                    <View>{this.getIconLoved(data.id)}</View>
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
                )
            }))
        }
    }

    getListGenre = () =>{
        return(this.props.getGenre.genre.map((data, key)=>{
            return (this.state.genre_selected == data.title ?
                <View style={{alignSelf: 'center', marginRight: 24}}>
                    <Text onPress={()=>this.getSelectedGenre(data.title)} style={{color: '#4AAFF7', fontSize: 15, fontWeight: 'bold', lineHeight: 18}}>{data.title}</Text>
                    <View style={{marginTop: 3, height: 4, width: '100%', backgroundColor: '#4AAFF7', borderRadius: 10}}></View>
                </View>
            : 
                <View style={{alignSelf: 'center', marginRight: 24}}>
                    <Text onPress={()=>this.getSelectedGenre(data.title)} style={{color: '#E0E0E0', fontSize: 15, fontWeight: 'bold', lineHeight: 18}}>{data.title}</Text>
                    <View style={{marginTop: 3, height: 4, width: '100%', backgroundColor: 'transparent', borderRadius: 10}}></View>
                </View> )
        }
        ))
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <Modal 
                    animationType="fade"
                    transparent={true}
                    visible={this.state.love_loading}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color="4AAFF7" size="large"/>
                    </View> 
                </Modal>
                <View style={styles.headerBlack}>
                    <View style={{marginLeft: 20, marginRight: 21,flexDirection: 'row',justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
                        <View>
                            <Text style={{color: '#FFFBFB', fontWeight: 'bold', fontSize: 20, lineHeight: 23}}>GENRE</Text>
                        </View>
                        <View style={{backgroundColor: '#4AAFF7', height: 31, width: 46, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon style={{color: '#FFFFFF', fontSize: 16}} name="search"/>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{justifyContent: 'center', marginLeft: 20}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{alignSelf: 'center', marginRight: 24}}>
                        {this.state.genre_selected == '' ?
                            <View>
                                <Text onPress={()=>this.getSelectedGenre('')} style={{width: '100%',color: '#4AAFF7', fontSize: 15, fontWeight: 'bold', lineHeight: 18}}>All</Text>
                                <View style={{marginTop: 3,marginTop: 3, height: 4, width: '100%', backgroundColor: '#4AAFF7', borderRadius: 10}}></View>
                            </View>
                        : 
                            <View>
                                <Text onPress={()=>this.getSelectedGenre('')} style={{width: '100%',color: '#E0E0E0', fontSize: 15, fontWeight: 'bold', lineHeight: 18}}>All</Text>
                                <View style={{marginTop: 3,marginTop: 3, height: 4, width: '100%', backgroundColor: 'transparent', borderRadius: 10}}></View>
                            </View> 
                        }
                        </View>
                        {this.getListGenre()}
                    </ScrollView>
                    <ScrollView style={{marginTop: 10}}>
                        {this.renderListGenre()}
                    </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state)=>{
    return state.reducer
}

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

export default connect(mapStateToProps)(Index)
