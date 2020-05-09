import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import LoadingComponent from '../components/Loading'
import CardComponent from '../components/Card'
import { usePodcast } from '../context/podcastContext'

const CategoryScreen = ({ route, navigation }) => {
    const { params } = route || {}
    const podcast = usePodcast()
    const { Category } = podcast || []

    useEffect(() => {
        podcast.getByCategory(params.name)
    }, [])

    function noData() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Noy hay resultados para: {params.name}</Text>
                </View>
            </View>
        )
    }

    const mapCards = () => {
        return (
            Category.map((item, index) => {
                return (
                    <CardComponent item={item} width={350} key={index} navigation={navigation} />
                )
            })
        )
    }

    if (podcast.Fetching === true) {
        return <LoadingComponent />
    }

    return (
        Category.length === 0 && podcast.Fetching === false
            ? noData()
            : <SafeAreaView style={styles.SafeAreaView}>
                <Text style={styles.headerTitle}>{params.name}</Text>
                <ScrollView
                    contentContainerStyle={styles.main}
                    showsVerticalScrollIndicator={false}
                >
                    {mapCards()}
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
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding: 20
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 15,
        //fontWeight: "bold",
        textAlign: "left"
    }
})

export default CategoryScreen
