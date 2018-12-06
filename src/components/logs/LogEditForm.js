import React from 'react'
import { connect } from 'react-redux'
import { updateLog } from '../../actions/logAction'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

const mental = [
  { value: '1', label: 'Busy', },
  { value: '2', label: 'Foggy', },
  { value: '3', label: 'Distracted', },
  { value: '4', label: 'Neutral', },
  { value: '5', label: 'Focused', },
  { value: '6', label: 'Calm', },
]

const emotional = [
  { value: '1',label: 'Anger', },
  { value: '2',label: 'Shame', },
  { value: '3',label: 'Stress', },
  { value: '4',label: 'Excitement', },
  { value: '5',label: 'Content', },
  { value: '6',label: 'Gratitude', },
]

const physical = [
  { value: '1',label: 'Painful', },
  { value: '2',label: 'Tired', },
  { value: '3',label: 'Disconnected', },
  { value: '4',label: 'Grounded', },
  { value: '5',label: 'Energetic', },
  { value: '6',label: 'Relaxed', },
]

const spiritual = [
  { value: '1',label: 'Hopeless', },
  { value: '2',label: 'Uncertain', },
  { value: '3',label: 'Apathetic', },
  { value: '4',label: 'Intrigued', },
  { value: '5',label: 'Hopeful', },
  { value: '6',label: 'Inspired', },
]

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
        this.props.updateLog(data)
        this.props.onEdit()
    }

    render() {
        const { mentalRating, emotionalRating, physicalRating, spiritualRating } = this.state
        const { log } = this.props
        return (
            <form onSubmit={ this.handleSubmit }>

                <TextField select value={mentalRating ? mentalRating : 6} label="Mental" onChange={this.handleChange('mentalRating')}>
                    {mental.map(option=> (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>

                <TextField onChange={this.handleChange('mentalNote')}
                    defaultValue={log.mentalNote === null ? 'No entry...' : log.mentalNote}/>
                <div style={{ marginTop: 40 }} />

                <TextField select value={emotionalRating ? emotionalRating : 6} label="Emotional" onChange={this.handleChange('emotionalRating')}>
                    {emotional.map(option=> (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>

                <TextField onChange={this.handleChange('emotionalNote')}
                    defaultValue={log.emotionalNote === null ? 'No entry...' : log.emotionalNote}/>
                <div style={{ marginTop: 40 }} />

                <TextField select value={physicalRating ? physicalRating : 6} label="Physical" onChange={this.handleChange('physicalRating')}>
                    {physical.map(option=> (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>

                <TextField onChange={this.handleChange('physicalNote')}
                    defaultValue={log.physicalNote === null ? 'No entry...' : log.physicalNote}/>
                <div style={{ marginTop: 40 }} />

                <TextField select value={spiritualRating ? spiritualRating : 6} label="Spiritual" onChange={this.handleChange('spiritualRating')}>
                    {spiritual.map(option=> (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>

                <TextField onChange={this.handleChange('spiritualNote')}
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

export default connect(mapStateToProps, mapDispatchToProps)(LogEditForm)
