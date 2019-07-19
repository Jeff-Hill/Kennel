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
import LocationDetail from './location/LocationDetail'
import AnimalForm from "./animal/AnimalForm"
import EmployeeForm from "./employee/EmployeeForm"
import OwnerForm from "./owner/OwnerForm"
import LocationForm from "./location/LocationForm"
import AnimalEditForm from "./animal/AnimalEditForm"
import EmployeeEditForm from "./employee/EmployeeEditForm"
import OwnerEditForm from "./owner/OwnerEditForm"
import LocationEditForm from "./location/LocationEditForm"

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

    removeLocation = (id) => {
              return LocationManager.removeAndList("locations", id)
              .then(locations => { this.props.history.push("/locations")
                  this.setState({ locations: locations })
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

    addLocation = (location) => {
        return LocationManager.post("locations", location)
            .then( () => LocationManager.getAll("locations"))
            .then(locations => this.setState({ locations: locations}))
    }

    updateAnimal = (editedAnimalObject) => {
        return AnimalManager.put("animals", editedAnimalObject)
        .then(() => AnimalManager.getAll("animals"))
        .then(animals => { this.props.history.push("/animals")
          this.setState({
            animals: animals
          })
        });
      };

    updateEmployee = (editedEmployeeObject) => {
        return EmployeeManager.put("employees", editedEmployeeObject)
        .then(() => EmployeeManager.getAll("employees"))
        .then(employees => { this.props.history.push("/employees")
          this.setState({
            employees: employees
          })
        });
      };

    updateOwner = (editedOwnerObject) => {
        return OwnerManager.put("owners", editedOwnerObject)
        .then(() => OwnerManager.getAll("owners"))
        .then(owners => { this.props.history.push("/owners")
          this.setState({
            owners: owners
          })
        });
      };

    updateLocation = (editedLocationObject) => {
        return LocationManager.put("locations", editedLocationObject)
        .then(() => LocationManager.getAll("locations"))
        .then(locations => { this.props.history.push("/locations")
          this.setState({
            locations: locations
          })
        });
      };


    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <LocationList locations={this.state.locations} employees={this.state.employees}
                    animals={this.state.animals} updateAnimal={this.updateAnimal} deleteEmployee={this.terminateEmployee} />
                } else {
                    return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/locations/:locationId(\d+)" render={(props) => {
                    // Find the location with the id of the route parameter
                    let location = this.state.locations.find(location =>
                         location.id === parseInt(props.match.params.locationId)
                    )
                    // If the location wasn't found, create a default one
                    if (!location) {
                        location = {id:404, name:"404", address: "Location not found"}
                    }
                    return <LocationDetail location={ location }
                        deleteLocation={ this.deleteLocation } />
                }} />

                <Route exact path="/locations/:locationId(\d+)/edit" render={props => {
                    return <LocationEditForm {...props} locations={this.state.locations} updateLocation={this.updateLocation}/>
                }}/>

                <Route path="/locations/new" render={(props) => {
                    return <LocationForm
                    {...props}
                    locations={this.state.locations}
                    addLocation={this.addLocation}
                    employees={this.state.employees} />
                    }} />

                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <AnimalList {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals}
                    updateAnimal={this.updateAnimal} />
                } else {
                    return <Redirect to="/login" />
                    }
                }}/>

                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                    // Find the animal with the id of the route parameter
                    let animal = this.state.animals.find(animal =>
                         animal.id === parseInt(props.match.params.animalId)
                    )
                    // If the animal wasn't found, create a default one
                    if (!animal) {
                        animal = {id:404, name:"404", breed: "Dog not found"}
                    }
                    return <AnimalDetail animal={ animal }
                        deleteAnimal={ this.deleteAnimal } />
                }} />
                <Route path="/animals/:animalId(\d+)/edit" render={props => {
                    return <AnimalEditForm {...props} employees={this.state.employees} updateAnimal={this.updateAnimal}/>
                }}/>

                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm
                    {...props}
                    addAnimal={this.addAnimal}
                    // Our shiny new route. We pass employees to the AnimalForm so a dropdown can be populated
                       employees={this.state.employees} />
                    }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props} deleteEmployee={this.terminateEmployee}
                             employees={this.state.employees} animals={this.state.animals} deleteAnimal={this.deleteAnimal}
                             updateAnimal={this.updateAnimal} locations={this.state.locations}/>
                    } else {
                        return <Redirect to="/login" />
                        }
                    }} />
                <Route exact path="/employees/:employeeId(\d+)" render={(props) => {
                // Find the employee with the id of the route parameter
                    let employee = this.state.employees.find(employee =>
                        employee.id === parseInt(props.match.params.employeeId)
                        )
                // If the animal wasn't found, create a default one
                    if (!employee) {
                        employee = {id:404, name:"404", person: "Person not found"}
                    }

                    return <EmployeeDetail employee={ employee } employees={this.state.employees}
                    deleteEmployee={ this.terminateEmployee } locations={this.state.locations} />
                }} />

                <Route path="/employees/:employeeId(\d+)/edit" render={props => {
                    return <EmployeeEditForm {...props} locations={this.state.locations} employees={this.state.employee} animals={this.state.animals} updateEmployee={this.updateEmployee}/>
                }}/>

                <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                       addEmployee={this.addEmployee}
                       animals={this.state.animals}
                       locations={this.state.locations} />
                }} />

                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <OwnerList {...props} removeOwner={this.removeOwner} owners={this.state.owners} />
                } else {
                    return <Redirect to="/login" />
                    }
                }} />

                <Route exact path="/owners/:ownerId(\d+)" render={(props) => {
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

                <Route path="/owners/:ownerId(\d+)/edit" render={props => {
                    return <OwnerEditForm {...props} locations={this.state.locations} animals={this.state.animals} updateOwner={this.updateOwner}/>
                }}/>

                <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                       addOwner={this.addOwner}
                       animals={this.state.animals}
                       locations={this.state.locations} />
                }} />

                <Route path="/login" component={Login} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
