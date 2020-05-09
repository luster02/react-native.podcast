import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from '../../context/authContext'
import FontAW from 'react-native-vector-icons/FontAwesome5'
import { validateEmail } from '../../utils/validate'

const SignupScreen = ({ navigation }) => {

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Password2, setPassword2] = useState('')
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
        if (Email !== '' && Password !== '' && Password2 !== '') {
            if (Password !== Password2) {
                createAlert("Las contraseñas no coinciden", 'Las contraseñas deben ser iguales')
            } else {
                if (!validateEmail(Email)) {
                    createAlert('Correo invalido', 'Escribe un correo electronico valido')
                } else {
                    const res = await auth.register(body)
                    if (!res.ok === true && !res.token) {
                        createAlert('Un error ha ocurrido', 'un error ha ocurrido, intenta mas tarde')
                    }
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
        <ScrollView
            contentContainerStyle={styles.mainContainer}
            keyboardShouldPersistTaps='handled'
            centerContent={true}>
            <View>
                <FontAW onPress={back} name="caret-left" style={{ marginTop: -150 }} size={40} />
            </View>
            <View >
                <TextInput
                    mode="outlined"
                    style={styles.input}
                    label='Email'
                    disabled={auth.Fetching}
                    underlineColorAndroid="transparent"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    mode="outlined"
                    style={styles.input}
                    label='Password'
                    disabled={auth.Fetching}
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    mode="outlined"
                    style={styles.input}
                    label='Repeat Password'
                    disabled={auth.Fetching}
                    onChangeText={text => setPassword2(text)}
                />
                <View style={styles.center}>
                    <Button onPress={sendData} disabled={auth.Fetching} style={styles.btn} mode="contained">
                        Sign up
                    </Button>
                </View>
            </View>
        </ScrollView>

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

export default SignupScreen
