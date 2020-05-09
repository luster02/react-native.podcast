import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { Button, Avatar, Drawer } from 'react-native-paper'
import { useAuth } from '../context/authContext'
import { usePodcast } from '../context/podcastContext'
import FontAW from 'react-native-vector-icons/FontAwesome5'
import CardComponent from '../components/Card'
import LoadingComponent from '../components/Loading'

const ProfileScreen = ({ navigation }) => {

    const auth = useAuth()
    const { user } = auth || {}
    const podcast = usePodcast()
    const { Owner } = podcast || []
    let [isVisible, setisVisible] = useState(false)

    useEffect(() => {
        podcast.getOwner(user._id)
    }, [])

    function logOut() {
        setisVisible(false)
        Alert.alert(
            "Cerrar sesion",
            "Cofirma para cerrar sesion",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "Cerrar sesion", onPress: () => auth.logOut() }
            ],
            { cancelable: false }
        )
    }

    function toggleDrawer() {
        setisVisible(isVisible = !isVisible)
    }

    function nav() {
        navigation.push('Edit', { user: user })
        setisVisible(false)
    }

    const mapCards = () => {
        return (
            Owner.map((item, index) => {
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

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
                <View style={styles.row}>
                    <View style={styles.center}>
                        {user.photoURL
                            ? <Avatar.Image size={80} source={user.photoURL} />
                            : <Avatar.Icon size={80} icon="account" />
                        }
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.box}>
                            <Text style={styles.number}>{Owner.length}</Text>
                            <Text style={styles.number}>Publicados</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.number}>{user.followers.length}</Text>
                            <Text style={styles.number}>Seguidores</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.number}>{user.following.length}</Text>
                            <Text style={styles.number}>Seguidos</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row3}>
                    {user.displayName
                        ? <Text style={styles.name} > {user.displayName} </Text>
                        : <Text style={styles.name} > {user.email} </Text>
                    }
                    <Button mode={isVisible ? "contained" : "outlined"} style={styles.btn} onPress={toggleDrawer} >
                        Opciones
                    </Button>
                </View>
                <View >
                </View>

                <View style={styles.center2}>
                    {Owner.length === 0 && podcast.Fetching === false
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
            {isVisible && <Drawer.Section title="Opciones">
                <Drawer.Item
                    label="Editar perfil"
                    onPress={() => nav()}
                />
                <Drawer.Item
                    label="Cerrar sesion"
                    onPress={() => logOut()}
                />
            </Drawer.Section>}
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
        width: 150,
    },
    
});

export default ProfileScreen
