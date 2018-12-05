import React, { Component } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'

const styles = theme => createStyles({
    homeContainer: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'center',
        position: 'fixed',
        top: 0, bottom: 0, left: 0, right: 0,
        maxWidth: '100%', maxHeight: '100%',
        margin: 'auto',
        overflow: 'auto',
        backgroundImage: 'url("https://images.pexels.com/photos/1340155/pexels-photo-1340155.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
        backgroundSize: 'cover'
    },
    title: {
        fontSize: '13em',
        color: '#1E1E1E',
        marginTop: 60
    },
    desc: {
        fontSize: '1em',
        color: '#1E1E1E',
        letterSpacing: '.1em'
    }
})

class Home extends Component {

    render() {
        const {classes} = this.props
        return (
            <div className={classes.homeContainer}>
                <div className={classes.title}>awake</div>
                <div className={classes.desc}>cultivating deeper self awareness through personal reflection</div>
            </div>

        )
    }
}

export default (withStyles(styles)(Home))
