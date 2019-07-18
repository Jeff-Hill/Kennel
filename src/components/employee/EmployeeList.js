import React, { Component } from 'react'
// import { Link } from "react-router-dom";
// import employeeimage from "./employeeimage.jpg"
import "./Employee.css"
// import AnimalCard from "../animal/AnimalCard"
import EmployeeCard from "./EmployeeCard"

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
                        <EmployeeCard key={employee.id} employee={employee} {...this.props} />
                    )
                }
            </section>
            </React.Fragment>
            )
        }
    }