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
            <Button onClick={openModal} variant="contained">Add Spot</Button>
            <SpotForm ref={spotRef} lng={props.lng} lat={props.lat}/>
        </div>
    )
}



export default AddSpot;