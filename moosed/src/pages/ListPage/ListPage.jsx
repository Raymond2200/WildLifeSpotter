import {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import { ListItemText } from '@material-ui/core';

function ListView(props) {
    let [spots, setSpots] = useState()
    
    useEffect(async () => {
        console.log("I loaded")
        try{
            let fetchSpotsResponse = await fetch('/api/spotteds/me/-77.835251/45.910191')
            let inSpots = await fetchSpotsResponse.json()
            console.log(inSpots)
            setSpots(inSpots)
            console.log("test")
        } catch (err) {
            console.log('ERROR')
        }
    },[])

    return (
        <div>
            <List>
                {props.spotteds.map(spottedAnimal => (
                    <ListItemText 
                        primary={spottedAnimal.animalType} 
                        secondary={spottedAnimal.description} />
                ))}
            </List>
        </div>
    )
}



export default ListView;