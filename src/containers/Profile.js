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
        padding: 40
    },
    media: {
        borderRadius: '100%',
        height: 'auto',
        width: 250,
    }
})

class Profile extends Component {

    render() {
        console.log(this.props.user)
        const { user, classes } = this.props
        return (
            <div className='profile-container'>
                <div>

                    <Card className={classes.profileCard} >
                        <Fragment>
                            <CardMedia component="img" alt={user.name}
                             className={classes.media}
                             height="200"
                             image={user.avatar}
                             title={user.name}
                           />

                            <h1>{user.name}</h1>
                            <h1>{user.email}</h1>
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
