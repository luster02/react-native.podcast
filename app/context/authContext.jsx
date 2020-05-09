import React, { useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { dev } from '../enviroment/enviroment.dev'

const AuthContext = React.createContext()

export function AuthProvider(props) {
    const API = dev(false)
    const url = `${API}/auth`
    const [isAuth, setisAuth] = useState(false)
    const [user, setUser] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [Fetching, setFetching] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [Token, setToken] = useState(null)

    useEffect(() => {
        currentUser()
        setFetching(false)
    }, [refresh])

    async function currentUser() {
        try {
            setLoading(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.get(`${url}/current`, { headers: { 'x-token': token } })
            if (res.data.user && res.data.ok === true) {
                setisAuth(true)
                setUser(res.data.user)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    async function login(data) {
        try {
            setFetching(true)
            const res = await axios.post(`${url}/login`, data);
            if (res.data.ok === true && res.data.token) {
                await AsyncStorage.setItem('x-token', res.data.token)
                setRefresh(true)
                setToken(res.data.token)
                setTimeout(() => {
                    setisAuth(true)
                }, 1000)
            }
            setFetching(false)
            return res
        } catch (error) {
            setFetching(false)
            console.log(error)
        }
    }


    async function register(data) {
        try {
            setFetching(true)
            const res = await axios.post(`${url}/create`, data)
            if (res.data.ok === true && res.data.token) {
                await AsyncStorage.setItem('x-token', res.data.token)
                setRefresh(true)
                setToken(res.data.token)
                setTimeout(() => {
                    setisAuth(true)
                }, 1000)
            }
            setFetching(false)
            return res.data
        } catch (error) {
            setFetching(false)
            console.log(error)
        }
    }

    async function editProfile(body) {
        try {
            setFetching(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.post(`${url}/edit`, body, { headers: { 'x-token': token } })
            if (res.data.ok === true && res.data.token) {
                setRefresh(true)
                setToken(res.data.token)
            }
            setFetching(false)
        } catch (error) {

        }
    }

    async function logOut() {
        try {
            await AsyncStorage.removeItem('x-token')
            setisAuth(false)
            setUser(null)
            setToken(null)
            setRefresh(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function followUser(_id="") {
        try {
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.get(`${url}/follow?_id=${_id}`,{headers: {'x-token': token}})
            console.log(res)
            if(res.data.ok===true){
                return res.data
            }else {
                return null
            }                                
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        isAuth,
        login,
        register,
        currentUser,
        logOut,
        user,
        Loading,
        Fetching,
        Token,
        editProfile,
        setFetching,
        followUser
    }

    return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth is out from provider')
    }
    return context;
}