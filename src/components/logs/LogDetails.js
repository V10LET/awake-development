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
    },
    text: {
        fontStyle: 'oblique',
        fontSize: 15
    }
})

class LogDetails extends React.Component {

    render() {
        const { log, classes } = this.props
        return (
           <div key={log.id}>
              <h3>Mental</h3>
              <div>Rating: {log.mentalRating === 0
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.mentalRating}</span>}</div>
               <div style={{marginTop: 10}}>Note: {log.mentalNote === ''
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.mentalNote}</span>}</div>

               <Divider className={ classes.divider }/>

               <h3>Emotional</h3>
               <div>Rating: {log.emotionalRating === 0
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.emotionalRating}</span>}</div>
               <div style={{marginTop: 10}}>Note: {log.emotionalNote === ''
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.emotionalNote}</span>}</div>

               <Divider className={ classes.divider }/>

               <h3>Physical</h3>
               <div>Rating: {log.physicalRating === 0
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.physicalRating}</span>}</div>
               <div style={{marginTop: 10}}>Note: {log.physicalNote === ''
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.physicalNote}</span>}</div>

               <Divider className={ classes.divider }/>

               <h3>Spiritual</h3>
               <div>Rating: {log.spiritualRating === 0
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.spiritualRating}</span>}</div>
               <div style={{marginTop: 10}}>Note: {log.spiritualNote === ''
                   ? <span className={ classes.noEntryText }> No entry...</span>
                   : <span className={classes.text}>{log.spiritualNote}</span>}</div>
            </div>
        )
    }
}

export default (withStyles(styles)(LogDetails))
