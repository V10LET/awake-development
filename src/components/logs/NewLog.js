import React, { Component } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'

// radio button
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

// card for each log entry
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'

const styles = theme => createStyles({
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    label: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,.9)'
    }
})

const colors = ['#a65b2c', '#5f5c19', '#b5b494', '#d9dca1', '#7c8165', 'white']

class Log extends Component {

    state = {
        color: ''
    }

    componentDidMount() {
        const color = colors[Math.floor(Math.random() * colors.length)]
        this.setState({ color })
    }

    render() {

        const { classes, rating, note, question, v1, v2, v3, v4, v5, v6, handleChange, ratingValue } = this.props
        return (
            <Card className='log-card' style={{backgroundColor: `${this.state.color}`}}>
                <div style={{backgroundColor: 'rgba(255, 255, 255, .5)', height: '100%'}}>
                    <div className='card-content'>
                        <FormControl component="fieldset" >
                            <FormLabel component="legend" className={classes.label}>{question}</FormLabel>
                            <RadioGroup aria-label={rating} name={rating} value={ratingValue} onChange={handleChange} className={classes.radioGroup}>
                              <FormControlLabel value="1" control={<Radio />} label={v1} />
                              <FormControlLabel value="2" control={<Radio />} label={v2} />
                              <FormControlLabel value="3" control={<Radio />} label={v3} />
                              <FormControlLabel value="4" control={<Radio />} label={v4} />
                              <FormControlLabel value="5" control={<Radio />} label={v5} />
                              <FormControlLabel value="6" control={<Radio />} label={v6} />
                            </RadioGroup>
                        </FormControl>
                        <TextField id="outlined-multiline-static" multiline rows="2" label="Add Note"
                            margin="normal" variant="outlined" name={note} onChange={handleChange }/>
                    </div>
                </div>
            </Card>
        )
    }
}

export default (withStyles(styles)(Log))
