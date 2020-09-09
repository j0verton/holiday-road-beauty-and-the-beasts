import { useParks } from './ParkProvider.js'
const parkTarget = document.querySelector(".park")


//initial render of parks dropdown
export const ParkSelect = () => {
            const parkList = useParks()
            render(parkList)  
        }

//inner HTML of dropdown
const render = (parkCollection) => {
    parkTarget.innerHTML = `
        <select class="dropdown" id="parkSelect">
            <option value="0">Choose a Park!</option>
            ${
                parkCollection.map(parkObj => {
                    return `<option value="${parkObj.id}">${parkObj.name}</option>`
                })

            }
        </select>
    `
}

const eventHub = document.querySelector("main")

eventHub.addEventListener("change", event => {
    if (event.target.id === "parkSelect"){
        const parkId = event.target.value

        const parkChosenEvent = new CustomEvent("parkChosen", {
            detail: {
                parkIdChosen: parkId
            }
        })
        eventHub.dispatchEvent(parkChosenEvent)
    }
})

