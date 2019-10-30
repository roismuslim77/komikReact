import React from 'react'
import {Modal, View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, TouchableHighlight, StyleSheet, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import axios from 'axios'

import Shimmer from '../../public/shimmer/shimmer'
import {mangaDetailFul, mangaDetailPending, mangaDetailRejected} from '../../public/actions/mangaDetail'
import {lovedPending, lovedFul, lovedRejected} from '../../public/actions/loved'

const base_uri = 'http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id: 0,
            id_manga: 0,
            genre:[],
            title:'',
            sinopsis:'',
            image:null,
            chapter:[],
            last_chapter:'',
            rating:'',
            status:'',
            komikus:'',
            modal_loading: false,
        }
    }

    componentDidMount(){
        this.getMangaContent()
    }

    getIconLoved =(id)=>{
        let data_id
        this.props.getLoved.manga ? data_id = this.props.getLoved.manga.find(o=> o.id == id) : data_id = undefined
        if(data_id != undefined){
            this.state.modal_loading ? this.setState({modal_loading: false}) : null
            return(
                <Icon name='heart' style={{color:'#4AAFF7', fontSize: 22}}/>
            )
        }else{
            return(
                <Icon name='heart' style={{color: '#ffffff', fontSize: 22}}/>
            )
        }
    }

    sendMangaLoved = (manga_id)=>{
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
            this.setState({modal_loading: false})
            alert('kamu belum login')
        }
    }

    getListSaved = ()=>{
        this.props.dispatch(lovedPending())
        if(this.state.id != 0){
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
        }else {
            this.props.dispatch(lovedRejected())
        }
    }

    getMangaContent = ()=>{
        this.props.dispatch(mangaDetailPending())
        axios.post(base_uri+'/manga/'+this.props.navigation.getParam('id'))
        .then((res)=>{
            if(this.props.getUser.user.name != undefined) 
            this.setState({
                id: typeof this.props.getUser.user.id == 'string' ? parseInt(this.props.getUser.user.id) : this.props.getUser.user.id
            })
            this.setState({
                id_manga: res.data.id,
                genre: res.data.genre,
                title: res.data.title,
                sinopsis: res.data.sinopsis,
                image: res.data.image,
                chapter: res.data.chapter_detail,
                last_chapter: res.data.chapter,
                rating: res.data.rating,
                status: res.data.status,
                komikus: res.data.komikus
            })
            this.props.dispatch(mangaDetailFul(null))
        }).catch((err)=>{
            this.props.dispatch(mangaDetailRejected())
            alert(err)
        })
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return {
            backgroundColor: color
        }
    }

    getChapterItem = ()=>{
        var elements=[]
        this.state.chapter.map((data, key)=> {
            elements.push(
                <View key={key} style={styles.chapter_contain}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ChapterScreen',{ chapter: data.chapter, id: this.props.navigation.getParam('id')})}} style={{width: '100%'}}>
                        <View>
                            <Text style={styles.chapter_text}>Chapter {data.chapter}</Text>
                            <Text style={styles.chapter_title}>this is title</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ChapterScreen',{ id: 1})}}>
                        <Icon style={styles.chapter_icon} name='angle-right'/>
                    </TouchableOpacity>
                </View>
            )
        })
        return(elements)
    }

    getCategoryItem = ()=>{
        var element=[]
        this.state.genre.map((res, key)=>{
            element.push(
                <TouchableOpacity key={key} style={[this.getRandomColor(),styles.category_contain]}>
                     <Text style={styles.category_text}>{res.title}</Text>
                </TouchableOpacity>
            )
        })
        return element
    }

    render(){
        return (
            <View style={styles.container}>
                <Modal 
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modal_loading}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator color="4AAFF7" size="large"/>
                    </View> 
                </Modal>
                <ImageBackground resizeMode='cover' style={styles.image_background} source={{uri: this.state.image}}>
                    <View style={styles.navbar}> 
                        <Icon onPress={()=>{this.props.navigation.pop()}} style={styles.navbar_icon} name="arrow-left"/>
                        {/* <Icon style={styles.navbar_icon} name="heart"/> */}
                        <TouchableHighlight onPress={()=> {this.sendMangaLoved(this.state.id_manga)}}>
                            <View>{this.getIconLoved(this.state.id_manga)}</View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.contain}>
                        <View style={styles.image_contain}>
                            {this.props.getMangaDetail.isLoading === true ? <Shimmer borderRadiusContainer={10} visible={false} autoRun={true} style={styles.image}/> : 
                                <Image style={[styles.image, {borderRadius: 10}]} source={{uri: this.state.image}}/>
                            }
                        </View>
                        <View style={styles.content}>
                            {this.props.getMangaDetail.isLoading === true ? <Shimmer style={styles.content_title} autoRun={true} visible={false}/> : 
                                <Text style={styles.content_title}>{this.state.title}</Text>}
                            {this.props.getMangaDetail.isLoading === true ? <Shimmer style={styles.content_subtitle} autoRun={true} visible={false}/> : 
                                <Text style={styles.content_subtitle}>{this.state.komikus}</Text>
                            }
                            {this.props.getMangaDetail.isLoading === true ?
                                <Shimmer style={styles.content_icons} autoRun={true} visible={!this.props.getMangaDetail.isLoading}/> :
                                <View style={styles.contain_icons}>
                                    <View style={styles.contain_icons_content}>
                                        <Icon name='eye' style={styles.content_icon}/>
                                        <Text style={styles.content_text}>12K</Text>
                                    </View>
                                    <View style={styles.contain_icons_content}>
                                        <Icon name='heart' style={styles.content_icon}/>
                                        <Text style={styles.content_text}>1.3K</Text>
                                    </View>
                                    <View style={styles.contain_icons_content}>
                                        <Icon name='star' style={styles.content_icon}/>
                                        <Text style={styles.content_text}>{this.state.rating}</Text>
                                    </View>
                                </View>
                            }
                            <View>
                                {this.props.getMangaDetail.isLoading === true ? <Shimmer borderRadiusContainer={10} visible={false} autoRun={true} style={styles.content_text_white}/> : 
                                    <Text style={styles.content_text_white}>300 Comments</Text>
                                }
                            </View>
                        </View>
                    </View>
                    {this.props.getMangaDetail.isLoading === true ? 
                        <View style={[styles.content_detail,{width: '100%', height: '100%'}]}>
                            <Shimmer borderRadiusContainer={10} visible={false} autoRun={true} style={[styles.sinopsis_title, {width: '100%'}]}/>
                            <Shimmer borderRadiusContainer={10} visible={false} autoRun={true} style={[styles.sinopsis,{height: 70, width: '100%'}]}/>
                            <Shimmer borderRadiusContainer={10} visible={false} autoRun={true} style={[styles.category_container,{height: 34, width: '100%'}]}/>
                        </View>:
                        <View style={styles.content_detail}>
                            <Text style={styles.sinopsis_title}>Sinopsis</Text>
                            <Text numberOfLines={5} style={styles.sinopsis}>{this.state.sinopsis}</Text>
                            <View style={styles.category_container}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>{this.getCategoryItem()}</ScrollView>
                            </View>
                        </View>
                    }
                </ImageBackground>
                <View style={{flex: 1}}>
                    <View style={styles.chapter_line_top}></View>
                        <View style={styles.chapter_header_container}>
                            {this.props.getMangaDetail.isLoading === true ?
                                <Shimmer style={styles.chapter_header_left} autoRun={true} visible={!this.props.getMangaDetail.isLoading}/> :
                                <Text style={styles.chapter_header_left}>Chapter {this.state.last_chapter}</Text>
                            }
                            <View style={styles.chapter_header_right}>
                            </View>
                        </View>
                    <View style={styles.chapter_line_bottom}></View>
                    <View style={styles.chapter_container}>
                        { this.props.getMangaDetail.isLoading === true ?
                            <Shimmer style={{width: '100%',height: '100%'}} autoRun={true} visible={!this.props.getMangaDetail.isLoading}/> :
                            <ScrollView style={styles.chapter_scrollview}>
                                {this.getChapterItem()}
                            </ScrollView>
                        }
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
    chapter_container:{
        flex:1
    },
    chapter_contain:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 39,
        marginLeft: 23,
        marginBottom: 22
    },
    chapter_text:{
        color: '#4AAFF7',
        fontSize: 14, 
        lineHeight: 16,
        fontWeight: 'bold'
    },
    chapter_title:{
        color: '#DDDDDD',
        fontSize: 16,
        lineHeight: 19
    },
    chapter_icon:{
        fontSize: 20,
        color: 'black'
    },
    chapter_scrollview:{
        paddingTop: 16
    },
    category_container:{
        marginTop: 13
    },
    category_contain:{
        borderRadius: 30,
        width: 82,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    category_text:{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold'
    },
    container:{
        flex: 1,
        backgroundColor: '#181818'
    },
    image_background:{
        width: '100%',
        flex: 2.3
    },
    navbar:{
        backgroundColor: 'rgba(0,0,0, 0.8)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 22,
        paddingTop: 27,
        paddingRight: 25 
    },
    navbar_icon:{
        color: '#DDDDDD', fontSize: 25
    },
    contain:{
        backgroundColor: 'rgba(0,0,0, 0.8)',
        flex: 3, 
        flexDirection: 'row',             
        paddingRight: 14,
        paddingLeft: 22
    },
    image_contain:{
        flex: 1
    },
    image:{
        width: 105,
        height: 153
    },
    content:{
        flex: 1.8,
        marginLeft: 7,
        marginTop: 2
    },
    content_title:{
        color: '#E0E0E0',
        fontSize: 16,
        lineHeight: 19, 
        fontWeight: 'bold'
    },
    content_subtitle:{
        color: '#E0E0E0',
        fontSize: 12,
        lineHeight: 14,
        marginTop: 4
    },
    contain_icons:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 9
    },
    contain_icons_content:{
        flexDirection: 'row',
        marginRight: 14
    },
    content_icon:{
        color: '#4AAFF7',
        fontSize: 18,
        marginRight: 3
    },
    content_text:{
        color: '#4AAFF7', 
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 14,
        marginTop: 2
    },
    content_text_white:{
        color: '#E0E0E0',
        fontSize: 12,
        lineHeight: 14,
        fontWeight: 'bold',
        marginTop: 13
    },
    content_detail:{
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 3.1,
        paddingRight: 12,
        paddingLeft: 22,
        paddingTop:10,
    },
    sinopsis_title:{
        color: '#E0E0E0',
        fontSize: 14,
        lineHeight: 16,
        fontWeight: 'bold',
        marginBottom: 14
    },
    sinopsis:{
        textAlign: 'justify',
        color: '#E0E0E0',
        fontSize: 14,
        lineHeight: 16
    },
    chapter_line_top:{
        backgroundColor: '#C4C4C4',
        height: 2,
        marginRight: 11, 
        marginLeft: 12,
        opacity: 0.5,
        paddingTop: 3
    },
    chapter_line_bottom:{
        backgroundColor: '#C4C4C4',
        height: 2,
        marginRight: 11, 
        marginLeft: 12,
        opacity: 0.5,
    },
    chapter_header_container:{
        marginTop: 16,
        marginLeft: 23,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 28
    },
    chapter_header_left:{
        color: '#E0E0E0',
        fontSize: 16,
        lineHeight: 19,
        fontWeight: 'bold'
    },
    chapter_header_right:{
        flexDirection: 'row',
        alignContent: 'center'
    },
    chapter_header_right_text:{
        color: '#E0E0E0',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 6,
    },
    chapter_header_right_icon:{
        color: '#E0E0E0',
        fontSize: 18
    }
})

export default connect(mapStateToProps)(Index)