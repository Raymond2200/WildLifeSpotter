import { Component } from 'react';
import Button from '@material-ui/core/Button';

function ToggleView () {
    return (
        <div>
            <Button variant="contained"
            to="/list">Toggle View</Button>
        </div>
    )
}


export default ToggleView;