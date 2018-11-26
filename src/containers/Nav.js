import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setDrawer } from '../actions/designAction'

// material ui
import { withStyles, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'

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
       width: 200,
       backgroundColor: '#efebe9',
       zIndex: theme.zIndex.appBar - 1,
   },
   name: {
       fontSize: 25,
       fontWeight: 700,
   },
})


class Nav extends Component {

    handleClick = () => {
        this.props.setDrawer(!this.props.drawerOpen)
    }

    render () {
        const { drawerOpen, token, user, classes } = this.props
        return (

            <div >
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" aria-label="Menu">
                            { token ? <MenuIcon onClick={ this.handleClick }/> : null }
                        </IconButton>
                        {token ? null : <img src={require('../style/images/awake.png')} alt='nav-logo' className='nav-logo'/>}
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
                        <Drawer variant="persistent" open={drawerOpen} anchor="left" classes={{ paper: classes.drawer }}>
                            <div style={{ paddingTop: 60 }}></div>
                             <List>
                                 <ListItem style={{justifyContent: 'center'}}><img src={require('../style/images/awake.png')} alt='nav-logo' className='nav-logo'/></ListItem>
                                 <ListItem className={classes.name}>{user.name}</ListItem>
                                 {['Profile', 'New Log'].map((text, index) => (
                                     <ListItem button key={text}>
                                         <Link to={`/${text.replace(/ /g,'-').toLowerCase()}`} className={ classes.drawerLink }>
                                             <ListItemText primary={text} />
                                             <Divider/>
                                         </Link>
                                    </ListItem>
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
