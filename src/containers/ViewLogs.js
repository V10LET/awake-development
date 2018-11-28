import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ViewLog from '../components/ViewLog'
import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'

class ViewLogs extends Component {
    render() {
        const { user } = this.props
        return (
            <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                    <SearchIcon />
                    <Input type="search" style={{ width: '40%' }}/>
                </div>
                <div className='logs-container'>
                    {user.logs.slice().reverse().map(log=> {
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
export default connect(mapStateToProps)(ViewLogs)
