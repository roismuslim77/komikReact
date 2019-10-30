import React from 'react';
import {connect} from 'react-redux'
import { ScrollView, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import { getMangaRecentFul, getMangaRecentPending, getMangaRecentRejected } from '../../public/actions/mangaRecent'
import Shimmer from '../../public/shimmer/shimmer'

const base_api = 'http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)

        this.state={
            hasMoreRecent: true,
            loading: false,
            current_page_recent: 1,
            lastPageRecent: -1,
        }
    }
    componentDidMount(){
        this.getListRecent(1)
    }

    getListRecent = async(data)=>{
        if(this.state.loading) { return; }
        this.setState({loading: true})
        if(data===null){
            this.props.dispatch(getMangaRecentPending())
            await axios.post(base_api+'/manga/list?page='+this.state.current_page_recent+'&limit=10&category=Recent')
            .then((res)=>{
                this.setState({
                    hasMoreRecent: (this.state.current_page_recent <= this.state.lastPageRecent),
                    lastPageRecent: res.data.result.last_page > 3 ? 3 : res.data.result.last_page,
                    loading: false,
                    current_page_recent: this.state.current_page_recent + 1
                })
                this.props.dispatch(getMangaRecentFul(res.data.result.rows, data))
            }).catch((err)=>{
                this.props.dispatch(getMangaRecentRejected())
                alert(JSON.stringify(err.response))
            })
        }else{
            await this.setState({
                hasMoreRecent: true,
                loading: false,
                current_page_recent: 1,
                lastPageRecent: 1,
            })
            this.props.dispatch(getMangaRecentPending())
            await axios.post(base_api+'/manga/list?page='+this.state.current_page_recent+'&limit=10&category=Recent')
            .then((res)=>{
                this.setState({
                    hasMoreRecent: (this.state.current_page_recent <= res.data.result.last_page),
                    lastPageRecent: res.data.result.last_page,
                    loading: false,
                    current_page_recent: this.state.current_page_recent + 1
                })
                // alert(this.state.category_selected+JSON.stringify(res.data.results))
                this.props.dispatch(getMangaRecentFul(res.data.result.rows, data))
                this._scroll ? this._scrollView.getScrollResponder().scrollTo({x:0, y: 0}) : null
            }).catch((err)=>{
                this.props.dispatch(getMangaRecentRejected())
                alert(err)
            })
        }
    }

    isCloseToBottomRecent = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.width + contentOffset.x >=
          contentSize.width - paddingToBottom;
    }

    renderListMangaRecent = () =>{
        return (this.props.getMangaRecent.manga.map((data, key)=>{
            return(
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DetailScreen',{ id: data.id})}} style={{width: 99, marginTop: 9, marginRight: 9}} key={data.id}>
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
        if(this.props.getMangaRecent.isLoading){
            for (let i = 0; i < 4; i++) {
                element.push(
                    <View key={'last'+i} style={{width: 99, marginTop: 9, marginRight: 9}}>
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
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('MoreScreen',{header: 'recent'})} style={{width: 99, marginTop: 9, marginRight: 9}}>
                    <View style={{width: 99, height: 139, backgroundColor: '#4B4B4B', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='plus-circle' style={{fontSize: 30, color: '#4AAFF7'}}/>
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
                    if(this.isCloseToBottomRecent(nativeEvent) && this.state.hasMoreRecent){
                        this.getListRecent(null)
                    }
                }}
                // onMomentumScrollEnd={()=>alert('test')}
            >
                {this.renderListMangaRecent()}
                {this.getLastCard()}
            </ScrollView>
        )
    }
}

const mapStateToProps=(state)=>{
    return state.reducer
}

export default connect(mapStateToProps)(Index)