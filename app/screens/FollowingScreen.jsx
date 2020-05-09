import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { usePodcast } from '../context/podcastContext'
import FontAW from 'react-native-vector-icons/FontAwesome5'
import CardComponent from '../components/Card'
import LoadingComponent from '../components/Loading'

const FollowingScreen = ({ navigation }) => {
    const podcast = usePodcast()
    const { Following } = podcast || []

    useEffect(() => {
        podcast.getFollowing()
    }, [])

    const mapCards = () => {
        return (
            Following.map((item, index) => {
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
        Following.length === 0 && podcast.Fetching === false
            ? <View style={styles.container}>
                <FontAW name="users" size={130} color="#5f6caf" />
                <Text style={styles.noDataText}>No hay publicaciones, intenta seguir a otro usuario</Text>
            </View>
            : <SafeAreaView style={styles.SafeAreaView}>
                <Text style={styles.headerTitle}>Siguiendo</Text>
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
    noDataText: {
        fontSize: 20,
        textAlign: 'center'
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
});

export default FollowingScreen
