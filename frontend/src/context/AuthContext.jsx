import apiCall from '../utils/api-call.js'

import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = async (data) => {
        const resp = await apiCall({
            endpoint: '/olympics/login',
            method: 'POST',
            body: data
        })

        console.log(resp.data);
        

        if(!resp.error){
            setUser(resp.data?.body)
            localStorage.setItem('user', JSON.stringify(resp.data.body))
        }
        return resp
    }

    const logout = async () => {
        const resp = await apiCall({
            endpoint: '/olympics/logout',
            method: 'PUT',
            body: {username: user.username},
            secured: true
        })

        if(!resp.error){
            setUser(null)
            localStorage.removeItem('user')
        }
        return resp
    }

    useEffect(() => {        
        const existingUser = localStorage.getItem('user')
        if(existingUser){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    const value = {
        user,
        login,
        logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}