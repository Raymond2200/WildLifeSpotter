import { useRef } from 'react';
import Button from '@material-ui/core/Button';
import SpotForm from './SpotForm/SpotForm'

function AddSpot(props) {
    let spotRef = useRef();


    let openModal = () => {
        spotRef.current.openSpotForm()
    }

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
                <Button 
                    onClick={openModal} 
                    variant="contained"
                    disabled
                    className="Button"
                >
                    Add Spot
                </Button>
            )}
            <SpotForm ref={spotRef} lng={props.lng} lat={props.lat} setSpotteds={props.setSpotteds}/>
        </div>
    )
}



export default AddSpot;