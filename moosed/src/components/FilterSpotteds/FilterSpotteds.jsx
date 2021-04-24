import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function FilterSpotteds() {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (evnt) => {
        setAnchorEl(evnt.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Button 
                variant="contained"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                Filter
            </Button>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                transformOrigin={{ horizontal: 50 }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Archived Sightings</MenuItem>
                <MenuItem onClick={handleClose}>My Sightings</MenuItem>
                <MenuItem onClick={handleClose}>Recent Sightings</MenuItem>
            </Menu>
        </div>
    )
}

export default FilterSpotteds;