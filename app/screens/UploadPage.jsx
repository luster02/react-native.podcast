import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, Picker, Text, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import FontAW from 'react-native-vector-icons/FontAwesome5'
import { categories } from '../utils/validate'
import { usePodcast } from '../context/podcastContext'
import LoadingComponent from '../components/Loading'

const UploadPage = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState('Ciencia');
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const podcast = usePodcast()


    function cancel() {
        navigation.goBack()
    }

    async function next() {
        if (Title === '' && Description === '') {
            Alert.alert(
                "Los campos son requiridos",
                "Todos los campos son requieridos para continuar.",
                [
                    {
                        text: "OK",
                    }
                ],
                { cancelable: false }
            );
        } else {
            const body = { title: Title, description: Description, category: selectedValue }
            const res = await podcast.create(body)
            console.log(res.data)
            if (res !== null && res.ok === true) {
                navigation.push('Publicar2', { id: res.data._id })
            }
        }


    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.row}>
                {podcast.Fetching === true
                    ? <FontAW name="times" color="#c6c2bd" size={22} />
                    : <FontAW name="times" onPress={cancel} size={22} />
                }
                <Text style={{ fontSize: 20 }}>Publicar</Text>
                {podcast.Fetching === true
                    ? <FontAW name="arrow-right" color="#c6c2bd" size={22} />
                    : <FontAW name="arrow-right" onPress={next} size={22} />
                }
            </View>
            <ScrollView contentContainerStyle={styles.main}>
                <View>
                    <TextInput
                        mode="flat"
                        style={styles.input}
                        label='Titulo'
                        value={Title}
                        onChangeText={text => setTitle(text)}
                    />
                    <TextInput
                        mode="flat"
                        style={styles.input}
                        label='descripción'
                        value={Description}
                        onChangeText={text => setDescription(text)}
                    />
                    <View style={styles.picker}>
                        <Text style={{ marginBottom: 10 }}>categoría</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            {categories.map(({ name }) => {
                                return (
                                    <Picker.Item key={name} label={name} value={name} />
                                )
                            })}
                        </Picker>
                    </View>
                    <View style={styles.center}>
                        {podcast.Fetching == true && <LoadingComponent />}
                    </View>
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
    input: {
        margin: 10,
        backgroundColor: '#fff',
    },
    btn: {
        width: 200,
        marginTop: 25
    },
    center: {
        alignItems: "center"
    },
    picker: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    },
});

export default UploadPage
