import apiCall from '../utils/api-call.js'

import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [events, setEvents] = useState([])
    const [eventToEdit, setEventToEdit] = useState()
    const createEvent = async (data) => {
        const resp = await apiCall({
            endpoint: '/olympics/events/create',
            method: 'POST',
            body: data,
            secured: true
        })

        return resp
    }

    // to add a participant
    const addParticipant = async (data) => {
        const resp = await apiCall({
            endpoint: '/olympics/participants/create',
            method: 'POST',
            body: data,
            secured: true
        })

        return resp
    }

    // to get the list of events from backend
    const getEvents = async () => {
        const resp = await apiCall({
            endpoint: '/olympics/events/list',
            method: 'GET',
            secured: true
        })        

        setEvents(resp.data.body)
        return resp
    }

    // to edit an event
    const editEvent = async (data) => {          
        const resp = await apiCall({
            endpoint: `/olympics/events/edit/${data.id}`,
            method: 'PUT',
            body: data,
            secured: true
        })

        return resp
    }

    // to get the list of participants from backend based on an event
    const getParticipants = async (data) => {
        const resp = await apiCall({
            endpoint: `/olympics/participants/list/${data.eventId}`,
            method: 'GET',
            secured: true
        })

        return resp
    }

    // to delete a participant from database
    const deleteParticipant = async (data) => {
        const resp = await apiCall({
            endpoint: `/olympics/participants/delete/${data.id}`,
            method: 'DELETE',
            secured: true
        })

        return resp
    }

    // fetch events on load
    useEffect(() => {
        getEvents()
    }, [])

    const value = {
        createEvent,
        events,
        getEvents,
        eventToEdit,
        setEventToEdit,
        editEvent,
        getParticipants,
        addParticipant,
        deleteParticipant
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}