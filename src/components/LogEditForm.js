import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

const styles = theme => createStyles({

})

class LogEditForm extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onEdit()
    }
    render() {
        const { classes } = this.props
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField label='Mental Rating' defaultValue='sample text' />
                <div style={{ marginTop: 10 }} />
                <TextField label='Mental Note' defaultValue='sample text' />
                <div style={{ marginTop: 40 }} />

                <TextField label='Emotional Rating' defaultValue='sample text' />
                <div style={{ marginTop: 10 }} />
                <TextField label='Emotional Note' defaultValue='sample text' />
                <div style={{ marginTop: 40 }} />

                <TextField label='Physical Rating' defaultValue='sample text' />
                <div style={{ marginTop: 10 }} />
                <TextField label='Physical Note' defaultValue='sample text' />
                <div style={{ marginTop: 40 }} />

                <TextField label='Spiritual Rating' defaultValue='sample text' />
                <div style={{ marginTop: 10 }} />
                <TextField label='Spiritual Note' defaultValue='sample text' />
                <div style={{ marginTop: 20 }} />

                <Button type='submit'>Save Changes</Button>
            </form>
        )
    }
}

export default (withStyles(styles)(LogEditForm))
