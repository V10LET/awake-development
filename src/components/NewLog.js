import React, { Component } from 'react'

// radio button
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

// card for each log entry
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'

const styles = {
    flexDirection: 'row',
    justifyContent: 'center'
}

class Log extends Component {

    render() {
        const { rating, note, question, v1, v2, v3, v4, v5, v6, handleChange, ratingValue } = this.props
        return (
            <Card className='log-card'>
                {/*<CardMedia style={{ width: '200px' }} image={require(`../style/images/${note}.jpg`)}/>*/}
                <div className='card-content'>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend" style={{ paddingBottom: 10 }}>{question}</FormLabel>
                        <RadioGroup aria-label={rating} name={rating} value={ratingValue} onChange={handleChange} style={ styles }>
                          <FormControlLabel value="1" control={<Radio />} label={v1} />
                          <FormControlLabel value="2" control={<Radio />} label={v2} />
                          <FormControlLabel value="3" control={<Radio />} label={v3} />
                          <FormControlLabel value="4" control={<Radio />} label={v4} />
                          <FormControlLabel value="5" control={<Radio />} label={v5} />
                          <FormControlLabel value="6" control={<Radio />} label={v6} />
                        </RadioGroup>
                    </FormControl>
                    <TextField id="outlined-multiline-static" multiline rows="3" label="Add Note"
                        margin="normal" variant="outlined" name={note} onChange={handleChange }/>
                </div>
            </Card>
        )
    }
}

export default Log
