import React from 'react'
import {View, Text, ImageBackground, Image, ScrollView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

class Index extends React.Component{
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
        var element=[]
        for (let i = 0; i < 20; i++) {
            element.push(
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 39, marginLeft: 23, marginBottom: 22}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ChapterScreen',{ id: i})}} style={{width: '100%'}}>
                        <View>
                            <Text style={{color: '#4AAFF7', fontSize: 14, lineHeight: 16, fontWeight: 'bold'}}>Chapter {i+1}</Text>
                            <Text style={{color: '#DDDDDD', fontSize: 16, lineHeight: 19}}>Who am i ?</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ChapterScreen',{ id: 1})}}>
                        <Icon style={{fontSize: 20, color: 'black'}} name='angle-right'/>
                    </TouchableOpacity>
                </View>
            )
        }
        return(element)
    }

    getCategoryItem = ()=>{
        var element=[]
        for (let i = 0; i < 6; i++) {
            element.push(
                <TouchableOpacity style={[this.getRandomColor(),{borderRadius: 30, width: 82, height: 34, justifyContent: 'center', alignItems: 'center', marginRight: 5}]}>
                    <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>Action</Text>
                </TouchableOpacity>
            )
        }
        return(element)
    }

    render(){
        return(
            <View style={{flex: 1,backgroundColor: '#181818'}}>
                <ImageBackground resizeMode='cover' style={{width: '100%', flex:1.4}} source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-267.jpg?quality=65'}}>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingLeft: 22, paddingTop: 27, paddingRight: 25}}> 
                        <Icon onPress={()=>{this.props.navigation.pop()}} style={{color: '#DDDDDD', fontSize: 25}} name="arrow-left"/>
                        <Icon style={{color: '#DDDDDD', fontSize: 25}} name="heart"/>
                    </View>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 3, flexDirection:'row', paddingRight: 14, paddingLeft: 22}}>
                        <View style={{flex: 1}}>
                            <Image style={{width: 119, height: 167, borderRadius: 10}} source={{uri: 'https://i0.wp.com/komiku.co/wp-content/uploads/20190403-komiku-267.jpg?quality=65'}}/>
                        </View>
                        <View style={{flex:2, marginLeft: 7, marginTop: 2}}>
                            <Text style={{color: '#E0E0E0', fontSize: 16, lineHeight: 19, fontWeight: 'bold'}}>Isekai Maou to Shoukan Shoujo no Dorei Majutsu</Text>
                            <Text style={{color: '#E0E0E0', fontSize: 12, lineHeight: 14, marginTop: 4}}>Tsurusaki, Takahiro (Art), Murasaki, Yukiya (Story)</Text>
                            <View style={{flexDirection: 'row',justifyContent: 'flex-start', paddingTop: 9}}>
                                <View style={{flexDirection: 'row', marginRight: 14}}>
                                    <Icon name='eye' style={{color: '#4AAFF7', fontSize: 18, marginRight: 3}}/>
                                    <Text style={{color: '#4AAFF7', fontSize: 12, fontWeight: 'bold', lineHeight: 14, marginTop: 2}}>12K</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginRight: 14}}>
                                    <Icon name='heart' style={{color: '#4AAFF7', fontSize: 18, marginRight: 3}}/>
                                    <Text style={{color: '#4AAFF7', fontSize: 12, fontWeight: 'bold', lineHeight: 14, marginTop: 2}}>1.3K</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginRight: 14}}>
                                    <Icon name='star' style={{color: '#4AAFF7', fontSize: 18, marginRight: 3}}/>
                                    <Text style={{color: '#4AAFF7', fontSize: 12, fontWeight: 'bold', lineHeight: 14, marginTop: 2}}>8.8</Text>
                                </View>
                            </View>
                            <View><Text style={{color:'#E0E0E0', fontSize: 12, lineHeight: 14, fontWeight: 'bold', marginTop: 13}}>300 Comments</Text></View>
                        </View>
                    </View>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 3.1, paddingRight: 12, paddingLeft: 22, paddingTop: 10}}>
                        <Text style={{color: '#E0E0E0', fontSize: 14, lineHeight: 16, fontWeight: 'bold', marginBottom: 14}}>Sinopsis</Text>
                        <Text numberOfLines={5} style={{textAlign: 'justify',color: '#E0E0E0', fontSize: 14, lineHeight: 16}}>In regards to the MMORPG Cross Reverie, Sakamoto Takuma boasted an overwhelming strength that was enough for him to be 
                        called the Demon King by the other players. One day, he gets summoned to another world with his appearance in the game. There, there are two people all rightIn regards to the MMORPG Cross Reverie, Sakamoto Takuma boasted an overwhelming strength that was enough for him to be called the Demon King by the other players. One day, he gets summoned to another world with his appearance in the game. There, there are two people ...</Text>
                        <View style={{marginTop: 13}}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>{this.getCategoryItem()}</ScrollView>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{flex: 1}}>
                    <View style={{backgroundColor: '#C4C4C4', height: 2, marginRight: 11, marginLeft: 12, opacity: 0.5, paddingTop: 3}}></View>
                    <View style={{marginTop: 16, marginLeft: 23, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', marginRight: 28}}>
                        <Text style={{color: '#E0E0E0', fontSize: 16, lineHeight: 19, fontWeight: 'bold'}}>Chapter {this.props.navigation.getParam('id')}</Text>
                        <View style={{flexDirection: 'row', alignContent: 'center'}}>
                            <Text style={{color: '#E0E0E0', fontSize: 16, fontWeight: 'bold', marginRight: 6}}>sort</Text>
                            <Icon style={{color: '#E0E0E0', fontSize: 18}} name='sort'/>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#C4C4C4', height: 2, marginRight: 11, marginLeft: 12, opacity: 0.5}}></View>
                    <View>
                        <ScrollView style={{paddingTop: 16}}>
                            {this.getChapterItem()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

export default Index