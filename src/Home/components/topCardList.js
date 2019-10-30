import React from 'react';
import {connect} from 'react-redux'
import { ScrollView, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import { getMangaTopFul, getMangaTopPending, getMangaTopRejected } from '../../public/actions/mangaTop'
import Shimmer from '../../public/shimmer/shimmer'

const base_api = 'http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)

        this.state={
            hasMoreTop: true,
            loading: false,
            current_page_top: 1,
            lastPageTop: -1,
        }
    }
    componentDidMount(){
        this.getListTop(1)
    }

    getListTop = async(data)=>{
        if(this.state.loading) { return; }
        this.setState({loading: true})
        if(data===null){
            this.props.dispatch(getMangaTopPending())
            await axios.post(base_api+'/manga/list?page='+this.state.current_page_top+'&limit=10&category=Top')
            .then((res)=>{
                this.setState({
                    hasMoreTop: (this.state.current_page_top <= this.state.lastPageTop),
                    lastPageTop: res.data.result.last_page > 3 ? 3 : res.data.result.last_page,
                    loading: false,
                    current_page_top: this.state.current_page_top + 1
                })
                this.props.dispatch(getMangaTopFul(res.data.result.rows, data))
            }).catch((err)=>{this.props.dispatch(getMangaTopRejected())})
        }else{
            await this.setState({
                hasMoreTop: true,
                loading: false,
                current_page_top: 1,
                lastPageTop: 1,
            })
            this.props.dispatch(getMangaTopPending())
            await axios.post(base_api+'/manga/list?page='+this.state.current_page_top+'&limit=10&category=Top')
            .then((res)=>{
                this.setState({
                    hasMoreTop: (this.state.current_page_top <= res.data.result.last_page),
                    lastPageTop: res.data.result.last_page,
                    loading: false,
                    current_page_top: this.state.current_page_top + 1
                })
                // alert(this.state.category_selected+JSON.stringify(res.data.results))
                this.props.dispatch(getMangaTopFul(res.data.result.rows, data))
                this._scroll ? this._scrollView.getScrollResponder().scrollTo({x:0, y: 0}) : null
            }).catch((err)=>{
                this.props.dispatch(getMangaTopRejected())
                alert(err)
            })
        }
    }

    isCloseToBottomTop = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.width + contentOffset.x >=
          contentSize.width - paddingToBottom;
    }

    renderListMangaTop = () =>{
        return (this.props.getMangaTop.manga.map((data, key)=>{
            return(
                <TouchableOpacity key={data.id} onPress={()=>{this.props.navigation.navigate('DetailScreen',{ id: data.id})}} style={{width: 99, marginTop: 9, marginRight: 9}} key={data.id}>
                    <Image style={{width: 99, height: 139, borderRadius: 10}} source={{uri: data.image}}/>
                    <View style={{height: 35, marginBottom: 4}}>
                        <Text numberOfLines={2} style={{color:'white', marginTop: 7, fontSize: 13}}>{data.title}</Text>
                    </View>
                    <Text numberOfLines={1} style={{color:'#4AAFF7', marginTop: 4, fontSize: 12, fontWeight: 'bold'}}>Chapter {data.chapters}</Text>
                </TouchableOpacity>
            )
        }))
    }

    getLastCard = () => {
        var element = []
        if(this.props.getMangaTop.isLoading){
            for (let i = 0; i < 4; i++) {
                element.push(
                    <View key={'lastt'+i} style={{width: 99, marginTop: 9, marginRight: 9}}>
                        <Shimmer autoRun={true} visible={false} style={{width: 99, height: 139}} borderRadiusContainer={10}>
                        </Shimmer>
                        <View style={{height: 35, marginBottom: 4}}>
                                <Shimmer autoRun={true} visible={false} style={{width: 99, height: 30, marginTop: 7}} borderRadiusContainer={5}></Shimmer>
                        </View>
                        <Shimmer autoRun={true} visible={false} style={{width: 99, height: 10, marginTop: 7}} borderRadiusContainer={5}></Shimmer>
                    </View>
                )
            }
            return(
                element
            )
        }else{
            return(
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('MoreScreen',{header: 'top'})} style={{width: 99, marginTop: 9, marginRight: 9}}>
                    <View style={{width: 99, height: 139, backgroundColor: '#4B4B4B', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='plus-circle' type='Ionicons' style={{fontSize: 30, color: '#4AAFF7'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render(){
        return(
            <ScrollView horizontal={true}
                ref={(view) => this._scrollView = view }
                showsHorizontalScrollIndicator={false}
                onScroll={({nativeEvent}) => {
                    if(this.isCloseToBottomTop(nativeEvent) && this.state.hasMoreTop){
                        this.getListTop(null)
                    }
                }}
                // onMomentumScrollEnd={()=>alert('test')}
            >
                {this.renderListMangaTop()}
                {this.getLastCard()}
            </ScrollView>
        )
    }
}

const mapStateToProps=(state)=>{
    return state.reducer
}

export default connect(mapStateToProps)(Index)