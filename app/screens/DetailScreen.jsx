import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native'

const DetailScreen = ({ route }) => {
    const { params } = route || {}

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.main}>
                <View>
                    <Text style={styles.title} >{params.item.title}</Text>
                </View>
                <View >
                    <Image style={styles.img} source={{ uri: 'https://picsum.photos/700' }} />
                </View>
                <View >
                    <Text style={styles.description} >{params.item.user.displayName ? params.item.user.displayName: params.item.user.email}</Text>
                </View>
                <View >
                    <Text style={styles.description} >{params.item.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SafeAreaView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: "#fff",
    },
    main: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    img: {
        alignSelf: 'center',
        width: '80%',
        paddingTop: '70%'
    },
    title: {
        fontSize: 25,
        marginBottom: 10
    },
    description: {
        fontSize: 18,
        marginTop: 15
    },  
    center: {
        alignItems: 'center'
    }
})

export default DetailScreen
