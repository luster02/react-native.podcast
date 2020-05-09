import React, { useState } from 'react'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { dev } from '../enviroment/enviroment.dev'

const PodcastContext = React.createContext()

export function PodcastProvider(props) {
    const API = dev(false)
    const url = `${API}/podcast`
    const url2 = `${API}/audio`
    const [array, setArray] = useState([])
    const [Following, SetFollowing] = useState([])
    const [Fetching, setFetching] = useState(false)
    const [Owner, setOwner] = useState([])
    const [Owner2, setOwner2] = useState([])
    const [Category, setCategory] = useState([])

    async function getAll() {
        try {
            setFetching(true)
            const res = await axios.get(`${url}/all`)
            if (res.data.ok === true && res.data.data) {
                setArray(res.data.data)
            }
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    async function getFollowing() {
        try {
            setFetching(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.get(`${url}/byFollowing`, { headers: { 'x-token': token } })
            if (res.data.ok === true && res.data.data) {
                SetFollowing(res.data.data)
            }
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    async function getByCategory(category = "") {
        try {
            setFetching(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.get(`${url}/category`, { params: { 'category': category }, headers: { 'x-token': token } })
            if (res.data.ok === true && res.data.data) {
                setCategory(res.data.data)
            }

            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }


    async function getOwner(id = "") {
        try {
            setFetching(true)
            const res = await axios.get(`${url}/byUser`, { params: { '_id': id } })
            if (res.data.ok === true && res.data.data) {
                setOwner(res.data.data)
            }
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    async function getOwner2(id = "") {
        try {
            setFetching(true)
            const res = await axios.get(`${url}/byUser`, { params: { '_id': id } })
            if (res.data.ok === true && res.data.data) {
                setOwner2(res.data.data)
            }
            setFetching(false)
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    async function create(body) {
        try {
            setFetching(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.post(`${url}/create`, body, { headers: { 'x-token': token } })
            console.log(res.data)
            if (res.data.ok === true && res.data.data) {
                setFetching(false)
                return res.data
            } else {
                setFetching(false)
                return null
            }
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    async function setPhoto(file, id) {
        try {
            setFetching(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.post(`${url2}/image?podID=${id}`, file, { headers: { 'x-token': token } })
            if (res.data.ok === true && res.data.data) {
                setFetching(false)
                return res.data
            } else {
                setFetching(false)
                return null
            }
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    async function setAudio(file, id) {
        try {
            setFetching(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.post(`${url2}/audio?podID=${id}`, file, { headers: { 'x-token': token } })
            console.log(res.data)
            if (res.data.ok === true) {
                setFetching(false)
                return res.data
            } else {
                setFetching(false)
                return null
            }
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    async function deletePodcast(id) {
        try {
            setFetching(true)
            const token = await AsyncStorage.getItem('x-token') || ''
            const res = await axios.delete(`${url}/delete?_id=${id}`, { headers: { 'x-token': token } })
            console.log(res.data)
            if (res.data.ok === true) {
                setFetching(false)
                return res.data
            } else {
                setFetching(false)
                return null
            }
        } catch (error) {
            console.log(error)
            setFetching(false)
        }
    }

    const value = {
        getAll,
        array,
        getFollowing,
        Fetching,
        getOwner,
        Owner,
        Following,
        getByCategory,
        Category,
        create,
        setPhoto,
        setAudio,
        deletePodcast,
        getOwner2,
        Owner2
    }

    return <PodcastContext.Provider value={value} {...props} />

}

export function usePodcast() {
    const context = React.useContext(PodcastContext)
    if (!context) {
        throw new Error('usePodcast is out from provider')
    }
    return context;
}