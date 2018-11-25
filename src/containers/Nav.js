import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// material ui
import { withStyles, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'


const styles = theme => createStyles({
    headerLink: {
       textAlign: 'center',
       color: 'white',
       textDecoration: 'none',
       fontWeight: 'bold',
       },
   drawerLink: {
       color: theme.palette.secondary.main,
       textDecoration: 'none',
       fontWeight: 'bold',
   },
   drawer: {
       backgroundColor: '#efebe9',
       zIndex: theme.zIndex.appBar - 1,
   }
})


class Nav extends Component {
    state = {
        open: true
    }

    handleClick = (event) => {
        this.setState({open: !this.state.open})
    }

    render () {
        const { token, classes } = this.props
        return (
            <Fragment>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" aria-label="Menu">
                            { token ? <MenuIcon onClick={ this.handleClick }/> : null }
                        </IconButton>
                        <img src={require('../style/images/awake.png')} alt='nav-logo' className='nav-logo'/>
                        <div style={{width: '100%', textAlign: 'right'}}>
                        { token ?
                            <Button variant="contained" color="secondary"><Link to="/logout" className={ classes.headerLink }>Logout</Link></Button>
                            :
                            <div>
                                <Link to="/login" className={ classes.headerLink }>Login</Link>
                                <Button size='small' style={{ backgroundColor: '#8b6b61' }}><Link to="/signup" className={ classes.headerLink }>Sign Up</Link></Button>
                            </div>
                        }
                        </div>
                    </Toolbar>

                </AppBar>

                { token ?
                    <Fragment>
                        <Drawer variant="persistent" open={this.state.open} anchor="left" classes={{ paper: classes.drawer }}>
                            <div style={{ paddingTop: 60 }}></div>
                             <List>
                                 {['Profile', 'New Log'].map((text, index) => (
                                     <ListItem button key={text}>
                                     {/*<ListItemIcon>{null}</ListItemIcon>*/}
                                     <Link to={`/${text.replace(/ /g,'-').toLowerCase()}`} className={ classes.drawerLink }><ListItemText primary={text} /></Link>
                                    </ListItem>
                                ))}
                             </List>
                        </Drawer>
                    </Fragment>
                    : <Redirect to='/'/>
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return { token: state.user.token }
}

export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(Nav))
