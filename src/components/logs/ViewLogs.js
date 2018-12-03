import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import { withStyles, createStyles } from '@material-ui/core/styles'

import ViewLog from './ViewLog'
import ViewMed from './ViewMed'

import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'
import Switch from '@material-ui/core/Switch'

const styles = theme => createStyles({
    allLogs: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
        margin: '40px 0px'
    },
    inputBar: {
        width: '40%',
        marginLeft: 10
    },
    switchRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center'
    },
})

class ViewLogs extends Component {

    state = {
        searchTerm: '',
        meditation: false
    }

    handleChange = (event) => {
        this.setState({ searchTerm: String(event.target.value) })
    }

    handleSearch = (user) => {
        const { searchTerm, meditation } = this.state
        if (user.logs) {
            if (meditation) {
                return user.timed_logs.filter(l=> {

                    let hr = String(Moment.duration(Number(l.time)).hours())
                    let min = String(Moment.duration(Number(l.time)).minutes())
                    let sec = String(Moment.duration(Number(l.time)).seconds())

                    if (hr !== '0') {
                        hr = hr + 'hours'
                    }

                    if (min !== '0') {
                        min = min + 'minutes'
                    }

                    if (sec !== '0') {
                        sec = sec + 'seconds'
                    }

                    return hr.includes(searchTerm) ||
                    min.includes(searchTerm) ||
                    sec.includes(searchTerm)
                })
            } else {
                return user.logs.filter(l=> {
                    return l.mentalNote.includes(searchTerm) ||
                    l.emotionalNote.includes(searchTerm) ||
                    l.physicalNote.includes(searchTerm) ||
                    l.spiritualNote.includes(searchTerm)
                })
            }
        }
    }

    handleSwitchChange = () => this.setState({ meditation: !this.state.meditation })

    render() {
        const { user, classes } = this.props
        const { meditation } = this.state
        const logs = this.handleSearch(user)
        return (
            <div className={classes.allLogs}>
                <div className={classes.searchContainer}>
                    <SearchIcon />
                    <Input type="search" className={classes.inputBar} onChange={this.handleChange}/>
                </div>

                <div className={classes.switchRow}>
                    <div style={meditation ? {color: 'rgba(0,0,0,.3)'} : null}>Written</div>
                        <Switch checked={meditation} onChange={this.handleSwitchChange}/>
                    <div style={meditation ? null : {color: 'rgba(0,0,0,.3)'}}>Meditation</div>
                </div>

                <div className='logs-container'>
                    {logs.slice().reverse().map(log=> {
                        if (!meditation) {
                            return <div key={log.id} style={{ margin: 20 }}><ViewLog log={log} /></div>
                        } else {
                            return <div key={log.id} style={{ margin: 20 }}><ViewMed log={log}/></div>
                        }

                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}
export default connect(mapStateToProps)(withStyles(styles)(ViewLogs))
