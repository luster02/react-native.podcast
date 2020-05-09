import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { usePodcast } from '../context/podcastContext'
import CardComponent from '../components/Card'
import CategoryComponent from '../components/Categories'
import LoadingComponent from '../components/Loading'
import { categories } from '../utils/validate'

const HomeScreen = ({ navigation }) => {

    const podcast = usePodcast()
    const { array } = podcast || []
    
    useEffect(() => {
        podcast.getAll()
    }, [])

    const mapCards = () => {
        return (
            array.map((item, index) => {
                return (
                    <CardComponent
                        item={item}
                        key={index}
                        navigation={navigation} />
                )
            })
        )
    }

    const mapCategories = () => {
        return (
            categories.map((item, index) => {
                return (
                    <CategoryComponent
                        icon={item.icon}
                        name={item.name}
                        key={index}
                        navigation={navigation} />
                )
            })
        )
    }

    if (podcast.Fetching === true) {
        return <LoadingComponent />
    }

    return (
        array.length === 0 && podcast.Fetching === false
            ? <View style={styles.container}>
                <Text>array is empity</Text>
            </View>
            : <SafeAreaView style={styles.SafeAreaView}>
                <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.titleScroll}>Categorias</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
                            {mapCategories()}
                        </ScrollView>
                    </View>
                    <View style={styles.marginScroll}>
                        <Text style={styles.titleScroll}>Destacados</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {mapCards()}
                        </ScrollView>
                    </View>
                    <View style={styles.marginScroll}>
                        <Text style={styles.titleScroll}>Recientes</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {mapCards()}
                        </ScrollView>
                    </View><View style={styles.marginScroll}>
                        <Text style={styles.titleScroll}>Recomendaciones</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {mapCards()}
                        </ScrollView>
                    </View>
                    <View style={{ height: 20 }}></View>
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
    titleScroll: {
        fontSize: 20
    },
    marginScroll: {
        marginTop: 9,
        marginBottom: 9
    },
    categories: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 4
    }
});

export default HomeScreen
