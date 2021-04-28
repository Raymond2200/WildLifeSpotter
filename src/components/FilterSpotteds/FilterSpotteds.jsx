import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function FilterSpotteds(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)

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