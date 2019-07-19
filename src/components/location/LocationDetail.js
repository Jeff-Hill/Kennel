import React, { Component } from "react"
import "./Location.css"
import locationimage from "./locationimage.jpg"


export default class Location extends Component {
    state = {
        saveDisabled: false
    }

    render() {
        return (
            <section className="location">
                <div key={ this.props.location.id } className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={ locationimage } className="icon--location" alt="location-icon"/>
                            { this.props.location.name }
                        </h4>
                        <h6 className="card-title">{ this.props.location.address }</h6>
                        <button onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.deleteLocation(this.props.location.id)
                                    )
                                }
                            }
                            disabled={ this.state.saveDisabled }
                            className="card-link">Close Location</button>
                    </div>
                </div>
            </section>
        )
    }
}