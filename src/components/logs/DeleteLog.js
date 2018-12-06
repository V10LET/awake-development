import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../../actions/userAction'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class DeleteLog extends React.Component {

    handleClick = () => this.props.deleteDialog()

    handleDelete = async () => {
        let r = await fetch(`http://localhost:3000/api/v1/logs/${this.props.logId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.props.user.token}` }
        })

        r = await fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`)
        let data = await r.json()
        this.props.setUser(data)
        this.props.deleteDialog()
    }

    render () {
        return (
            <Dialog open={true} >
                <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
                <DialogContent style={{marginTop: '-1em'}}>
                    <DialogContentText style={{fontSize: '.8em', fontStyle: 'oblique'}}>
                        You won't be able to retrieve this data once it has been deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDelete}>Yes, Delete</Button>
                    <Button onClick={this.handleClick} style={{color: '#A30404'}}>Nevermind</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    token: state.user.token,
    user: state.user.user,
 })

export default connect(mapStateToProps, {setUser})(DeleteLog)
