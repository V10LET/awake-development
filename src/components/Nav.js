import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setDrawer } from '../actions/designAction'
import { withStyles, createStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import MenuIcon from '@material-ui/icons/Menu'
import AssessmentIcon from '@material-ui/icons/Assessment'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import SettingsIcon from '@material-ui/icons/Settings'
import AssignmentIcon from '@material-ui/icons/Assignment'
import BrushIcon from '@material-ui/icons/Brush'
import HomeIcon from '@material-ui/icons/Home'

const routes = {
    'Dashboard':<HomeIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Logs':<AssignmentIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Create Log':<BrushIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Log Charts':<ShowChartIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Timer':<TimelapseIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Meditation Chart':<AssessmentIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Settings':<SettingsIcon style={{fill: 'rgba(0,0,0,.9)'}}/>
}

const styles = theme => createStyles({
    listItemText:{
        fontSize: '0.8em'
    },
    headerLink: {
       textAlign: 'center',
       color: 'black',
       textDecoration: 'none',
       },
   drawerLink: {
       color: 'black',
       textDecoration: 'none',
   },
   drawer: {
       width: 200,
       backgroundColor: '#5E5F01',
   },
   name: {
       fontSize: 25,
       fontWeight: 700,
   },
   logout: {
       backgroundColor: 'white',
   },
   routes: {
       display: 'flex',
       alignItems: 'center',
       marginBottom: 5
   },
   media: {
       borderRadius: '5%',
       width: 80,
       height: 80,
       backgroundSize: 'cover',
       boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
   },
   appbar: {
       boxShadow: '0 0 0 !important',
       backgroundColor: 'rgba(0,0,0,0)',
   },
   MenuIcon: {
       color: 'black',
       cursor: 'pointer',
   },
   drawerList: {
       display: 'flex',
       flexFlow: 'column nowrap',
       alignItems: 'center'
   }
})

class Nav extends Component {

    handleClick = () => this.props.setDrawer(!this.props.drawerOpen)
    renderAvatar = (img) => img === '' ? 'https://source.unsplash.com/300x300/?nature,tree' : img

    render () {
        const { drawerOpen, token, user, classes } = this.props
        return (

            <div >
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar variant="dense" style={{minHeight: 60}}>
                        { !drawerOpen ? <MenuIcon onClick={ this.handleClick }/> : null }
                        <div style={{width: '100%', textAlign: 'right'}}>
                        { token ?
                            <Button><Link to="/logout" className={ classes.headerLink }>Logout</Link></Button>
                            :
                            <div>
                                <Button style={{marginRight: 10}}><Link to="/login" className={ classes.headerLink }>Login</Link></Button>
                                <Button className='nav-hover-btn' variant='outlined'><Link to="/signup" className={ classes.headerLink }>Sign Up</Link></Button>
                            </div>
                        }
                        </div>
                    </Toolbar>

                </AppBar>

                { token ?
                    <Fragment>
                        <Drawer variant="persistent" open={drawerOpen} anchor="left" classes={{ paper: classes.drawer }}>
                            <div style={{padding: '20px 30px 10px'}}>
                                <MenuIcon onClick={ this.handleClick } className={classes.MenuIcon}/>
                            </div>
                                <List className={classes.drawerList}>
                                    <ListItem style={{ justifyContent: 'center' }}>
                                        <div className={classes.media} style={{backgroundImage: `url("${this.renderAvatar(user.avatar)}")`}}></div>
                                    </ListItem>
                                    <ListItem style={{fontSize: '1.5em', fontWeight: 'bold', justifyContent: 'center'}}>{user.name}</ListItem>
                                    {Object.keys(routes).map((text, index) => (
                                        <Fragment key={text}>
                                                {token ?
                                                    <Fragment>
                                                        <ListItem>
                                                            <ListItemIcon >{routes[text]}</ListItemIcon>
                                                            <Link to={`/${text.replace(/ /g,'-').toLowerCase()}`} className={ classes.drawerLink }>
                                                                <ListItemText classes={{primary: classes.listItemText}} primary={text} />
                                                            </Link>
                                                        </ListItem>
                                                    </Fragment>
                                                    : <Redirect to='/' />
                                               }
                                       </Fragment>
                                   ))}
                                </List>
                        </Drawer>
                    </Fragment>
                    : <Redirect to='/'/>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawerOpen: state.design.drawerOpen,
        token: state.user.token,
        user: state.user.user
    }
}

const mapDispatchToProps = { setDrawer }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Nav))
