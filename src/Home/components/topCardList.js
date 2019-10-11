import React from 'react';
import {connect} from 'react-redux'
import { ScrollView, Image, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'native-base'
import axios from 'axios'

import { getMangaTopFul, getMangaTopPending, getMangaTopRejected } from '../../public/actions/mangaTop'
import Shimmer from '../../public/shimmer/shimmer'

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
        this.getListTop()
    }

    getListTop = ()=>{
        if(this.state.loading) { return; }
        this.setState({loading: true})
        this.props.dispatch(getMangaTopPending())
        axios.get('https://api.jikan.moe/v3/search/anime/?q=null&status=publishing&page='+this.state.current_page_top+'&limit=10')
        .then((res)=>{
            this.setState({
                hasMoreTop: (this.state.current_page_top <= res.data.last_page),
                lastPageTop: res.data.last_page,
                loading: false,
                current_page_top: this.state.current_page_top + 1
            })
            this.props.dispatch(getMangaTopFul(res.data.results))
        }).catch((err)=>{this.props.dispatch(getMangaTopRejected())})
    }

    isCloseToBottomTop = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.width + contentOffset.x >=
          contentSize.width - paddingToBottom;
    }

    renderListMangaTop = () =>{
        return (this.props.getMangaTop.manga.map((data, key)=>{
            return(
                <TouchableOpacity style={{width: 99, marginTop: 9, marginRight: 9}} key={data.mal_id}>
                    <Image style={{width: 99, height: 139, borderRadius: 10}} source={{uri: data.image_url}}/>
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
                    <View style={{width: 99, marginTop: 9, marginRight: 9}}>
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
                <TouchableOpacity onPress={()=>{alert('pressed')}} style={{width: 99, marginTop: 9, marginRight: 9}}>
                    <View style={{width: 99, height: 139, backgroundColor: '#4B4B4B', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='add-circle' type='Ionicons' style={{fontSize: 30, color: '#4AAFF7'}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render(){
        return(
            <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={({nativeEvent}) => {
                    if(this.isCloseToBottomTop(nativeEvent) && this.state.hasMoreTop){
                        this.getListTop()
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