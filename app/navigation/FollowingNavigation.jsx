import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FollowingScreen from '../screens/FollowingScreen'

const Stack = createStackNavigator()

const FollowingStackScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Siguiendo"
                component={FollowingScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default FollowingStackScreens