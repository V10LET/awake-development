import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import BarChart from './BarChart'

import Card from '@material-ui/core/Card'

const styles = theme => createStyles({
    card: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: '20px 0'

    },
    cardDetails: {
        display: 'flex',
        flexFlow: 'column nowrap',
        margin: 40,
        flex: 1
    },
    highlight: {
        width: '100%',
        textAlign: 'center',
        padding: '20px 0',
        margin: '40px 0 0',
    },
    cardColumn: {
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '40%',
        margin: '20px'
    },
    cardRow: {
        width: '400px',
        margin: '20px'
    }
})

class Profile extends Component {

    state = {
        horoscope: '',
        needsSignFetch: false
    }

    componentDidMount() {
        this.signFetch()
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.birthday !== prevProps.user.birthday) {
            this.signFetch()
        }
    }

    sign = () => {
        if (this.props.user && this.props.user.birthday) {
            let date =  this.props.user.birthday.split('-')
            let day = Number(date[2])
            let month = date[1]

            switch (month) {
            case '01':
             return 1 <= day && day <= 19 ? 'Capricorn' : 'Aquarius'
            case '02':
             return 1 <= day && day <= 18 ? 'Aquarius' : 'Pisces'
            case '03':
             return 1 <= day && day <= 20 ? 'Pisces' : 'Aries'
            case '04':
             return 1 <= day && day <= 19 ? 'Aries' : 'Taurus'
            case '05':
             return 1 <= day && day <= 20 ? 'Taurus' : 'Gemini'
            case '06':
             return 1 <= day && day <= 20 ? 'Gemini' : 'Cancer'
            case '07':
             return 1 <= day && day <= 22 ? 'Cancer' : 'Leo'
            case '08':
             return 1 <= day && day <= 22 ? 'Leo' : 'Virgo'
            case '09':
             return 1 <= day && day <= 22 ? 'Virgo' : 'Libra'
            case '10':
             return 1 <= day && day <= 22 ? 'Libra' : 'Scorpio'
            case '11':
             return 1 <= day && day <= 21 ? 'Scorpio' : 'Sagittarius'
            case '12':
             return 1 <= day && day <= 21 ? 'Sagittarius' : 'Capricorn'
            default:
                return null
            }
        }
    }

    signFetch = () => {
        if (this.sign()) {
            fetch(`http://localhost:3000/api/v1/horoscope/${this.sign()}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.props.token}`
                }
            })
            .then(r=> r.json())
            .then(r=> { this.setState({ horoscope: r.horoscope }) })
        }
    }



    render() {
        const { user, classes } = this.props
        return (
            <Fragment>
                <div className='profile-container'>
                    <div className={classes.cardRow}>
                        <Card className={classes.card}>

                            <div className={classes.cardDetails}>
                                <h2 style={{ margin: 0 }}>{this.sign()} Today</h2>
                                <p>{this.state.horoscope}</p>
                            </div>
                        </Card>
                    </div>
                    <div className={classes.cardColumn}>
                        <Card className={classes.cardRow}>
                            <div className={classes.cardDetails}>
                                <BarChart timedLogs={user.timed_logs.length} logs={user.logs.length}/>
                            </div>

                        </Card>
                    </div>

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
    return {
        user: state.user.user,
        token: state.user.token
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Profile))
