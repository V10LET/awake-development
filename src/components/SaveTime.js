import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'

class SaveTime extends Component {
    render () {
        return (
            <Fragment>
                <h1>NICE JOB FINSIHING YOUR MEDITATION</h1>
                <Button onClick={this.handleClick}>Save</Button>
            </Fragment>
        )
    }
}

export default SaveTime
