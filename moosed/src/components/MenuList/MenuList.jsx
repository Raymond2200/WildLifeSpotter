import React from 'react';
import {Link} from 'react-router-dom';
import './MenuList.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { PromiseProvider } from 'mongoose';

//creates the css styles to be applied to menu on toggle
const useStyles = makeStyles({
    list: {
      width: 250,
    },
});

export default function MenuList(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left:false,
    })

//event listener, & updates state    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
    
//applies classes to the drawer, and gives it menu list items, and defines the link paths for each item
    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
        {props.userState ? (
            <div>
            <List>
                <ListItem button key="Profile">
                    <ListItemText primary={props.userState.username}/>
                </ListItem>
                <Divider />
                <ListItem 
                    button key="Logout"
                    component={Link}
                    to="/logout">
                        <ListItemText primary="Logout" />
                </ListItem>
            </List>
            </div>
        ) : (
            <List>
                <ListItem 
                    button key="Login-Signup"
                    component={Link}
                    to="/login-signup">
                        <ListItemText primary="Login-Signup" />
                </ListItem>
            </List>
        )
         }
        
    </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <div className="menu-icon" onClick={toggleDrawer('left', true)}>
                    <div className="menu-bar-one"></div>
                    <div className="menu-bar-two"></div>
                    <div className="menu-bar-three"></div>
                </div>
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    <div>
                        {list('left')}
                    </div>   
                </Drawer>
            </React.Fragment>
        </div>
    )
}