import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, TouchableHighlight,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import axios from 'axios'

import CardSearch from '../components/search'
import { getMangaExpFul, getMangaExpPending, getMangaExpRejected } from '../../public/actions/mangaExplore'
import Shimmer from '../../public/shimmer/shimmer'

class Index extends React.Component{
    constructor(props){
        super(props)

        this.state={
            hasMoreExp: true,
            loading: false,
            current_page_exp: 1,
            lastPageExp: -1,
            category:['Action','Adventure', 'Comedy','Drama'],
            category_selected: 1,
            searchText: '',
            searchEnable: false,
        }
    }

    componentDidMount(){
        this.getListExplore(null)
    }

    getRandomColor = (data) => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        if(data===this.state.category_selected){
            return {
                backgroundColor: 'transparent'
            };
        }
        return {
            backgroundColor: color
        }
    }

    getListExplore= async(data)=>{
        if(this.state.loading){return;}
        this.setState({loading: true})
        if(data===null){
            this.props.dispatch(getMangaExpPending())
            axios.get('https://api.jikan.moe/v3/search/anime/?q=&order_by=title&genre='+this.state.category_selected+'&page='+this.state.current_page_exp+'&limit=9')
            .then((res)=>{
                this.setState({
                    hasMoreExp: (this.state.current_page_exp <= res.data.last_page),
                    lastPageExp: res.data.last_page,
                    loading: false,
                    current_page_exp: this.state.current_page_exp + 1
                })
                // alert(this.state.category_selected+JSON.stringify(res.data.results))
                this.props.dispatch(getMangaExpFul(res.data.results, data))
            }).catch((err)=>{
                this.props.dispatch(getMangaExpRejected())
                alert('failed load data')
            })
        }else{
            await this.setState({
                hasMoreExp: true,
                loading: false,
                current_page_exp: 1,
                lastPageExp: -1,
            })
            this.props.dispatch(getMangaExpPending())
            axios.get('https://api.jikan.moe/v3/search/anime/?q=&order_by=title&genre='+this.state.category_selected+'&page='+this.state.current_page_exp+'&limit=9')
            .then((res)=>{
                this.setState({
                    hasMoreExp: (this.state.current_page_exp <= res.data.last_page),
                    lastPageExp: res.data.last_page,
                    loading: false,
                    current_page_exp: this.state.current_page_exp + 1
                })
                // alert(this.state.category_selected+JSON.stringify(res.data.results))
                this.props.dispatch(getMangaExpFul(res.data.results, data))
            }).catch((err)=>{
                this.props.dispatch(getMangaExpRejected())
                alert('failed load data')
            })
        }
    }

    getListByGenre = async (key)=>{
        if(key===this.state.category_selected){
            return ;
        }else{
            await this.setState({category_selected: key})
            this.getListExplore(1)
        }
    }

    renderListMangaExplore = () =>{
        var element=[]
        if(this.props.getMangaExplore.isLoading){
            for (let i = 0; i < 9; i++) {
                element.push(
                    <View style={styles.contentExplore}>
                        <Shimmer autoRun={true} visible={false} style={{width: 119, height: 167}} borderRadiusContainer={10}>
                        </Shimmer>
                        <View style={{height: 35, marginBottom: 4}}>
                                <Shimmer autoRun={true} visible={false} style={{width: 119, height: 30, marginTop: 7}} borderRadiusContainer={5}></Shimmer>
                        </View>
                        <Shimmer autoRun={true} visible={false} style={{width: 119, height: 10, marginTop: 7}} borderRadiusContainer={5}></Shimmer>
                    </View>
                )
            }
            return(element)
        }else{
            return (this.props.getMangaExplore.manga.map((data, key)=>{
                return(
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DetailScreen',{ id: data.mal_id})}} style={styles.contentExplore}>
                        <Image style={{width: 119, height: 167, borderRadius: 10}} source={{uri: data.image_url}}/>
                        <View style={{height: 35, marginBottom: 4}}>
                            <Text numberOfLines={2} style={{color:'white', marginTop: 9, fontSize: 15, lineHeight: 18}}>{data.title}</Text>
                        </View>
                        <Text numberOfLines={1} style={{color:'#4AAFF7', marginTop: 6, fontSize: 14, lineHeight: 16, fontWeight: 'bold'}}>Chapter {data.chapters}</Text>
                    </TouchableOpacity>
                )
            }))
        }
    }            

    isCloseToBottomExp = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    }

    contentSelected = ()=>{
        if(!this.state.searchText){
            return( 
                <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 22, marginLeft: 18, marginTop: 20}}>
                    <Text style={{color: '#DDDDDD', fontSize: 18, lineHeight: 21, fontWeight: 'bold'}}>Genres</Text>
                    <Text onPress={()=>{this.props.navigation.navigate('GenreScreen')}} style={{color: '#DDDDDD', fontSize: 15, lineHeight: 18}}>Selengkapnya</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 18, marginTop: 10, marginBottom: 20, marginRight: 22}}>
                    {this.state.category.map((data, key)=>{
                        return(
                            <TouchableHighlight onPress={()=>{this.getListByGenre(key+1)}} style={[this.getRandomColor(key+1),{borderRadius: 30, width: 82, height: 34, justifyContent: 'center', alignItems: 'center'}]}>
                                <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>{data}</Text>
                            </TouchableHighlight>
                        )   
                    })}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 22, marginLeft: 18, marginBottom: 10}}>
                    <Text style={{color: '#DDDDDD', fontSize: 18, lineHeight: 21, fontWeight: 'bold'}}>Manga List</Text>
                    <Text style={{color: '#DDDDDD', fontSize: 15, lineHeight: 18}}>Sort by Latest Update</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollExplore}
                    onScroll={({nativeEvent}) => {
                        if(this.isCloseToBottomExp(nativeEvent) && this.state.hasMoreExp){
                            this.getListExplore(null)   
                        }
                    }}>
                    {this.renderListMangaExplore()}
                </ScrollView>
                </View>
            )
        }else if(this.state.searchEnable){
            // alert(this.state.searchText)
            return (<CardSearch query={this.state.searchText}/>)
        }else{
            return(
                <View style={{flex:1, justifyContent: 'center', backgroundColor: 'transprent'}}><ActivityIndicator size="small" color="#00ff00" /></View>
            )
        }
    }

    onChangeInput = (e)=> {
        if(this.state.searchText == ''){
            this.setState({searchEnable: false})
        }
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={styles.headerBlack}>
                    <View style={styles.borderSearch}>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Icon style={{color: '#4AAFF7', fontSize: 18}} name="search"/>
                        </View>
                        <View style={{flex: 10, alignItems: 'flex-end', justifyContent: 'flex-end', height: '100%', marginLeft: 3, marginTop: 2}}>
                            <TextInput onSubmitEditing={()=>this.setState({searchEnable: true})} value={this.state.searchText} onChange={this.onChangeInput.bind(this)} onChangeText={(input)=>this.setState({searchText: input})} placeholder="" style={{color: 'black', width: '100%', fontSize: 12, lineHeigth: 20, fontWeight: 'bold'}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    { this.contentSelected()}
                </View>
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
    return state
}

export default connect(mapStateToProps)(Index)

const styles = StyleSheet.create({
    headerBlack:{
        backgroundColor: '#181818',
        flex: 1,
        paddingBottom: 2
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
    contentExplore:{
        width: 119, 
        marginTop: 21, 
        marginRight: 5.5,
        marginLeft: 5.5
    },
    scrollExplore:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 16,
        paddingBottom: 150
    }
})