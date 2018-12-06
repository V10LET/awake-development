import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import history from '../../history'
import BarChart from './BarChart'
import { setPath } from '../../actions/designAction'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

const styles = theme => createStyles({
    topCards: {
        marginBottom: 40,
        display: 'flex',
        flexFlow: 'row wrap'
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: '20px'

    },
    cardDetails: {
        fontSize: '0.8em',
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: 40,
    },
    cardHoroscope: {
        display: 'flex',
        flexFlow: 'column nowrap',
        margin: '40px 40px 20px'
    },
    highlight: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        padding: '20px 0',
        // backgroundColor: '#138FB0',
        backgroundColor: 'rgba(0,0,0,.9)',
    },
    cardColumn: {
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '40%',
        margin: '20px'
    },
    cardRow: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',

    },
    cardQuote: {
        width: '300px',
        margin: '20px',
        backgroundSize: 'cover'
    }
})

class Profile extends Component {

    state = {
        horoscope: '',
        quotes: '',
        needsSignFetch: false
    }

    componentDidMount() {
        this.signFetch()
        this.quoteFetch()
        this.props.setPath('/dashboard')
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

    signFetch = async () => {
        if (this.sign()) {
            let r = await fetch(`http://localhost:3000/api/v1/horoscope/${this.sign()}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.props.token}` }
            })
            let data = await r.json()
            this.setState({ horoscope: data.horoscope })
        }
    }

    quoteFetch = async () => {
        let r = await fetch('https://talaikis.com/api/quotes/')
        let data = await r.json()
        let quotes = _.sampleSize(data, 9)
        this.setState({ quotes })
    }

    colorPicker = () => {
        let colors = ['#a65b2c', '#5f5c19', '#b5b494', '#d9dca1', '#7c8165', 'white']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    renderQuotes = () => {
        console.log(this.colorPicker())
        const { classes } = this.props
        const { quotes } = this.state
        if (quotes) {
            return quotes.map((q, i)=> {
                return (
                    <Card key={i} className={classes.cardQuote}>
                    <div style={{backgroundColor: `${this.colorPicker()}`, height: '100%'}}>
                        <div className={classes.cardDetails}>
                            <div><strong>{q.quote}</strong></div>
                            <br/><div>~{q.author}</div>
                        </div>
                    </div>
                </Card>
                )
            })
        }
    }


    handleClick = (event) => {
        const value = event.target.innerText.toLowerCase()
        console.log(value, value.includes('log'))
        value.includes('log') ? history.push('/create-log') : history.push('/timer')
    }

    renderBarChart = () => {
        const { user } = this.props
        if (user.logs.length === 0 && user.timed_logs.length === 0) {
            return (
                <div style={{marginLeft: '-7em'}}>
                    <h2 style={{margin: '0 0 1em 0'}}>Progress</h2>
                    <div style={{fontStyle: 'oblique', fontSize: '.8em', color: 'grey'}}>No logs or meditations yet...</div>
                    <div style={{margin: '1em 0 0 -1em', display: 'flex', justifyContent: 'flex-start'}}>
                        <Button onClick={this.handleClick}>New Log</Button>
                        <Button onClick={this.handleClick}>Meditate</Button>
                    </div>
                </div>
            )
        } else {
            return <BarChart timedLogs={user.timed_logs.length} logs={user.logs.length}/>
        }
    }

    componentWillUnmount() {
        this.signFetch()
        this.quoteFetch()
        this.renderBarChart()
    }

    render() {
        const { user, classes } = this.props
        return (
            <Fragment>
                <div className='profile-container'>
                    <div className={classes.topCards}>
                        <div style={{width: '450px'}}>
                            <Card className={classes.card}>
                                <div >
                                <div className={classes.cardHoroscope}>
                                    <h2 style={{ margin: 0 }}>{this.sign()} Today</h2>
                                    <p>{this.state.horoscope}</p>
                                </div>
                                <div className={classes.highlight}>Total logs and meditations: {user.logs.length + user.timed_logs.length}</div>
                                </div>
                            </Card>
                        </div>
                        <div style={{width: '450px'}}>
                            <Card className={classes.card}>
                                <div className={classes.cardDetails}>
                                    {this.renderBarChart()}
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className={classes.cardRow}>
                        {this.renderQuotes()}
                    </div>

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

const mapDispatchToProps = { setPath }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile))
