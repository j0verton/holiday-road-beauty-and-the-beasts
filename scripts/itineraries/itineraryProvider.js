
const eventHub = document.querySelector("main")

//variables to save the dropdown selections
let park 
let attraction
let eatery

// an event listener to tell us when all 3 options have been chosen, 
// if they have it generates a 'save itinerary' button
// button will disappear if you return a dropdown to zerp\o
eventHub.addEventListener ("change", event => {
    
    const selectedPark = document.querySelector("#parkSelect")
    const selectedEatery = document.querySelector("#eaterySelector")
    const selectedAttraction = document.querySelector("#attractionSelect")
    const saveBtnContainer = document.getElementById("saveBtnContainer")

    if (selectedPark.value !== "0" &&
     selectedEatery.value !== "0" && 
     selectedAttraction.value !== "0") {
         saveBtnContainer.innerHTML = `<button type="button" id="saveBtn">Save Itinerary</button>`
        } else {
            saveBtnContainer.innerHTML = ""
        }
    } )
    
// an event listener that catches when someone clicks the save button and calls the saveItineray function
    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "saveBtn") {
            saveItinerary()
        }
    })

//this is a function to post the itinerary to the json-server
export const saveItinerary = () => {
    const itinerary = {
        chosenPark: park,
        chosenAttraction: attraction,
        chosenEatery: eatery
    }
    return fetch('http://localhost:8088/itineraries', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itinerary)
        })
}
//a set of 3 event listeners which registers when a drop down option is chosen and saves the detail to a local variable
eventHub.addEventListener("attractionChosen", event => {
    if (event.detail.attractionId !== '0') {
        attraction = event.detail.attractionId
    }
})

eventHub.addEventListener("parkChosen", event => {
    if (event.detail.parkIdChosen !== '0') {
        park = event.detail.parkIdChosen
    }
})

eventHub.addEventListener('eateryChosenEvent', (event) => {
    if (event.detail.chosenEateryBusinessName !== '0') { 
        eatery = event.detail.chosenEateryBusinessName
    }
})
