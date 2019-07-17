import React, { Component } from 'react'
import { Link } from "react-router-dom";
import ownerimage from "./ownerimage.jpg"
import "./Owner.css"


export default class OwnerList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="ownerButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/owners/new")}
                            }>
                        Admit Owner
                    </button>
                </div>
            <section className="owners">
                {
                    this.props.owners.map(owner =>
                        <div key={owner.id} className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <img src={ownerimage} className="icon--owner" alt="owner-icon" />
                                        <h5>{owner.name}</h5>
                                        <h6>{owner.phoneNumber}</h6>
                                        <Link className="nav-link" to={`/owners/${owner.id}`}>Details</Link>
                                        <button onClick={() => this.props.removeOwner(owner.id)}
                                        className="card-link">Remove</button>
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