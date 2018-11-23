import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'
import Log from '../components/Log'
import { setLog } from '../actions/logAction'

// card for each log entry
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'


class Logs extends Component {

    state = {
        mentalRating: null,
        mentalNote: null,
        emotionalRating: null,
        emotionalNote: null,
        physicalRating: null,
        physicalNote: null,
        spiritualRating: null,
        spiritualNote: null,
        submitError: null
    }


    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }


    handleSubmit = async (event) => {
        event.preventDefault()

        const { mentalRating, mentalNote, emotionalRating, emotionalNote, physicalRating, physicalNote, spiritualRating, spiritualNote } = this.state

        let r = await fetch(`http://localhost:3000/api/v1/logs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.user.token}`
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

        if (!r.ok) {
            let data = await r.json()
            this.setState({loginError: data.message})
            return
        }

        let data = await r.json()
        this.props.setLog(data.log)
        history.push('/profile')
    }


    render() {
        return (
            <div>
            <form className='log-card-form' onSubmit={this.handleSubmit}>
                <div className='log-card-container'>
                    <Log rating="mentalRating" note="mentalNote" question="How has your state of mind been?"
                        handleChange={this.handleChange} v1="Busy" v2="Foggy" v3="Distracted" v4="Neutral" v5="Focused" v6="Calm" />
                    <Log rating="emotionalRating" note="emotionalNote" question="What's your strongest feeling today?"
                        handleChange={this.handleChange} v1="Anger" v2="Shame" v3="Stress" v4="Excitement" v5="Content" v6="Gratitude" />
                    <Log rating="physicalRating" note="physicalNote" question="How is your body doing today?"
                        handleChange={this.handleChange} v1="Painful" v2="Tired" v3="Disconnected" v4="Grounded" v5="Energetic" v6="Relaxed" />
                    <Log rating="spiritualRating" note="spiritualNote" question="How're you feeling about life in general?"
                        handleChange={this.handleChange} v1="Hopeless" v2="Uncertain" v3="Apathetic" v4="Intrigued" v5="Hopeful" v6="Inspired" />
                </div>
                <Button type='submit' variant="contained" aria-label="Save" color='secondary'><SaveIcon/>Save</Button>
            </form>
            {this.state.submitError &&
                <div style={{color: 'red'}}>{this.state.submitError.toString()}</div>
            }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = { setLog }

export default connect(mapStateToProps, mapDispatchToProps)(Logs)
