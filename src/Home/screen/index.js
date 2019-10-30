import React from 'react';
import {Text, StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import axios from 'axios'

import Shimmer from '../../public/shimmer/shimmer'
import RecentCardLs from '../components/recentCardList'
import TopCardLs from '../components/topCardList'

const { width: screenWidth } = Dimensions.get('window')

const base_api = 'http://apimanga.idmustopha.com/public'
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            position: 0,
            interval: null,
            sliderActiveSlide: 0,
            error: null,
            loading: true,
            dataSource: []
        }
    }

    componentDidMount(){
        this.getListCarousel()
    }

    getListCarousel = async() =>{
        await axios.post(base_api+'/manga/list?limit=9&category=Random&page=1')
        .then((res)=>{
            res.data.result.rows.map((data, key)=>{
                this.setState({
                    dataSource: [...this.state.dataSource, {
                        'title': data.title,
                        'caption':data.title,
                        'url':data.image
                    }], 
                    loading: false
                })
            })
        }).catch((err)=>{
            alert(err.response)
        })
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

    more_click = (data) =>{
        this.props.navigation.navigate('MoreScreen',{header: data})
    }

    render(){
        return(
            // alert(JSON.stringify(this.state.test))
            <View>
                <View style={styles.headerBlack}>
                    <View style={{flex: 5, marginLeft: 20, marginTop: 25}}><Text style={[styles.textWhite, {fontSize: 20}]}>Home Page</Text></View>
                    <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 20}}>
                        <View style={styles.btnSearch}>
                            <Icon name='search' type='MaterialIcons' style={[styles.iconSearch]}/>
                        </View>
                    </View>
                </View>
                <View style={styles.contentBlack}>
                <ScrollView>
                    {this.state.loading ? 
                        <Shimmer style={{height: 200, width: '100%', marginBottom: 80}} autoRun={true} visible={false}></Shimmer> 
                        :
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
                    }
                    {this.pagination}
                    <View style={{marginTop: -15, marginBottom: 16}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FE2742', width: 101, height: 36, borderTopRightRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold'}}>Top Manga</Text></View>
                            <Text onPress={()=>this.more_click('top')} style={{fontSize: 14, color: 'white', fontFamily: 'Roboto', marginRight: 19}}>Selengkapnya</Text>
                        </View>
                        <View style={{marginLeft: 11}}>
                            <TopCardLs navigation={this.props.navigation}/>
                        </View>
                    </View>
                    <View style={{marginBottom: 26}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FE2742', width: 130, height: 36, borderTopRightRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold'}}>Recent Manga</Text></View>
                            <Text onPress={()=>this.more_click('recent')} style={{fontSize: 14, color: 'white', fontFamily: 'Roboto', marginRight: 19}}>Selengkapnya</Text>
                        </View>
                        <View style={{marginLeft: 11}}>
                            <RecentCardLs navigation={this.props.navigation}/>
                        </View>
                    </View>
                </ScrollView>
                </View>
            </View>
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
        paddingBottom: 15,
        flexDirection: 'row'
    },
    textWhite:{
        color: '#C7C7C7',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        lineHeight: 23,
    },
    contentBlack:{
        backgroundColor: '#181818',
        paddingBottom: '11%'
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