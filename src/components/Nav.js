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

import MenuIcon from '@material-ui/icons/Menu'
import AssessmentIcon from '@material-ui/icons/Assessment'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import TimelapseIcon from '@material-ui/icons/Timelapse'
import SettingsIcon from '@material-ui/icons/Settings'
import AssignmentIcon from '@material-ui/icons/Assignment'
import BrushIcon from '@material-ui/icons/Brush'
import HomeIcon from '@material-ui/icons/Home'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const routes = {
    'Dashboard':<HomeIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Logs':<AssignmentIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Create Log':<BrushIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Log Charts':<ShowChartIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Timer':<TimelapseIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Meditation Charts':<AssessmentIcon style={{fill: 'rgba(0,0,0,.9)'}}/>,
    'Settings':<SettingsIcon style={{fill: 'rgba(0,0,0,.9)'}}/>
}

const styles = theme => createStyles({

    listItemText:{ fontSize: '0.8em' },
    MenuIcon: { color: 'black', cursor: 'pointer' },
    name: { fontSize: 25, fontWeight: 700 },
    btn: {backgroundColor: '#CEC678'},
    logout: { backgroundColor: 'white' },
    drawerLink: { color: 'black', textDecoration: 'none' },
    appbar: { boxShadow: '0 0 0 !important', backgroundColor: 'rgba(0,0,0,0)' },

    icon: { marginRight: 5, fill: 'rgba(0,0,0,.9)', height: 20},
    headerLink: { textAlign: 'center', color: 'black', textDecoration: 'none' },
    routes: { display: 'flex', alignItems: 'center', marginBottom: 5 },
    drawerList: { display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' },

    drawer: {
       width: 225,
       backgroundSize: 'cover',
       backgroundImage: "url('https://images.pexels.com/photos/565998/pexels-photo-565998.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
       backgroundPositionX: '-20em',
       backgroundPositionY: '10em',
    },
    media: {
        borderRadius: '100%',
        width: 80,
        height: 80,
        backgroundSize: 'cover',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    },
    selected: {
        backgroundColor: 'rgba(0,0,0,.05)'
    }
})

class Nav extends Component {

    handleClick = () => this.props.setDrawer(!this.props.drawerOpen)
    renderAvatar = (img) => img === '' ? 'https://source.unsplash.com/300x300/?nature,tree' : img

    render () {
        const { drawerOpen, token, user, classes, path } = this.props
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
                            { path === '/signup' ?
                                <Link to="/" className={ classes.headerLink }>
                                    <Button variant='contained' className={classes.btn}>
                                        <HomeIcon className={classes.icon}/>
                                        Home
                                    </Button>
                                </Link>
                                :
                                <Link to="/signup" className={ classes.headerLink }>
                                    <Button variant='contained' color={'#B05813'} className={classes.btn}>
                                        <PersonAddIcon className={classes.icon}/>
                                        Sign Up
                                    </Button>
                                </Link>

                            }
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
                                    <ListItem style={{fontSize: '1.5em', fontWeight: 'bold', justifyContent: 'center'}}>{user.name ? user.name.toUpperCase() : null}</ListItem>
                                    {Object.keys(routes).map(text => console.log('text~>', text, 'path~>', path))}
                                    {Object.keys(routes).map((text, index) => (
                                        <Fragment key={text}>
                                                {token ?
                                                    <Fragment>
                                                        <ListItem classes={path === `/${text.replace(/ /g,'-').toLowerCase()}` ? {root: classes.selected} : null}>
                                                            <ListItemIcon >{routes[text]}</ListItemIcon>
                                                            <Link to={`/${text.replace(/ /g,'-').toLowerCase()}`} className={ classes.drawerLink }>
                                                                <ListItemText classes={{primary: classes.listItemText}} primary={text}/>
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
        path: state.design.path,
        token: state.user.token,
        user: state.user.user
    }
}

const mapDispatchToProps = { setDrawer }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Nav))
