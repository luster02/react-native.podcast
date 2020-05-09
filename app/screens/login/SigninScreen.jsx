import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from '../../context/authContext'
import FontAW from 'react-native-vector-icons/FontAwesome5'
import { validateEmail } from '../../utils/validate'

const SigninScreen = ({ navigation }) => {

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const auth = useAuth()

    const createAlert = (title, subTitle) => {
        Alert.alert(
            title,
            subTitle,
            [
                {
                    text: "OK",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    }

    const sendData = async () => {
        const body = { email: Email, password: Password }
        if (Email !== '' && Password !== '') {
            if (!validateEmail(Email)) {
                createAlert('Correo invalido', 'Escribe un correo electronico valido')
            } else {
                const res = await auth.login(body)
                if (res.data.code === "data/not/found") {
                    createAlert('Usuario no encontrado', 'El correo no esta asosiado con ninguna cuenta')
                } else if (res.data.code === "email/password/incorrect") {
                    createAlert('Correo o contraseña incorrectos', 'Correo electronico o contraseña incorrectos')
                }
            }
        } else {
            createAlert('Los campos estan vacios', 'Los campos deben estan llenos para continuar')
        }
    }

    function back() {
        navigation.goBack()
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.mainContainer}
                keyboardShouldPersistTaps='handled'
                centerContent={true}>
                <View>
                    <FontAW onPress={back} name="caret-left" style={{ marginTop: -190 }} size={40} />
                </View>
                <View style={styles.radius}>
                    <TextInput
                        mode="outlined"
                        style={styles.input}
                        label='Email'
                        textContentType="emailAddress"
                        disabled={auth.Fetching}
                        underlineColorAndroid="transparent"
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View>
                    <TextInput
                        secureTextEntry={true}
                        mode="outlined"
                        style={styles.input}
                        label='Password'
                        disabled={auth.Fetching}
                        onChangeText={text => setPassword(text)}
                    />
                </View>
                <View style={styles.center}>
                    <Button
                        onPress={sendData}
                        disabled={auth.Fetching}
                        style={styles.btn} 
                        mode="contained">
                        sign in
                    </Button>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
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
        marginTop: 25,
        width: 150
    },
    center: {
        alignItems: "center"
    },
    radius: {
        borderRadius: 25,
    }
});

export default SigninScreen
