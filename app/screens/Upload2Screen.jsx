import React, { useState } from 'react'
import { Text, StyleSheet, SafeAreaView, ScrollView, View, Image, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import * as DocumentPicker from 'expo-document-picker';
import FontAW from 'react-native-vector-icons/FontAwesome5'
import { usePodcast } from '../context/podcastContext'
import { useAuth } from '../context/authContext'
import LoadingComponent from '../components/Loading'


const Upload2Screen = ({ navigation, route }) => {
    const { params } = route || {}
    const podcast = usePodcast()
    const auth = useAuth()
    const [Cover, setCover] = useState({})
    const [Prev, setPrev] = useState('')
    const [Audio, setAudio] = useState({})
    const [AudioPrev, setAudioPrev] = useState('')

    function _handleBackPress() {
        Alert.alert(
            "Descartar cambios",
            "Se perdaran todos los cambios hasta el momento.",
            [
                {
                    text: "Continuar escribiendo",
                    onPress: () => console.log("No, continue editing")
                },
                {
                    text: "Descartar cambios",
                    onPress: () => discard(),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    }

    async function discard() {
        await podcast.deletePodcast(params.id)
        navigation.navigate('Inicio')
    }

    async function save() {
        if (Cover == '' && Audio == '') {
            console.log('campos vacios')
        } else {
            const FMD1 = new FormData()
            const FMD2 = new FormData()
            FMD1.append('file', Cover)
            FMD2.append('file', Audio)
            const res = await podcast.setPhoto(FMD1, params.id)
            const res2 = await podcast.setAudio(FMD2, params.id)
            if (res !== null && res2 !== null) {
                console.log('todo ok')
                navigation.navigate('Inicio')
                auth.setFetching(true)
            }
        }
    }


    async function onAudio() {
        try {
            const res = await DocumentPicker.getDocumentAsync({ type: 'audio/*', multiple: false })
            if (res.type === 'success') {
                setAudioPrev(res.name)
                let file = { uri: res.uri, name: res.name }
                let match = /\.(\w+)$/.exec(res.name);
                let type = match ? `image/${match[1]}` : `image`
                file.type = type
                setAudio(file)
            } else {
                console.log('cancel')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function onCover() {
        try {
            const res = await DocumentPicker.getDocumentAsync({ type: 'image/*', multiple: false })
            if (res.type === 'success') {
                setPrev(res.uri)
                let file = { uri: res.uri, name: res.name }
                let match = /\.(\w+)$/.exec(res.name);
                let type = match ? `image/${match[1]}` : `image`
                file.type = type
                setCover(file)
            } else {
                console.log('cancel')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.row}>
                {podcast.Fetching === true
                    ? <FontAW name="times" color="#c6c2bd" size={22} />
                    : <FontAW name="times" onPress={_handleBackPress} size={22} />
                }

                <Text style={{ fontSize: 20 }}>Publicar</Text>
                {podcast.Fetching === true
                    ? <FontAW name="check" color="#c6c2bd" size={22} />
                    : <FontAW name="check" onPress={save} size={22} />
                }
            </View>
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.margin}>
                    <Text style={{ textAlign: "center" }}>Selecciona el cover de tu podcast</Text>
                    {Prev !== '' && <Image style={styles.img} source={{ uri: Prev }} />}
                    <Button onPress={onCover}>
                        {Prev !== ''
                            ? 'cambiar'
                            : 'seleccionar'
                        }
                    </Button>
                </View>
                <View style={styles.margin}>
                    <Text style={{ textAlign: "center" }}>Selecciona el audio de tu podcast</Text>
                    {AudioPrev !== '' && <Text>{AudioPrev}</Text>}
                    <Button onPress={onAudio}>
                        {AudioPrev !== ''
                            ? 'cambiar'
                            : 'seleccionar'
                        }
                    </Button>
                </View>
                <View style={styles.center}>
                    {podcast.Fetching == true &&
                        <>
                            <LoadingComponent />
                            <Text>Cargando ...</Text>
                        </>
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
        backgroundColor: "#fff",
    },
    main: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingLeft: 30,
        paddingRight: 30
    },
    margin: {
        margin: 25,
        alignItems: 'center'
    },
    img: {
        height: 250,
        width: 250
    },
    center: {
        alignItems: "center"
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    }
})

export default Upload2Screen
