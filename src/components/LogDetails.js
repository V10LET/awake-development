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
               <div>Mental Rating: {log.mental_rating === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.mental_rating}</div>
                   <div>Mental Note: {log.mental_note === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.mental_note}</div>

                   <Divider className={ classes.divider }/>

                   <div>Emotional Rating: {log.emotional_rating === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.emotional_rating}</div>
                   <div>Emotional Note: {log.emotional_note === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.emotional_note}</div>

                   <Divider className={ classes.divider }/>

                   <div>Physical Rating: {log.physical_rating === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.physical_rating}</div>
                   <div>Physical Note: {log.physical_note === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.physical_note}</div>

                   <Divider className={ classes.divider }/>

                   <div>Spiritual Rating: {log.spiritual_rating === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.spiritual_rating}</div>
                   <div>Spiritual Note: {log.spiritual_note === null
                       ? <span className={ classes.noEntryText }> No entry...</span>
                       : log.spiritual_note}</div>
            </div>
        )
    }
}

export default (withStyles(styles)(LogDetails))
