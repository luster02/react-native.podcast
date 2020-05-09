import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { withTheme } from 'react-native-paper'
import { useAuth } from '../context/authContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import LoadingComponent from '../components/Loading'

import HomeStackScreens from './HomeNavigation'
import ProfileStackScreens from './ProfileNavigator'
import UploadStackScreens from './UploadNavigation'
import LoginNavigation from './LoginNavigation'
import FollowingStackScreens from './FollowingNavigation'
import DetailScreen from '../screens/DetailScreen'
import ProfileModal from '../screens/ProfileModal'

const Tab = createBottomTabNavigator()
const RootStack = createStackNavigator();

const Navigation = ({ theme }) => {
    const { colors } = theme || {}
    const { isAuth, Loading, currentUser, Token } = useAuth()

    useEffect(() => {
        currentUser()
    }, [Token])

    function getTabBarVisibility(route) {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';
        if (routeName === 'Edit' || routeName === 'Publicar') {
            return false;
        }
        return true;
    }

    function mainStack() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: colors.primary
                }}
                initialRouteName={isAuth ? 'Inicio' : 'Login'}
            >
                {isAuth
                    ?
                    (<>
                        <Tab.Screen
                            name="Inicio"
                            component={HomeStackScreens}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome name="home" color={color} size={size} />
                                )
                            }}
                        />
                        <Tab.Screen
                            name="Siguiendo"
                            component={FollowingStackScreens}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome name="users" color={color} size={size} />
                                )
                            }}
                        />
                        <Tab.Screen
                            name="Publicar"
                            component={UploadStackScreens}
                            options={({ route }) => ({
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome name="plus-square" color={color} size={size} />
                                ),
                                tabBarVisible: false
                            })}
                        />
                        <Tab.Screen
                            name="Perfil"
                            component={ProfileStackScreens}
                            options={({ route }) => ({
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome name="user" color={color} size={size} />
                                ),
                                tabBarVisible: getTabBarVisibility(route)
                            })}
                        />
                    </>
                    )
                    : (
                        <Tab.Screen
                            name="Login"
                            component={Loading ? LoadingComponent : LoginNavigation}
                            options={{
                                tabBarVisible: false
                            }}
                        />
                    )
                }
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }}
                mode="modal">
                <RootStack.Screen
                    name="main"
                    component={mainStack}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="detailModal"
                    component={DetailScreen}
                    options={{
                        headerTitleAlign: "center",
                        headerShown: false
                    }}
                />
                <RootStack.Screen
                    name="ProfileModal"
                    component={ProfileModal}
                    options={{
                        headerTitleAlign: "center",
                        headerShown: false
                    }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default withTheme(Navigation)
