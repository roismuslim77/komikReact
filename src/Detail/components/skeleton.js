import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Shimmer from '../../public/shimmer/shimmer'

class Index extends PureComponent{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.image_background}>
                    <View style={styles.navbar}> 
                    </View>
                    <View style={styles.contain}>
                        <View style={styles.image_contain}>
                            <Shimmer autoRun={true} style={styles.image}/>
                        </View>
                        <View style={styles.content}>
                            <Shimmer autoRun={true} style={styles.content_title}/>
                            <Shimmer autoRun={true} style={styles.content_subtitle}/>
                            <View style={styles.contain_icons}>
                                <View style={styles.contain_icons_content}>
                                    <Shimmer autoRun={true} style={styles.content_text}/>
                                </View>
                                <View style={styles.contain_icons_content}>
                                    <Shimmer autoRun={true} style={styles.content_text}/>
                                </View>
                                <View style={styles.contain_icons_content}>
                                    <Shimmer autoRun={true} style={styles.content_text}/>
                                </View>
                            </View>
                            <View><Shimmer autoRun={true} style={styles.content_text_white}/></View>
                        </View>
                    </View>
                    <View style={styles.content_detail}>
                        <Shimmer autoRun={true} style={styles.sinopsis_title}/>
                        <Shimmer autoRun={true} style={styles.sinopsis}/>
                        <View style={styles.category_container}>
                            <Shimmer autoRun={true} style={{width: '100%'}}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.chapter_line_top}></View>
                        <View style={styles.chapter_header_container}>
                            <Shimmer autoRun={true} style={styles.chapter_header_left}/>
                            <View style={styles.chapter_header_right}>
                                <Shimmer autoRun={true} style={styles.chapter_header_right_text}/>
                                <Shimmer autoRun={true} style={styles.chapter_header_right_icon}/>
                            </View>
                        </View>
                    <View style={styles.chapter_line_bottom}></View>
                    <View style={styles.chapter_container}>
                        <Shimmer autoRun={true} style={styles.chapter_scrollview}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    chapter_container:{
        flex:1
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
        backgroundColor: '#181818',
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
        backgroundColor: '#181818',
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
        height: 153,
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
        backgroundColor: '#181818',
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

export default Index