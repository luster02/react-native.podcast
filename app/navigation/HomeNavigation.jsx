import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import CategoryScreen from '../screens/CategoryScreen'

const Stack = createStackNavigator()

const HomeStackScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="category"
                component={CategoryScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStackScreens