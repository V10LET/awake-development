import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'

// radio button
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

// card for each log entry
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import { setLog } from '../actions/logAction'

class Profile extends Component {

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

        const { mentalNote, mentalRating, emotionalNote, emotionalRating, physicalNote, physicalRating, spiritualNote, spiritualRating } = this.state

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
            <div className='log-card-container'>

                    <form className='log-card-form' onSubmit={this.handleSubmit}>

                        <Card className='log-card'>
                            <CardMedia style={{ height: '150px' }} image={require('../style/images/emotional1.jpg')}/>
                            <div className='card-content'>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">How has your state of mind been?</FormLabel>
                                    <RadioGroup aria-label="Mental" name="mentalRating" value={this.state.mentalRating} onChange={this.handleChange} style={{ flexDirection: 'row' }}>
                                      <FormControlLabel value="1" control={<Radio />} label="Busy" />
                                      <FormControlLabel value="2" control={<Radio />} label="Foggy" />
                                      <FormControlLabel value="3" control={<Radio />} label="Distracted" />
                                      <FormControlLabel value="4" control={<Radio />} label="Neutral" />
                                      <FormControlLabel value="5" control={<Radio />} label="Focused" />
                                      <FormControlLabel value="6" control={<Radio />} label="Calm" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField id="outlined-multiline-static" style={{width: 300}} multiline rows="3" label="Add Note" margin="normal" variant="outlined" name="mentalNote" onChange={this.handleChange }/>
                            </div>
                        </Card>

                        <Card className='log-card'>
                            <CardMedia style={{ height: '150px' }} image={require('../style/images/mental.jpg')}/>
                            <div className='card-content'>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">What's your strongest feeling today?</FormLabel>
                                    <RadioGroup aria-label="Emotional" name="emotionalRating" value={this.state.emotionalRating} onChange={this.handleChange} style={{ flexDirection: 'row' }}>
                                      <FormControlLabel value="1" control={<Radio />} label="Anger" />
                                      <FormControlLabel value="2" control={<Radio />} label="Shame" />
                                      <FormControlLabel value="3" control={<Radio />} label="Stress" />
                                      <FormControlLabel value="4" control={<Radio />} label="Joy" />
                                      <FormControlLabel value="5" control={<Radio />} label="Content" />
                                      <FormControlLabel value="6" control={<Radio />} label="Gratitude" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField id="outlined-multiline-static" style={{width: 300}} multiline rows="3" label="Add Note" margin="normal" variant="outlined" name="emotionalNote" onChange={this.handleChange }/>
                            </div>
                        </Card>

                        <Card className='log-card'>
                            <CardMedia style={{ height: '150px' }} image={require('../style/images/physical1.jpg')}/>
                            <div className='card-content'>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">How is your body doing today?</FormLabel>
                                    <RadioGroup aria-label="Physical" name="physicalRating" value={this.state.physicalRating} onChange={this.handleChange} style={{ flexDirection: 'row' }}>
                                      <FormControlLabel value="1" control={<Radio />} label="Painful" />
                                      <FormControlLabel value="2" control={<Radio />} label="Tired" />
                                      <FormControlLabel value="3" control={<Radio />} label="Disconnected" />
                                      <FormControlLabel value="4" control={<Radio />} label="Grounded" />
                                      <FormControlLabel value="5" control={<Radio />} label="Energetic" />
                                      <FormControlLabel value="6" control={<Radio />} label="Relaxed" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField id="outlined-multiline-static" style={{width: 300}} multiline rows="3" label="Add Note" margin="normal" variant="outlined" name="physicalNote" onChange={this.handleChange }/>
                            </div>
                        </Card>

                        <Card className='log-card'>
                            <CardMedia style={{ height: '150px' }} image={require('../style/images/emotional.jpg')}/>
                            <div className='card-content'>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">How're you feeling about life in general?</FormLabel>
                                    <RadioGroup aria-label="Spiritual" name="spiritualRating" value={this.state.spiritualRating} onChange={this.handleChange} style={{ flexDirection: 'row' }}>
                                      <FormControlLabel value="1" control={<Radio />} label="Hopeless" />
                                      <FormControlLabel value="2" control={<Radio />} label="Uncertain" />
                                      <FormControlLabel value="3" control={<Radio />} label="Apathetic" />
                                      <FormControlLabel value="4" control={<Radio />} label="Intrigued" />
                                      <FormControlLabel value="5" control={<Radio />} label="Hopeful" />
                                      <FormControlLabel value="6" control={<Radio />} label="Inspired" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField id="outlined-multiline-static" style={{width: 300}} multiline rows="3" label="Add Note" margin="normal" variant="outlined" name="spiritualNote" onChange={this.handleChange }/>
                            </div>
                        </Card>

                    <Button type='submit' variant="contained" aria-label="Save" color='primary'><SaveIcon/>Save</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
