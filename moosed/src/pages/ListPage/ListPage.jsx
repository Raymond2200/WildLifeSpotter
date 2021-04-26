import {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import { ListItemText } from '@material-ui/core';

function ListView(props) {
    let [spots, setSpots] = useState()
    useEffect(() => {
    })
    
    let recentSpots = async () => {
        await fetch("/api/spotteds/recentspots")
            .then((res) => res.json())
            .then(data => console.log(data))
    }

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