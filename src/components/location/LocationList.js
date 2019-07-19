import React, { Component } from "react"
import "./Location.css"
import LocationCard from "./LocationCard"

export default class LocationList extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="locationButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/locations/new")}
                            className="btn btn-success">
                        Add Location
                    </button>
                </div>
                <section className="locations">
                {
                    this.props.locations.map(location =>
                        <LocationCard key={location.id} location={location} {...this.props} />
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}