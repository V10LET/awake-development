import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    }


    handleRadioChange = (event) => {
        this.setState({mentalRating: event.target.value})
    }

    handleNoteChange = (event) => {
        this.setState({mentalNote: event.target.value})
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

        let data = await r.json()
        console.log(data)
    }


    render() {
        console.log(this.props.user.user)
        return (
            <div className='log-card-container'>

                <Card className='log-card'>
                    <CardMedia style={{ height: '250px' }} image={require('../style/images/mental.jpg')}/>
                    <form className='log-card-form' onSubmit={this.handleSubmit}>
                        <FormControl component="fieldset" >

                            <FormLabel component="legend">Mental</FormLabel>

                            <RadioGroup aria-label="Mental" name="mental" value={this.state.mentalRating} onChange={this.handleRadioChange} style={{ flexDirection: 'row' }}>
                              <FormControlLabel value="1" control={<Radio />} label="Busy" />
                              <FormControlLabel value="2" control={<Radio />} label="Foggy" />
                              <FormControlLabel value="3" control={<Radio />} label="Neutral" />
                              <FormControlLabel value="4" control={<Radio />} label="Clear" />
                              <FormControlLabel value="5" control={<Radio />} label="Calm" />
                            </RadioGroup>

                        </FormControl>
                        <TextField id="outlined-multiline-static"  multiline rows="3" label="Add Note" margin="normal" variant="outlined" onChange={this.handleNoteChange }/>
                        <Button type='submit' variant="fab" aria-label="Save" color='primary'><SaveIcon/></Button>
                    </form>

                </Card>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = { setLog }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
