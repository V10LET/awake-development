import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setDrawer } from '../actions/designAction'
import sidebarExtraFaded from '../style/images/sidebarExtraFaded.png'

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
       color: 'black',
       textDecoration: 'none',
       // fontWeight: 'bold',
       },
   drawerLink: {
       color: 'black',
       textDecoration: 'none',
       // fontWeight: 'bold',
       marginBottom: 5,
   },
   drawer: {
       width: 200,
       backgroundColor: 'white',
       // backgroundColor: '#212121',
       // backgroundImage: `url(${sidebarExtraFaded})`,
       color: 'white',
       zIndex: theme.zIndex.appBar - 1,
   },
   name: {
       fontSize: 25,
       fontWeight: 700,
   },
   logout: {
       backgroundColor: 'white',
   },
   media: {
       borderRadius: '100%',
       width: 80,
       height: 80,
       margin: '0 0 30px',
       backgroundSize: 'cover',
       boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)'
   },
   appbar: {
       backgroundColor: 'white',
   },
   MenuIcon: {
       color: 'black',
   }
})


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
                            <Button variant="contained" className={classes.logout}><Link to="/logout" className={ classes.headerLink }>Logout</Link></Button>
                            :
                            <div>
                                <Link to="/login" className={ classes.headerLink }>Login</Link>
                                <Button size='small' style={{ backgroundColor: 'white' }}><Link to="/signup" className={ classes.headerLink }>Sign Up</Link></Button>
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
                                 <ListItem style={{justifyContent: 'center'}}><div className={classes.media} style={{backgroundImage: `url("${user.avatar}")`}}></div></ListItem>
                                 {/*<ListItem className={classes.name}>{user.name}</ListItem>*/}
                                 {['Profile', 'New Log'].map((text, index) => (
                                     <Fragment>
                                         <ListItem button key={text} className={classes.routes}>
                                             <Link to={`/${text.replace(/ /g,'-').toLowerCase()}`} className={ classes.drawerLink }>
                                                 <ListItemText disableTypography primary={text} />
                                                 <Divider style={{ margin: '10px 0px 0px', backgroundColor: 'black' }}/>
                                             </Link>
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
