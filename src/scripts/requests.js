import { getRequests, getClowns, sendCompletions, getCompletions } from "./dataAccess.js";

const findCompletion = (request) => {
    const completions = getCompletions()
    let foundCompletion = completions.find(completion => {
        return parseInt(completion.requestId) === parseInt(request.id)
    })
    return foundCompletion
}

const reservationRequestList = (request) => {
    const clowns = getClowns()
    const foundCompletion = findCompletion(request)

    if (foundCompletion) {
        return `${clowns.map(
            clown => {
                return `<li class="completedRequest">Reservation Request for ${request.parent} was completed by ${clown.name} on ${foundCompletion.dateCreated}
                    </li>`
            }).join("")
            }`
    }
    else {
        return `<li class="incompleteRequest">Reservation Request from ${request.parent}
        <select class="clowns" id="clowns">
        <option value="">Choose</option>
            ${clowns.map(
            clown => {
                return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
            }
        </select>
            <button class="request__denied"
                id="request--${request.id}">
                Deny
            </button>
    </li>`
    }
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
    <ul>
        ${requests.map(reservationRequestList).join("")
        }
    </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "clowns") {
            const [requestId, clownId] = changeEvent.target.value.split("--")

            const completion = { requestId: requestId, clownId: clownId, dateCreated: new Date(Date.now()).toDateString() }

            sendCompletions(completion)
        }
    }
)