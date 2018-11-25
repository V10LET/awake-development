import React, {Component} from 'react'
import { connect } from 'react-redux'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

const styles = theme => createStyles({

})

class Profile extends Component {

    render() {
        console.log(this.props.user)
        const { user } = this.props
        return (
            <div className='profile-container'>
                <div>
                    <img src={user.avatar} alt={user.name} />
                    <h1>{user.name}</h1>
                    <h1>{user.email}</h1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}
export default connect(mapStateToProps)(withStyles(styles)(Profile))
