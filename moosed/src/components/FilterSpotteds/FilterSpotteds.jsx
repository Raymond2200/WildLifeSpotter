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
    const archivedSpots = async () => {
        handleClose()
        await fetch("/api/spotteds/archived")
            .then((res) => res.json())
            .then(data => console.log(data))
    }
    const mySpots = async () => {
        handleClose()
        await fetch("/api/spotteds/myspots")
            .then((res) => res.json())
            .then(data => console.log(data))
    }
    const recentSpots = async () => {
        handleClose()
        await fetch("/api/spotteds/me")
            .then((res) => res.json())
            .then(data => console.log(data))
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
                transformOrigin={{ horizontal: 50, vertical: 0 }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={archivedSpots}>Archived Sightings</MenuItem>
                <MenuItem onClick={mySpots}>My Sightings</MenuItem>
                <MenuItem onClick={recentSpots}>Recent Sightings</MenuItem>
            </Menu>
        </div>
    )
}

export default FilterSpotteds;