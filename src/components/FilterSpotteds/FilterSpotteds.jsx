import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      color: '#0b3939',
      backgroundColor: 'white',
    },
  });

const theme = createMuiTheme({
    overrides: {
        MuiTouchRipple: {
            child: {
                backgroundColor: '#000'
            }
        }
    }
});

function FilterSpotteds(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const classes = useStyles();

    const handleClick = (evnt) => {
        setAnchorEl(evnt.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const filter = async (filt) => {
        handleClose()
        props.setFilter(filt,props.loadSpots)
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button 
                    classes={{
                        root: classes.root,
                    }}
                    variant="contained"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    Filter
                </Button>
            </ThemeProvider>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                transformOrigin={{ horizontal: 50, vertical: 0 }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {filter("archive")}} >Archived Sightings</MenuItem>
                {props.user ? (
                    <MenuItem onClick={() => {filter("my")}} >My Sightings</MenuItem>
                ) : (
                    <MenuItem 
                    onClick={() => {filter("my")}}
                        disabled
                        >
                            My Sightings
                    </MenuItem>
                )}
                <MenuItem onClick={() => {filter("recent")}}>Recent Sightings</MenuItem>
            </Menu>
        </div>
    )
}

export default FilterSpotteds;