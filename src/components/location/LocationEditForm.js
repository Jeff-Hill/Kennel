import React, { Component } from "react"
import LocationManager from "../../modules/LocationManager"

export default class LocationEditForm extends Component {
    // Set initial state
    state = {
      locationName: "",
      address: "",
    //   employeeId: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingLocation = evt => {
      evt.preventDefault()

    //   if (!this.state.employeeId) {
    //     window.alert("Please select a caretaker");
    //   } else {
        const editedLocation = {
          id: this.props.match.params.locationId,
          name: this.state.locationName,
          address: this.state.address,
        //   employeeId: parseInt(this.state.employeeId)
        };

    this.props.updateLocation(editedLocation)
    .then(() => this.props.history.push("/"))
    // }
  }

    componentDidMount() {
      LocationManager.get("locations",this.props.match.params.locationId)
      .then(location => {
        this.setState({
          locationName: location.name,
          address: location.address,
        //   employeeId: animal.employeeId
        });
      });
    }


    render() {
      return (
        <React.Fragment>
          <form className="locationForm">
            <div className="form-group">
              <label htmlFor="locationName">Location Name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="locationName"
                value = {this.state.locationName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="address"
                value = {this.state.address}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="employee">Assign to caretaker</label>
              <select
                name="employee"
                id="employeeId"
                onChange={this.handleFieldChange}
                value = {this.state.employeeId}
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
              onClick={this.updateExistingLocation}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}