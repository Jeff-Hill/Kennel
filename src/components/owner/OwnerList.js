import React, { Component } from 'react'

export default class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
                {
                    this.props.owners.map(owner =>
                        <div key={owner.id}>
                            Owner: {owner.name}<br></br>
                             Phone Number: {owner.phoneNumber}
                        </div>
                        )
                }
            </section>
        )
    }

}