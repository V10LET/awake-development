import React, {Component} from 'react'
import { connect } from 'react-redux'
import ViewLog from '../components/ViewLog'

class ViewLogs extends Component {
    render() {
        const { user } = this.props
        return (
            <div className='logs-container'>
                {user.logs.slice().reverse().map(log=> {
                    return (
                        <div key={log.id} style={{ margin: 20 }}>
                            <ViewLog log={log} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}
export default connect(mapStateToProps)(ViewLogs)
