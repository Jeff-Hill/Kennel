import React, { Component } from "react";
import "./Owner.css";

export default class OwnerForm extends Component {
  // Set initial state
  state = {
    ownerName: "",
    phoneNumber: "",
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
  constructNewOwner = evt => {
    evt.preventDefault();
    // if (this.state.employee === "") {
    //   window.alert("Please select a caretaker");
    // } else {
      const owner = {
        name: this.state.ownerName,
        phoneNumber: this.state.phoneNumber,
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        // employeeId: parseInt(this.state.employeeId)
      };

      // Create the animal and redirect user to animal list
      this.props
        .addOwner(owner)
        .then(() => this.props.history.push("/owners"));
    }

    render() {
        return (
            <React.Fragment>
        <form className="ownerForm">
          <div className="form-group">
            <label htmlFor="ownerName">Owner Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="ownerName"
              placeholder="Owner Name"
              />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="phoneNumber"
              placeholder="phone number"
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
            onClick={this.constructNewOwner}
            className="btn btn-primary"
            >
            Admit New Owner
          </button>
        </form>
      </React.Fragment>
    );
}
}
