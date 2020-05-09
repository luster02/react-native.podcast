import React, { useEffect, useState } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet, Text } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import { usePodcast } from '../context/podcastContext'
import { useAuth } from '../context/authContext'
import FontAW from 'react-native-vector-icons/FontAwesome5'
import CardComponent from '../components/Card'
import LoadingComponent from '../components/Loading'

const ProfileModal = ({ route, navigation }) => {
    const { params } = route || {}
    const podcast = usePodcast()
    const { Owner2 } = podcast || []
    const [isVisible, setisVisible] = useState(false)
    const [Reload, setReload] = useState(false)
    const auth = useAuth()


    useEffect(() => {
        setReload(false)
        podcast.getOwner2(params.user._id)
        isFollowing()
    }, [Reload])

    const mapCards = () => {
        return (
            Owner2.map((item, index) => {
                return (
                    <View style={styles.col} key={index}>
                        <CardComponent width={320} item={item} navigation={navigation} />
                    </View>
                )
            })
        )
    }

    if (podcast.Fetching === true) {
        return <LoadingComponent />
    }

    async function followUser() {
        const res = await auth.followUser(params.user._id)
        if (res.ok === true) {
            setReload(true)
        }
    }

    function isFollowing() {
        if(params.user.followers.includes(auth.user._id)){
            setisVisible(true)
        }
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.main}>
                <View style={styles.row}>
                    <View style={styles.center}>
                        {params.user.photoURL
                            ? <Avatar.Image size={80} source={user.photoURL} />
                            : <Avatar.Icon size={80} icon="account" />
                        }
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.box}>
                            <Text style={styles.number}>{Owner2.length}</Text>
                            <Text style={styles.number}>Publicados</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.number}>{params.user.followers.length}</Text>
                            <Text style={styles.number}>Seguidores</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.number}>{params.user.following.length}</Text>
                            <Text style={styles.number}>Seguidos</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row3}>
                    {params.user.displayName
                        ? <Text style={styles.name} > {params.user.displayName} </Text>
                        : <Text style={styles.name} > {params.user.email} </Text>
                    }
                    {params.user._id !== auth.user._id &&
                        <Button
                            mode={isVisible ? "contained" : "outlined"}
                            onPress={followUser}
                            style={styles.btn} >
                            {isVisible
                                ? 'Dejar de seguir'
                                : 'Seguir'
                            }
                        </Button>
                    }
                </View>
                <View style={styles.center2}>
                    {Owner2.length === 0 && podcast.Fetching === false
                        ? <View style={styles.container}>
                            <FontAW name="box-open" size={130} color="#5f6caf" />
                            <Text style={styles.noDataText}>No hay publicaciones, intenta subir un podcast</Text>
                        </View>
                        : <View >
                            {mapCards()}
                            <View style={{ height: 25 }} />
                        </View>
                    }
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
        backgroundColor: "#fff"
    },
    main: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    },
    center: {
        marginLeft: 10,
        alignItems: "center"
    },
    center2: {
        marginTop: 30,
        alignItems: "center"
    },
    name: {
        marginLeft: -4,
        fontSize: 16
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    row3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    box: {
        marginTop: 20,
        marginLeft: 10
    },
    number: {
        textAlign: "center"
    },
    btn: {
        marginTop: -5,
        marginRight: 50,
        height: 35,
        width: 200,
    },
})

export default ProfileModal
