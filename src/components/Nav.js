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
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => createStyles({
    headerLink: {
       textAlign: 'center',
       color: 'black',
       textDecoration: 'none',
       },
   drawerLink: {
       color: 'black',
       textDecoration: 'none',
       marginBottom: 5,
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
   media: {
       borderRadius: '5%',
       width: 80,
       height: 80,
       backgroundSize: 'cover',
       boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
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

const routes = ['Dashboard', 'Timer', 'Logs', 'Create Log', 'Progress', 'Settings']

class Nav extends Component {

    handleClick = () => {
        this.props.setDrawer(!this.props.drawerOpen)
    }

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
                                <Button><Link to="/login" className={ classes.headerLink }>Login</Link></Button>
                                <Button><Link to="/signup" className={ classes.headerLink }>Sign Up</Link></Button>
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
                                <List disableTopography className={classes.drawerList}>
                                    <ListItem>
                                        <div className={classes.media} style={{backgroundImage: `url("${user.avatar}")`}}></div>
                                    </ListItem>
                                    <ListItem style={{fontSize: '1.5em', fontWeight: 'bold'}}>{user.name}</ListItem>
                                    {routes.map((text, index) => (
                                        <Fragment key={text}>
                                            <ListItem button className={classes.routes}>
                                                {token ?
                                                    <Link to={`/${text.replace(/ /g,'-').toLowerCase()}`} className={ classes.drawerLink }>
                                                        <ListItemText primary={text} />
                                                    </Link>
                                                    : <Redirect to='/' />
                                               }
                                           </ListItem>
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
