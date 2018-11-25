import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

const styles = theme => createStyles({
    profileCard: {
        padding: '40px 40px 0 40px'
    },
    media: {
        borderRadius: '100%',
        height: 'auto',
        width: 250,
    },
    highlight: {
        width: '100%',
        backgroundColor: theme.palette.secondary.dark,
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        margin: '40px 0 0'
    }
})

class Profile extends Component {

    render() {
        console.log(this.props.user)
        const { user, classes } = this.props
        return (
            <div className='profile-container'>
                <div>
                    <Card style={{ backgroundImage: "url('https://ih1.redbubble.net/image.121705826.6787/pp,550x550.jpg')"}}>
                        <Fragment>
                            <div className={classes.profileCard}>
                                <CardMedia component="img" alt={user.name} className={classes.media}
                                    height="200" image={user.avatar} title={user.name}/>
                            </div>
                            <div className={classes.highlight}>Total number of logs: {user.logs.length}</div>
                        </Fragment>
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}
export default connect(mapStateToProps)(withStyles(styles)(Profile))
