import React, { Component } from 'react'
import "./Location.css"
import locationimage from "./locationimage.jpg"
import EmployeeCard from "../employee/EmployeeCard"

export default class LocationList extends Component {
    render() {
        return (
            <section className="locations">
            {
                this.props.locations.map(location =>
                    <div key={location.id} className="card card--location">
                        <div className="card-body">
                            <div className="card-title">
                                <img src={locationimage} className="icon--location" alt="location=-icon" />
                                <h5>{location.name}</h5>
                                <h5>{location.address}</h5>
                            {/* <a href="#"
                                onClick={() => this.props.deleteEmployee(employee.id)}
                                className="card-link">Delete</a> */}
                            </div>

                            <h6 className="card-subtitle mb-2 text-muted">Work Location For</h6>
                            <div className="employees--location">
                            {
                                this.props.employees
                                    .filter(empl => empl.locationId === location.id)
                                    .map(empl => <EmployeeCard key={empl.id} employee={empl} {...this.props} />)
                            }
                            </div>

                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}