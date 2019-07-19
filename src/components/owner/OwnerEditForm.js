import React, { Component } from "react"
import OwnerManager from "../../modules/OwnerManager"

export default class OwnerEditForm extends Component {
    // Set initial state
    state = {
      ownerName: "",
      phoneNumber: "",
    //   employeeId: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingOwner = evt => {
      evt.preventDefault()

    //   if (!this.state.employeeId) {
    //     window.alert("Please select a caretaker");
    //   } else {
        const editedOwner = {
          id: this.props.match.params.ownerId,
          name: this.state.ownerName,
          phoneNumber: this.state.phoneNumber,
        //   employeeId: parseInt(this.state.employeeId)
        };

    this.props.updateOwner(editedOwner)
    .then(() => this.props.history.push("/owners"))
    // }
  }

    componentDidMount() {
      OwnerManager.get("owners",this.props.match.params.ownerId)
      .then(owner => {
        this.setState({
          ownerName: owner.name,
          phoneNumber: owner.phoneNumber,
        //   employeeId: animal.employeeId
        });
      });
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
                value = {this.state.ownerName}
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
                value = {this.state.phoneNumber}
              />
            </div>
            <div className="form-group">
              <label htmlFor="animal">Assign Animal</label>
              <select
                name="animal"
                id="animalId"
                onChange={this.handleFieldChange}
                value = {this.state.animalId}
              >
                <option value="">Select an Animal</option>
                {this.props.animals.map(e => (
                  <option key={e.id} id={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              onClick={this.updateExistingOwner}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}