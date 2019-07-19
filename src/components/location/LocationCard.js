import React, { Component } from "react"
import { Link } from "react-router-dom"
import locationimage from "./locationimage.jpg"
import "./Location.css"

export default class LocationCard extends Component {
    render() {
        return (
            <div key={this.props.location.id} className="card">
                <div className="card-body">
                    <div className="card-title">
                        <img src={locationimage} className="icon--location" alt="location-icon" />
                        <h5>{this.props.location.name}</h5>
                        <Link className="nav-link" to={`/locations/${this.props.location.id}`}>Details</Link>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/locations/${this.props.location.id}/edit`);}}>
                                     Edit
                        </button>
                        <button
                            onClick={() => this.props.deleteLocation(this.props.location.id)}
                            className="card-link">Close Location</button>
                    </div>
                </div>
            </div>
        )
    }
}