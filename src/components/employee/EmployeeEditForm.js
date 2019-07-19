import React, { Component } from "react"
import EmployeeManager from "../../modules/EmployeeManager"

export default class EmployeeEditForm extends Component {
    // Set initial state
    state = {
      employeeName: "",
      position: "",
      locationId: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingEmployee = evt => {
      evt.preventDefault()

      if (!this.state.locationId) {
        window.alert("Please select a place of work");
      } else {
        const editedEmployee = {
          id: this.props.match.params.employeeId,
          name: this.state.employeeName,
          position: this.state.position,
          locationId: parseInt(this.state.locationId)
        };

    this.props.updateEmployee(editedEmployee)
    .then(() => this.props.history.push("/employees"))
    }
  }

    componentDidMount() {
      EmployeeManager.get("employees",this.props.match.params.employeeId)
      .then(employee => {
        this.setState({
          employeeName: employee.name,
          position: employee.position,
          locationId: employee.locationId
        });
      });
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
                value = {this.state.employeeName}
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
                value = {this.state.position}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Assign to Location</label>
              <select
                name="location"
                id="locationId"
                onChange={this.handleFieldChange}
                value = {this.state.locationId}
              >
                <option value="">Select an Location</option>
                {this.props.locations.map(e => (
                  <option key={e.id} id={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              onClick={this.updateExistingEmployee}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}