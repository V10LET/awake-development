import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import sidebarFaded from '../style/images/sidebarFaded.jpg'

import { withStyles, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

const styles = theme => createStyles({
    card: {
        margin: '0 20px 80px',
        width: '35%',
        justifyContent: 'center',
        backgroundColor: 'white'

    },
    cardDetails: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        marginTop: 40,
    },
    highlight: {
        width: '100%',
        textAlign: 'center',
        padding: '20px 0',
        margin: '40px 0 0',
    }
})

class Profile extends Component {

    horoscope = (birthday) => {
        if (birthday) {
            let date = birthday.split('-')
            let day = date[2]
            let month = date[1]

            switch (month) {
                case '01':
                return birthday
                case '02':
                return birthday
                case '03':
                return birthday
                case '04':
                return birthday
                case '05':
                return birthday
                case '06':
                return birthday
                case '07':
                return birthday
                case '08':
                return birthday
                case '09':
                return birthday
                case '10':
                return birthday
                case '11':
                return birthday
                case '12':
                return birthday
                break
                default:
                    return 'No horoscopes today...'
            }
        }
    }


    render() {
        const { user, classes } = this.props
        this.horoscope(user.birthday)
        return (
            <Fragment>
                <div className='profile-container'>
                    <div></div>
                    <Card className={classes.card}>
                        <Fragment>
                            <div className={classes.cardDetails}>
                                <div className={classes.media} style={{backgroundImage: `url("${user.avatar}")`}}></div>
                            </div>
                            <div className={classes.highlight}>Total number of logs: {user.logs.length}</div>
                        </Fragment>
                    </Card>

                    <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            LOG STATS (OR TIMER INFO) GO HERE
                        </div>
                    </Card>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}
export default connect(mapStateToProps)(withStyles(styles)(Profile))
