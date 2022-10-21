import { getWalkers } from "./database.js"
import {getWalkerCities} from "./database.js"
import { getCities } from "./database.js"


const walkers = getWalkers()
const walkerCities = getWalkerCities()
const citiesList = getCities()
// console.log(citiesList)
// console.log(walkerCities)

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML
}


// The function need the walker information, so define a parameter
const filterWalkerCitiesByWalker = (walker) => {
    // Define an empty array to store all of the assignment objects
    const assignments = []
    // Iterate the array value of walkerCities
    for (const assignment of walkerCities){
        if (assignment.walkerId === walker.id){
            assignments.push(assignment)
        }
        
    }
    // Check if the primary key of the walker equals the foreign key on the assignment

    // If it does, add the current object to the array of assignments
    return assignments
    // After the loop is done, return the assignments array
}

console.log(filterWalkerCitiesByWalker(walkers[0]))

// const assignedCityNames = (assignments) => {
//     // Define an empty string that will get appended with matching cities
//     let cityNames = ""
//     // Iterate the array of assignment objects
//     for (const assignment of assignments){
//         for (const city of cities){
//             if(city.id === assignment.cityId){
//                 cityNames = `${cityNames} and ${city.name}`
//             } else {
//                 cityNames
//             }
//         }
//     }    
//         return cityNames
// }

const assignedCityNames = (assignments) => {
    let cityNames = ""
    let cityListWalker = []
    for (const assignment of assignments) {
        for (const city of citiesList) {
            if (city.id === assignment.cityId) {
                cityListWalker.push(city)
            }
                if (cityListWalker.length === 2)
                    cityNames = `${cityListWalker[0].name} and ${cityListWalker[1].name}.`
                else if (cityListWalker.length === 1) {
                    cityNames = `${cityListWalker[0].name}.`
                }
            
        }
    }
    return cityNames
}

// create function that builds a string of city names
// const assignedCityNames = (assignments) => {
//     // define an empty string
//     let cityNames = “”
//     // iterate the array of filteredCities objects
//     for (const assignment of assignments) {
//         for (const city of cities) {
//             // for each filteredCities, iterate the cities to find match
//             if (city.id === assignment.cityId) {
//                 // push matching city to cityNamesString
//                 cityNames = `${cityNames} and ${city.name}`
//             }
//         }
//         // return the string
//         return cityNames
//     }
// }




    // For each assignment, iterate the cities array to find the match

    // Add the name of the matching city to the array of city names

    // After the loop is done, return the string


document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const assignments = filterWalkerCitiesByWalker(walker)
                    const cities = assignedCityNames(assignments)
                    console.log(cities)
                    window.alert(`${walker.name} services ${cities}`)
                }
            }
        }
    }
)

