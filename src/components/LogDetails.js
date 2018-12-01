import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

const styles = theme => createStyles({
    noEntryText: {
        fontStyle: 'oblique',
        fontSize: 13,
        color: 'rgba(0,0,0,.3)',
    },
    divider: {
        margin: '20px 0',
    }
})

class LogDetails extends React.Component {

    render() {
        const { log, classes } = this.props
        return (
           <div key={log.id}>
               <div>Mental Rating: {log.mentalRating === 0
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.mentalRating}</div>
                   <div>Mental Note: {log.mentalNote === ''
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.mentalNote}</div>

                   <Divider className={ classes.divider }/>

                   <div>Emotional Rating: {log.emotionalRating === 0
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.emotionalRating}</div>
                   <div>Emotional Note: {log.emotionalNote === ''
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.emotionalNote}</div>

                   <Divider className={ classes.divider }/>

                   <div>Physical Rating: {log.physicalRating === 0
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.physicalRating}</div>
                   <div>Physical Note: {log.physicalNote === ''
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.physicalNote}</div>

                   <Divider className={ classes.divider }/>

                   <div>Spiritual Rating: {log.spiritualRating === 0
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.spiritualRating}</div>
                   <div>Spiritual Note: {log.spiritualNote === ''
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.spiritualNote}</div>
            </div>
        )
    }
}

export default (withStyles(styles)(LogDetails))
