import React from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { updateLog } from '../actions/logAction'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => createStyles({

})

class LogEditForm extends React.Component {



    state = {
        mentalRating: this.props.log.mentalRating,
        mentalNote: this.props.log.mentalNote,
        emotionalRating: this.props.log.emotionalRating,
        emotionalNote: this.props.log.emotionalNote,
        physicalRating: this.props.log.physicalRating,
        physicalNote: this.props.log.physicalNote,
        spiritualRating: this.props.log.spiritualRating,
        spiritualNote: this.props.log.spiritualNote,
        submitError: this.props.log.physicalRating
    }

    handleChange = (name) => (event) => {
        const value = event.target.value
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const { mentalRating, mentalNote, emotionalRating, emotionalNote, physicalRating, physicalNote, spiritualRating, spiritualNote } = this.state

        let r = await fetch(`http://localhost:3000/api/v1/logs/${this.props.log.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.token}`
            },
            body: JSON.stringify({
                log: {
                    mental_rating: mentalRating,
                    mental_note: mentalNote,
                    emotional_rating: emotionalRating,
                    emotional_note: emotionalNote,
                    physical_rating: physicalRating,
                    physical_note: physicalNote,
                    spiritual_rating: spiritualRating,
                    spiritual_note: spiritualNote
                }
            })
        })

        r = await fetch(`http://localhost:3000/api/v1/logs/${this.props.log.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.token}`
            }
        })

        let data = await r.json()
        console.log(data)
        this.props.updateLog(data)
        this.props.onEdit()
    }

    render() {
        const { log } = this.props
        return (
            <form onSubmit={ this.handleSubmit }>
                <TextField label='Mental Rating' onChange={this.handleChange('mentalRating')}
                    defaultValue={log.mentalRating === null ? 'No entry...' : log.mentalRating}/>
                <div style={{ marginTop: 10 }} />

                <TextField label='Mental Note' onChange={this.handleChange('mentalNote')}
                    defaultValue={log.mentalNote === null ? 'No entry...' : log.mentalNote}/>
                <div style={{ marginTop: 40 }} />


                <TextField label='Emotional Rating' onChange={this.handleChange('emotionalRating')}
                    defaultValue={log.emotionalRating === null ? 'No entry...' : log.emotionalRating}/>
                <div style={{ marginTop: 10 }} />

                <TextField label='Emotional Note' onChange={this.handleChange('emotionalNote')}
                    defaultValue={log.emotionalNote === null ? 'No entry...' : log.emotionalNote}/>
                <div style={{ marginTop: 40 }} />


                <TextField label='Physical Rating' onChange={this.handleChange('physicalRating')}
                    defaultValue={log.physicalRating === null ? 'No entry...' : log.physicalRating}/>
                <div style={{ marginTop: 10 }} />

                <TextField label='Physical Note' onChange={this.handleChange('physicalNote')}
                    defaultValue={log.physicalNote === null ? 'No entry...' : log.physicalNote}/>
                <div style={{ marginTop: 40 }} />


                <TextField label='Spiritual Rating' onChange={this.handleChange('spiritualRating')}
                    defaultValue={log.spiritualRating === null ? 'No entry...' : log.spiritualRating}/>
                <div style={{ marginTop: 10 }} />

                <TextField label='Spiritual Note' onChange={this.handleChange('spiritualNote')}
                    defaultValue={log.spiritualNote === null ? 'No entry...' : log.spiritualNote}/>
                <div style={{ marginTop: 20 }} />

                <Button type='submit'>Save Changes</Button>
            </form>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.user.token,
        user: state.user.user
    }
}

const mapDispatchToProps = { updateLog }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LogEditForm))
