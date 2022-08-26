//& will need to fetch all of the data from the API
    //& will need to access the requests, clowns and completions
        //& these will need a corresponding send request, to send new data into API
        //& and also a getter function that will pull from the API with the capability
            //& to use within the modules
    //& will also need a delete as per the instructions

//& must have a skeletal framework in index.html that 
    //& links styles, js and also has id=container

//& in this module, main.js, create a render function that invokes all fetch functions
    //& clowns, requests, and completions

    //* Build the HTML that contains input fields for all of the information that needs to be collected 
    //* for a person to reserve a clown for a birthday party. Keep referring back to your ERD to make 
    //* sure you have an input field for each property.
    //& this should be in the clowns.js

    //* Next, create a function in the data access module that will POST a reservation state object to 
    //* your API to be saved in permanent storage.

    //* Then create the event listener that collects the user input, constructs a state object for 
    //* the reservation, and then pass it to your function that you defined above as an argument. 
    //* Verify that it works by looking in your database.json file as see if a new object is in your 
    //* reservations resource collection.



import { fetchRequests, deleteRequest, fetchClowns, fetchCompletions } from "./dataAccess.js"
import { clowns } from "./clowns.js"

export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
    .then(() => fetchClowns())
    .then(() => fetchCompletions())
    .then(
        () => {
            mainContainer.innerHTML = clowns()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})