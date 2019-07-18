import React, { Component } from "react";
import "./Employee.css";

export default class EmployeeForm extends Component {
  // Set initial state
  state = {
    employeeName: "",
    position: "",
    // animalId: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewEmployee = evt => {
    evt.preventDefault();
    // if (this.state.animal === "") {
    //   window.alert("Please select an animal");
    // } else {
      const employee = {
        name: this.state.employeeName,
        position: this.state.position,
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        // animalId: parseInt(this.state.animalId)
      };

      // Create the animal and redirect user to animal list
      this.props
        .addEmployee(employee)
        .then(() => this.props.history.push("/employees"));
    }


  render() {
    return (
      <React.Fragment>
        <form className="employeeForm">
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="employeeName"
              placeholder="Employee Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="position"
              placeholder="Position"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="employee">Assign to caretaker</label>
            <select
              defaultValue=""
              name="employee"
              id="employeeId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select an employee</option>
              {this.props.employees.map(e => (
                <option key={e.id} id={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div> */}
          <button
            type="submit"
            onClick={this.constructNewEmployee}
            className="btn btn-primary"
          >
            Hire Employee
          </button>
        </form>
      </React.Fragment>
    );
  }
}
