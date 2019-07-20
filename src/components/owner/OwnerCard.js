import React, { Component } from "react"
import { Link } from "react-router-dom"
import ownerimage from "./ownerimage.jpg"
import "./Owner.css"

export default class OwnerCard extends Component {
    render() {
        return (
            <div key={this.props.owner.id} className="card">
                <div className="card-body">
                    <div className="card-title">
                        <img src={ownerimage} className="icon--owner" alt="owner-icon" />
                        <h5>{this.props.owner.name}</h5>
                        <Link className="nav-link" to={`/owners/${this.props.owner.id}`}>Details</Link>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/owners/${this.props.owner.id}/edit`);}}>
                                     Edit
                        </button>
                        <button
                            onClick={() => this.props.dischargeOwner(this.props.owner.id)}
                            className="card-link">Discharge</button>
                    </div>
                </div>
            </div>
        )
    }
}