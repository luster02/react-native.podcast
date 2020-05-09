import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import ProfileScreen from '../screens/ProfileScreen'
import EditProfileScreen from '../screens/EditProfile'

const Stack = createStackNavigator()

const ProfileStackScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Edit"
                component={EditProfileScreen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: true,
                    title: 'Editar perfil',
                    
                }}
            />
        </Stack.Navigator>
    )
}

export default ProfileStackScreens