import React, { Component } from 'react'
import { Link } from "react-router-dom";
import employeeimage from "./employeeimage.jpg"
import "./Employee.css"
import AnimalCard from "../animal/AnimalCard"


    export default class EmployeeList extends Component {
        render() {
            return (
                <React.Fragment>
                <div className="employeeButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/employees/new")}
                            }>
                        Hire Employee
                    </button>
                </div>
                <section className="employees">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card card--employee">
                        <div className="card-body">
                            <div className="card-title">
                                <img src={employeeimage} className="icon--employee" alt="employee-icon" />
                                <h5>{employee.name}</h5>
                                <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                                    <button onClick={() => this.props.deleteEmployee(employee.id)}
                                        className="card-link">Terminate</button>
                            </div>

                            <h6 className="card-subtitle mb-2 text-muted">Caretaker For</h6>
                            <div className="animals--caretaker">
                            {
                                this.props.animals
                                    .filter(anml => anml.employeeId === employee.id)
                                    .map(anml => <AnimalCard deleteAnimal={this.props.deleteAnimal} key={anml.id} animal={anml} {...this.props} />)
                            }
                            </div>

                        </div>
                    </div>
                )
            }
            </section>
            </React.Fragment>
            )
        }
    }