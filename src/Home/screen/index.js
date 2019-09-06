import React from 'react';
import {Text, StyleSheet, View, Image, Dimensions } from 'react-native'
import {Content, Header, Container, Body, Right, Icon} from 'native-base'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'

const { width: screenWidth } = Dimensions.get('window')

export default class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            position: 0,
            interval: null,
            sliderActiveSlide: 0,
            dataSource: [
                {
                    title: 'Anime 1',
                    caption: 'Caption 1',
                    url: 'https://i.redd.it/blj6tyqfn9c11.png'
                },
                {
                    title: 'Anime 1',
                    caption: 'Caption 1',
                    url: 'https://i.redd.it/blj6tyqfn9c11.png'
                },
                {
                    title: 'Anime 2',
                    caption: 'Caption 2',
                    url: 'https://source.unsplash.com/1024x768/?tree'
                }
            ],
            images: [
                'https://source.unsplash.com/1024x768/?nature',
                'https://source.unsplash.com/1024x768/?water',
                'https://source.unsplash.com/1024x768/?girl',
                'https://source.unsplash.com/1024x768/?tree'
              ]
        }
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
                    <Text style={styles.title} >
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
                    <Carousel
                        sliderWidth={screenWidth}
                        sliderHeight={200}
                        itemWidth={screenWidth}
                        itemHeight={200}
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        hasParallaxImages={true}
                        onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
                    />
                    {this.pagination}
                    <View style={{marginTop: -15}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FE2742', width: 101, height: 36, borderTopRightRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 16, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold'}}>Top Manga</Text></View>
                            <Text style={{fontSize: 14, color: 'white', fontFamily: 'Roboto', marginRight: 19}}>Selengkapnya</Text>
                        </View>
                        <View></View>
                    </View>
                    <View style={{marginTop: 5}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FE2742', width: 135, height: 36, borderTopRightRadius: 30, borderBottomRightRadius: 30, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 15, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold'}}>Recenlty Update</Text></View>
                            <Text style={{fontSize: 14, color: 'white', fontFamily: 'Roboto', marginRight: 19}}>Selengkapnya</Text>
                        </View>
                        <View></View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    slideShow: {
        color: 'black'
    },
    headerBlack:{
        backgroundColor: '#181818',
        height: 64,
    },
    textWhite:{
        color: '#C7C7C7',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        lineHeight: 23,
    },
    contentBlack:{
        backgroundColor: '#181818',
        paddingTop: 15
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