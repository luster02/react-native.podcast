import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

const LoginScreen = ({navigation}) => {

    const toEnter = () => {
        navigation.navigate('Enter')
    }

    const toRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            <Button onPress={toEnter} style={styles.buttonStyle} mode="outlined">
                Sign in
            </Button>
            <Button onPress={toRegister} style={styles.buttonStyle} mode="contained">
                Sign up
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {   
        borderWidth: 2,
        width: 200,
        margin: 10
    }
});

export default LoginScreen
