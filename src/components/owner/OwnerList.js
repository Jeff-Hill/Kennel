import React, { Component } from "react"
import "./Owner.css"
import OwnerCard from "./OwnerCard"

export default class OwnerList extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="ownerButton">
                    <button type="button"
                            onClick={()=> this.props.history.push("/owners/new")}
                            className="btn btn-success">
                        Enroll Owner
                    </button>
                </div>
                <section className="animals">
                {
                    this.props.owners.map(owner =>
                        <OwnerCard key={owner.id} owner={owner} {...this.props} />
                    )
                }
                </section>
            </React.Fragment>
        )
    }
}