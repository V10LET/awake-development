import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import history from '../../history'

import { setTimedLog } from '../../actions/logAction'
import Button from '@material-ui/core/Button'

class SaveTime extends Component {

    handleSave = async () => {
        const { hr, min } = this.props
        let num = (Number(min) * 60 * 1000) + (Number(hr) * 3600 * 1000)
        const time = String(num)

        let r = await fetch('http://localhost:3000/api/v1/timed_logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`
            },
            body: JSON.stringify({
                timed_log: { time: time }
            })
        })

        let data = await r.json()
        this.props.setTimedLog(data.timed_log)
        history.push('/logs')
    }

    render () {
        return (
            <Fragment>
                <h1>NICE JOB FINSIHING YOUR MEDITATION</h1>
                <Button onClick={this.handleSave}>Save</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token
})
const mapDispatchToProps = { setTimedLog }

export default connect(mapStateToProps, mapDispatchToProps)(SaveTime)
