import React, { Component } from 'react'
import owner from "./owner.jpg"
import "./Owner.css"


export default class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
                {
                    this.props.owners.map(owner =>
                        <div key={owner.id} className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <img src={owner} className="icon--owner" />
                                        <h5>{owner.name}</h5>
                                        <h6>{owner.phoneNumber}</h6>
                                        <button onClick={() => this.props.removeOwner(owner.id)}
                                        className="card-link">Remove</button>
                                </div>
                            </div>
                         </div>
                        )
                }
            </section>
        )
    }

}