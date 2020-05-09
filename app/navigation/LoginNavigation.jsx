import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import LoginScreen from '../screens/login/LoginScreen'
import SigninScreen from '../screens/login/SigninScreen'
import SignupScreen from '../screens/login/SignupScreen'

const Stack = createStackNavigator()

const LoginStackScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Enter"
                component={SigninScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={SignupScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default LoginStackScreens