import React, { Component } from 'react'
import { Link } from "react-router-dom";
import employeeimage from "./employeeimage.jpg"
import "./Employee.css"



    export default class EmployeeList extends Component {
        render() {
            return (
                <section className="employees">
                {
                    this.props.employees.map(employee =>
                        <div key={employee.id} className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <img src={employeeimage} className="icon--employee" alt="employee-icon" />
                                    <h5>{employee.name}</h5>
                                    <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                                    <button onClick={() => this.props.terminateEmployee(employee.id)}
                                        className="card-link">Terminate</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                </section>
            )
        }
    }