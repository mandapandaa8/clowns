import { sendRequests } from "./dataAccess.js"

export const reservationForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="reservationParent">Parent Name</label>
            <input type="text" name="reservationParent" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationChild">Child Name</label>
            <input type="text" name="reservationChild" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationAttendees">How many kids?</label>
            <input type="number" name="reservationAttendees" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationAddress">Address</label>
            <input type="text" name="reservationAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationDate">Date needed</label>
            <input type="date" name="reservationDate" class="input" />
        </div>
        <div class="field">
        <label class="label" for="reservationHours">How many hours?</label>
        <input type="number" name="reservationHours" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Reservation Request</button>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userParent = document.querySelector("input[name='reservationParent']").value
        const userChild = document.querySelector("input[name='reservationChild']").value
        const userAttendees = document.querySelector("input[name='reservationAttendees']").value
        const userAddress = document.querySelector("input[name='reservationAddress']").value
        const userDate = document.querySelector("input[name='reservationDate']").value
        const userHours = document.querySelector("input[name='reservationHours']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parent: userParent,
            child: userChild,
            childAttendees: userAttendees,
            address: userAddress,
            date: userDate,
            hours: userHours
        }

        // Send the data to the API for permanent storage
        sendRequests(dataToSendToAPI)
    }
})