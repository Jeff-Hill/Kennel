import { Route, Redirect } from 'react-router-dom'
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
import Login from './authentication/Login'

import AnimalDetail from './animal/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import OwnerDetail from './owner/OwnerDetail'
import AnimalForm from "./animal/AnimalForm"
import EmployeeForm from "./employee/EmployeeForm"
import OwnerForm from "./owner/OwnerForm"

class ApplicationViews extends Component {

    state = {
        owners: [],
        employees: [],
        locations: [],
        animals: []
    }

    componentDidMount() {
        const newState = {}

        AnimalManager.getAll("animals")
            .then(animals => newState.animals = animals)
        EmployeeManager.getAll("employees")
            .then(employees => newState.employees = employees)
        LocationManager.getAll("locations")
            .then(locations => newState.locations = locations)
        OwnerManager.getAll("owners")
            .then(owners => newState.owners = owners)
            .then(() => this.setState(newState))
    }

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

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
            return AnimalManager.removeAndList("animals", id)
            // .then(AnimalManager.getAll)
            .then(animals => { this.props.history.push("/animals")
                this.setState({ animals: animals })
            })
          }

    terminateEmployee = (id) => {
              return EmployeeManager.removeAndList("employees", id)
              .then(employees => { this.props.history.push("/employees")
                  this.setState({ employees: employees })
              })
            }

    removeOwner = (id) => {
              return OwnerManager.removeAndList("owners", id)
              .then(owners => { this.props.history.push("/owners")
                  this.setState({ owners: owners })
              })
            }

    addAnimal = (animal) => {
        return AnimalManager.post("animals", animal)
            .then(() => AnimalManager.getAll("animals"))
            .then(animals =>
                this.setState({
                    animals: animals
            })
        );
    }

    addEmployee = (employee) => {
        return EmployeeManager.post("employees", employee)
            .then( () => EmployeeManager.getAll("employees"))
            .then(employees => this.setState({ employees: employees})
        )
    }

    addOwner = (owner) => {
        return OwnerManager.post("owners", owner)
            .then( () => OwnerManager.getAll("owners"))
            .then(owners => this.setState({ owners: owners}))
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
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props} deleteEmployee={this.deleteEmployee}
                             employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                        }
                    }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                // Find the employee with the id of the route parameter
                    let employee = this.state.employees.find(employee =>
                        employee.id === parseInt(props.match.params.employeeId)
                        )
                // If the animal wasn't found, create a default one
                    if (!employee) {
                        employee = {id:404, name:"404", person: "Person not found"}
                    }

                    return <EmployeeDetail employee={ employee }
                    dischargeEmployee={ this.terminateEmployee } />
                }} />

                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                       addEmployee={this.addEmployee}
                       animals={this.state.animals} />
                }} />

                <Route exact path="/owners" render={(props) => {
                    return <OwnerList {...props} removeOwner={this.removeOwner} owners={this.state.owners} />
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                // Find the animal with the id of the route parameter
                    let owner = this.state.owners.find(owner =>
                     owner.id === parseInt(props.match.params.ownerId)
                     )
                // If the animal wasn't found, create a default one
                    if (!owner) {
                        owner = {id:404, name:"404", person: "Person not found"}
                    }

                return <OwnerDetail owner={ owner }
                    dischargeOwner={ this.removeOwner } />
                }} />

                <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                       addOwner={this.addOwner}
                       animals={this.state.animals} />
                }} />

                <Route path="/login" component={Login} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
