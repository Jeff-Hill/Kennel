import { Route } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalManager from "../modules/AnimalManager"
import LocationManager from "../modules/LocationManager"
import EmployeeManager from "../modules/EmployeeManager"
import OwnerManager from "../modules/OwnerManager"

import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from "./animal/AnimalForm"

class ApplicationViews extends Component {

    state = {
        owners: [],
        employees: [],
        locations: [],
        animals: []
    }

    componentDidMount() {
        const newState = {}

        AnimalManager.getAll()
            .then(animals => newState.animals = animals)
        EmployeeManager.getAll()
            .then(employees => newState.employees = employees)
        LocationManager.getAll()
            .then(locations => newState.locations = locations)
        OwnerManager.getAll()
            .then(owners => newState.owners = owners)
            .then(() => this.setState(newState))
    }

    // deleteAnimal = id => {
    //     return fetch(`http://localhost:5002/animals/${id}`, {
    //         method: "DELETE"
    //     })

    //     .then(AnimalManager.getAll)
    //     .then(animals => {
    //         this.props.history.push("/animals")
    //         this.setState({ animals: animals })
    //     })
    //     }

    deleteAnimal = (id) => {
            return AnimalManager.removeAndList(id)
            .then(AnimalManager.getAll)
            .then(animals => { this.props.history.push("/animals")
                this.setState({ animals: animals})
            })
          }

    addAnimal = (animal) =>
        AnimalManager.post(animal)
            .then(() => AnimalManager.getAll())
            .then(animals =>
                this.setState({
                    animals: animals
      })
    );

    terminateEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
           method: "DELETE"
        })
        .then(employeeData => employeeData.json())
        .then(() => fetch(`http://localhost:5002/employees`))
        .then(employeeArr => employeeArr.json())
        .then(employees => this.setState({
            employees: employees
        })
        )
    }

    removeOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(ownerData => ownerData.json())
        .then(() => fetch(`http://localhost:5002/owners`))
        .then(ownerArr => ownerArr.json())
        .then(owners => this.setState({
            owners: owners
        })
        )
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    // Find the animal with the id of the route parameter
                    let animal = this.state.animals.find(animal =>
                         animal.id === parseInt(props.match.params.animalId)
                    )
                    // If the animal wasn't found, create a default one
                    if (!animal) {
                        animal = {id:404, name:"404", breed: "Dog not found"}
                    }
                    return <AnimalDetail animal={ animal }
                        dischargeAnimal={ this.deleteAnimal } />
                }} />

                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm
                    {...props}
                    addAnimal={this.addAnimal}
                    // Our shiny new route. We pass employees to the AnimalForm so a dropdown can be populated
                       employees={this.state.employees} />
                    }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList terminateEmployee={this.terminateEmployee} employees={this.state.employees} />
                }} />
                <Route path="/owners" render={(props) => {
                    return <OwnerList removeOwner={this.removeOwner} owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
