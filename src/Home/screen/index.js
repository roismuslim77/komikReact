import React from 'react';
import {Text, StyleSheet, View, Image, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, Animated } from 'react-native'
import {Content, Header, Container, Body, Right, Icon} from 'native-base'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { connect } from 'react-redux'
import axios from 'axios'

import { getAnimeFul, getAnimePending, getAnimeRejected } from '../../public/actions/anime'
import Shimmer from '../../public/shimmer/shimmer'
import RecentCardLs from '../components/recentCardList'
import TopCardLs from '../components/topCardList'

const { width: screenWidth } = Dimensions.get('window')

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            position: 0,
            interval: null,
            sliderActiveSlide: 0,
            test: [],
            hasMoreTop: true,
            hasMoreRecent: true,
            error: null,
            loading: false,
            current_page_top: 1,
            current_page_recent: 1,
            lastPageRecent: -1,
            dataTop: [],
            dataRecent: [],
            dataSource: [
                {
                    title: 'Anime 1',
                    caption: 'Caption 1',
                    url: 'https://i.redd.it/blj6tyqfn9c11.png'
                },
                {
                    title: 'Anime 1',
                    caption: 'Caption 1',
                    url: 'https://www.liveabout.com/thmb/gsUtdOaYQ5FNmNMG6zhIHCVcDGk=/2140x1516/filters:no_upscale():max_bytes(150000):strip_icc()/Naruto-Movie2-USA-56a014415f9b58eba4aed4cc.jpg'
                },
                {
                    title: 'Anime 2',
                    caption: 'Caption 2',
                    url: 'https://asset.kompas.com/crops/7U6sF_H36w2cNFSyuRIpL_9WVHk=/0x38:918x650/750x500/data/photo/2019/08/06/5d49760f7ce85.png'
                }
            ]
        }
    }

    componentDidMount(){
        this.getListTop()
        // axios.get('https://api.jikan.moe/v3/search/manga/?status=upcoming&page=1&limit=5')
        // .then((res)=>{
        //     this.props.dispatch(getAnimeLs(res.data.results))
        // })
        // alert('mount '+ JSON.stringify(this.props.getAnime.anime))
    }

    getListTop = ()=>{
        if(this.state.loading) { return; }
        this.setState({loading: true})
        axios.get('https://api.jikan.moe/v3/search/anime/?q=null&status=publishing&page='+this.state.current_page_top+'&limit=10')
        .then((res)=>{
            this.setState({
                hasMore: (this.state.current_page_top <= res.data.last_page),
                dataTop: [...this.state.dataTop,...res.data.results],
                loading: false,
                current_page_top: this.state.current_page_top + 1
            })
        }).catch((err)=>{this.setState({ error, loading: false})})
    }

    isCloseToBottomTop = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.width + contentOffset.x >=
          contentSize.width - paddingToBottom;
    }

    renderListMangaTop = () =>{
        return (this.state.dataTop.map((data, key)=>{
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

    _renderItem ({item, index}, parallaxProps) {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.url }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={styles.bannerTitle}>
                    <Text style={styles.title}>
                        { item.title }
                    </Text>
                </View>
            </View>
        );
    }

    get pagination(){
        return (
            <Pagination
              dotsLength={this.state.dataSource.length}
              activeDotIndex={this.state.sliderActiveSlide}
              containerStyle={{ backgroundColor: 'transparent', paddingTop: 11}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  marginHorizontal: -6,
                  backgroundColor: '#4AAFF7'
              }}
              inactiveDotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: '#C4C4C4'
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={1}
            />
        )
    }

    render(){
        return(
            // alert(JSON.stringify(this.state.test))
            <Container>
                <Header style={styles.headerBlack}>
                    <Body style={{marginLeft: 20, marginTop: 25}}><Text style={[styles.textWhite, {fontSize: 20}]}>Home Page</Text></Body>
                    <Right style={{flex: 1, justifyContent: 'flex-end', marginTop: 20}}>
                        <View style={styles.btnSearch}>
                            <Icon name='search' type='MaterialIcons' style={[styles.iconSearch]}/>
                        </View>
                    </Right>
                </Header>
                <Content style={styles.contentBlack}>
                <ScrollView>
                    <Carousel
                        sliderWidth={screenWidth}
                        sliderHeight={200}
                        itemWidth={screenWidth}
                        itemHeight={200}
                        data={this.state.dataSource}//this.state.dataSource}
                        renderItem={this._renderItem}
                        hasParallaxImages={true}
                        onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
                    />
                    {this.pagination}
                    <View style={{marginTop: -15, marginBottom: 16}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FE2742', width: 101, height: 36, borderTopRightRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold'}}>Top Manga</Text></View>
                            <Text style={{fontSize: 14, color: 'white', fontFamily: 'Roboto', marginRight: 19}}>Selengkapnya</Text>
                        </View>
                        <View style={{marginLeft: 11}}>
                            {/* <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                onScroll={({nativeEvent}) => {
                                    if(this.isCloseToBottomTop(nativeEvent) && this.state.hasMoreTop){
                                        this.getListTop()
                                    }
                                }}
                                // onMomentumScrollEnd={()=>alert('test')}
                            >
                                {this.renderListMangaTop()}
                            </ScrollView> */}
                            <TopCardLs/>
                        </View>
                    </View>
                    <View style={{marginBottom: 26}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FE2742', width: 130, height: 36, borderTopRightRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold'}}>Recent Manga</Text></View>
                            <Text style={{fontSize: 14, color: 'white', fontFamily: 'Roboto', marginRight: 19}}>Selengkapnya</Text>
                        </View>
                        <View style={{marginLeft: 11}}>
                            <RecentCardLs/>
                        </View>
                    </View>
                    <View style={{marginBottom: 26}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FE2742', width: 130, height: 36, borderTopRightRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold'}}>Favorite Manga</Text></View>
                            <Text style={{fontSize: 14, color: 'white', fontFamily: 'Roboto', marginRight: 19}}>Selengkapnya</Text>
                        </View>
                        <View style={{marginLeft: 11}}>
                            <RecentCardLs/>
                        </View>
                    </View>
                </ScrollView>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return state.reducer
}

export default connect(mapStateToProps)(Index)

const styles = StyleSheet.create({
    slideShow: {
        color: 'black'
    },
    headerBlack:{
        backgroundColor: '#181818',
        height: 64,
        paddingBottom: 15
    },
    textWhite:{
        color: '#C7C7C7',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        lineHeight: 23,
    },
    contentBlack:{
        backgroundColor: '#181818',
    },
    btnSearch: {
        backgroundColor: '#4AAFF7',
        height: 31,
        width: 46,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 21
    },
    iconSearch: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20

    },
    item: {
        width: screenWidth,
        height: 230,
      },
    imageContainer: {
        flex: 1,
        // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        // borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover'
    },
    bannerTitle: {
        position: 'absolute', 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
        width: '100%',
        height: 31,
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontFamily: 'roboto',
        fontSize: 14,
        marginLeft: 16
    }
})