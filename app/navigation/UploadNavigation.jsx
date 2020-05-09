import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UploadPage from '../screens/UploadPage'
import Upload2Screen from '../screens/Upload2Screen'

const Stack = createStackNavigator()

const UploadStackScreens = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Publicar"
                component={UploadPage}
                options={() => ({
                    headerTitleAlign: "center",
                    headerShown: false,
                })}
            />
            <Stack.Screen
                name="Publicar2"
                component={Upload2Screen}
                options={{
                    headerTitleAlign: "center",
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default UploadStackScreens