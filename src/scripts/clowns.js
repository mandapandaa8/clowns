import { Requests } from "./requests.js"
import { reservationForm } from "./reservationForm.js"

//& the alternate html file where I'll invoke all of the html functions

export const clowns = () => {
    return `
    <h1>Reserve a Clown for Your Party</h1>
    <section class="serviceForm">
        ${reservationForm()}
    </section>

    <section class="serviceRequests">
        <h2>Service Requests</h2>
        ${Requests()}
    </section>
    `
}