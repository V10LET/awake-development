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
        emotionalRating: null,
        physicalRating: null,
        spiritual: null
    }

    inputMentalNote = null
    inputEmotionalNote = null
    inputPhysicalNote = null
    inputSpiritualNote = null

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({mentalRating: event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        let r = await fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                user: {
                    ...this.state.user.user,
                    logs: [...this.state.user.user.logs,
                        {
                            mental_rating: this.state.mentalRating,
                            mental_note: this.inputMentalNote.value,
                            emotional_rating: null,
                            emotional_note: null,
                            physical_rating: null,
                            physical_note: null,
                            spiritual_rating: null,
                            spiritual_note: null,
                        }
                    ]
                }

            })
        })

        let data = await r.json()
        console.log(data)
    }


    render() {
        console.log(this.state.user)
        return (
            <div className='log-card-container'>

                <Card className='log-card'>
                    <CardMedia style={{ height: '250px' }} image={require('../style/images/mental.jpg')}/>
                    <form className='log-card-form' onSubmit={this.handleSubmit}>
                        <FormControl component="fieldset" >

                            <FormLabel component="legend">Mental</FormLabel>

                            <RadioGroup aria-label="Mental" name="mental" value={this.state.mentalRating} onChange={this.handleChange} style={{ flexDirection: 'row' }}>
                              <FormControlLabel value="1" control={<Radio />} label="Busy" />
                              <FormControlLabel value="2" control={<Radio />} label="Foggy" />
                              <FormControlLabel value="3" control={<Radio />} label="Neutral" />
                              <FormControlLabel value="4" control={<Radio />} label="Clear" />
                              <FormControlLabel value="5" control={<Radio />} label="Calm" />
                            </RadioGroup>

                        </FormControl>
                        <TextField id="outlined-multiline-static"  multiline rows="3" label="Add Note" margin="normal" variant="outlined" ref={el => this.inputMentalNote = el}/>
                        <Button type='submit' variant="fab" aria-label="Save" color='primary'><SaveIcon/></Button>
                    </form>

                </Card>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}

const mapDispatchToProps = { setLog }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
