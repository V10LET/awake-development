import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'

import ViewLog from '../components/ViewLog'
import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'

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
        justifyContent: 'center'
    }
})

class ViewLogs extends Component {

    state = {
        searchTerm: ''
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value })
    }

    handleSearch = (logs) => {
        const { searchTerm } = this.state
        return logs ?
            logs.filter(l=> {
                return l.mentalNote.includes(searchTerm) ||
                l.emotionalNote.includes(searchTerm) ||
                l.physicalNote.includes(searchTerm) ||
                l.spiritualNote.includes(searchTerm)
            }) : null
    }

    render() {
        const { user, classes } = this.props
        const logs = this.handleSearch(user.logs)
        return (
            <div className={classes.allLogs}>
                <div className={classes.searchContainer}>
                    <SearchIcon />
                    <Input type="search" style={{ width: '40%' }} onChange={this.handleChange}/>
                </div>
                <div className='logs-container'>
                    {logs.slice().reverse().map(log=> {
                        return (
                            <div key={log.id} style={{ margin: 20 }}>
                                <ViewLog log={log} />
                            </div>
                        )
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
