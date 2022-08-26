import { mainContainer } from "./main.js"

//& where to store the new user applications and completions, always in an empty array

const applicationState = {
    requests: [],
    completions: []
}

//& the external data to access

const API = "http://localhost:8088"

//& create a fetch function that calls the data from the external API
    //& fetchRequests, fetchClowns, fetchCompletions
    //& and a delete request that will delete any unwanted data
//& requests and completions will need corresponding send functions
    //& this will update external API with new data

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (reservationRequests) => {
                //* Store the external state in application state
                applicationState.requests = reservationRequests
            }
        )
}

export const sendRequests = (userReservationRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userReservationRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (data) => {
            applicationState.completions = data
        }
    )
}

export const sendCompletions = (userCompletionObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCompletionObject)
    }

    return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const getCompletions = () => {
    return applicationState.completions.map(complete => ({...complete}))
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}