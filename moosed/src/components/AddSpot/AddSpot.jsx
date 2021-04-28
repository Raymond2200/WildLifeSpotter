import { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import SpotForm from './SpotForm/SpotForm'
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


function AddSpot(props) {
    let spotRef = useRef();
    const [open, setOpen] = useState(false);


    let openModal = () => {
        spotRef.current.openSpotForm()
    }
    const handleTooltipClose = () => {
        setOpen(false);
      };
    
    const handleTooltipOpen = () => {
    setOpen(true);
    };

    const handleClickAway = () => {
    setOpen(false);
    };

    return (
        <div>
            {props.user ? (
                <Button 
                    onClick={openModal} 
                    variant="contained"
                >
                    Add Spot
                </Button>
            ): (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Tooltip 
                    PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        
                        title="Please login!" 
                        arrow
                    >
                    <div onClick={handleTooltipOpen}>    
                        <Button 
                            disabled
                            onClick={openModal} 
                            variant="contained"
                        >
                            Add Spot
                        </Button>
                    </div>
                    </Tooltip>
                </ClickAwayListener>
            )}
            <SpotForm ref={spotRef} lng={props.lng} lat={props.lat} setSpotteds={props.setSpotteds} loadSpots={props.loadSpots}/>
        </div>
    )
}



export default AddSpot;