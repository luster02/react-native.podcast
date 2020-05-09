import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from '../context/authContext'

const EditProfileScreen = ({ route }) => {

    const { params } = route || {}
    const { user } = params || {}
    const auth = useAuth()
    const [Phone, setPhone] = useState('')
    const [Name, setName] = useState('')

    useEffect(() => {
        setValues()
    }, [])

    function setValues() {
        user.phone ? setPhone(user.phone) : setPhone('')
        user.displayName ? setName(user.displayName) : setName('')
    }

    function send() {
        const body = { displayName: Name, phone: Phone }
        auth.editProfile(body)
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <ScrollView contentContainerStyle={styles.main}>
                <TextInput
                    mode="flat"
                    style={styles.input}
                    label='Telefono'
                    value={Phone}
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    mode="flat"
                    style={styles.input}
                    label='Nombre'
                    value={Name}
                    onChangeText={text => setName(text)}
                />
                <View style={styles.center}>
                    <Button
                        mode="contained"
                        style={styles.btn}
                        onPress={send}
                    >
                        Gurardar
                    </Button>
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
        //paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: "#fff",
    },
    main: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
})

export default EditProfileScreen
