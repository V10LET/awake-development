import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setDrawer } from '../actions/designAction'
import { withStyles, createStyles } from '@material-ui/core/styles'

import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
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
       backgroundColor: 'white',
       backgroundColor: '#B05813',
       zIndex: theme.zIndex.appBar - 1,
   },
   name: {
       fontSize: 25,
       fontWeight: 700,
   },
   logout: {
       backgroundColor: 'white',
   },
   routes: {
       paddingLeft: 40,
   },
   media: {
       borderRadius: '100%',
       width: 100,
       height: 100,
       margin: '0 0 10px 20px',
       backgroundSize: 'cover',
       boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
   },
   appbar: {
       backgroundColor: '#138FB0',
   },
   MenuIcon: {
       color: 'black',
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
                    <Toolbar variant="dense">
                        <IconButton variant="contained" className={classes.MenuIcon} aria-label="Menu">
                            { token ? <MenuIcon onClick={ this.handleClick }/> : null }
                        </IconButton>
                        {/*<img src={require('../style/images/awake.png')} alt='nav-logo' className='nav-logo'/>*/}
                        <div style={{width: '100%', textAlign: 'right'}}>
                        { token ?
                            <Link to="/logout" className={ classes.headerLink }>Logout</Link>
                            :
                            <div>
                                <Link to="/login" className={ classes.headerLink }>Login</Link>
                                <Link to="/signup" className={ classes.headerLink }>Sign Up</Link>
                            </div>
                        }
                        </div>
                    </Toolbar>

                </AppBar>

                { token ?
                    <Fragment>
                        <Drawer variant="persistent" open={drawerOpen} anchor="left" classes={{ paper: classes.drawer }}>
                            <div style={{ paddingTop: 80 }}></div>
                             <List>
                                 <ListItem><div className={classes.media} style={{backgroundImage: `url("${user.avatar}")`}}></div></ListItem>
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
