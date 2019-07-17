import React, { Component } from "react"
import "./Owner.css"
import ownerimage from "./ownerimage.jpg"


export default class Owner extends Component {
    state = {
        saveDisabled: false
    }

    render() {
        return (
            <section className="owner">
                <div key={ this.props.owner.id } className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={ ownerimage } className="icon--owner" alt="owner-icon" />
                            { this.props.owner.name }
                        </h4>
                        <h6 className="card-title">{ this.props.owner.person }</h6>
                        <button onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.dischargeOwner(this.props.owner.id)
                                    )
                                }
                            }
                            disabled={ this.state.saveDisabled }
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}