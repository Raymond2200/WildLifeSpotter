import {useState, forwardRef, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import './SpotForm.css';
 
let SpotForm = forwardRef((props, ref) => {
    
    let [display, setDisplay] = useState(false);
    let [category, setCategory] = useState("moose");
    let [comment, setComment] = useState("");

    let handleComment = (e) => {
        setComment(e.target.value)
    }

    let handleCategory = (e) => {
        setCategory(e.target.value)
    }
    
    // forward ref that allows addspot button to activate function
    useImperativeHandle(ref, () => {
        return {
            openSpotForm: () => open(),
            closeSpotForm: () => close()
        }
    })

    // submit new spot secure
    let handleSubmit = async (evt) => {
        let jwt = localStorage.getItem('token')
        try {
            const fetchResponse = await fetch('/api/spotteds/new', {
                method: 'POST',
                headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
                body: JSON.stringify({
                    animalType: category, 
                    location:[props.lng, props.lat],
                    description: comment
                })
            })
            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
            props.loadSpots()
        } catch (err) {
            console.log("error", err);
        }
    }

    let open = () => {
        setDisplay(true)
    }

    let close = () => {
        setDisplay(false)
    }

    if (display) {
        return(
                <div className={"modal-wrapper"}>
                    <div onClick={close} className={"modal-backdrop"}/>
                    <div className={"modal-box"}>
                        <div className={"exit"}/>
                        <h1>What did you see?</h1>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Animal</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={category}
                                onChange={handleCategory}
                            >
                                <MenuItem value={"Moose"}>Moose</MenuItem>
                                <MenuItem value={"Bear"}>Bear</MenuItem>
                                <MenuItem value={"Deer"}>Deer</MenuItem>
                                <MenuItem value={"Cougar"}>Mountain Cat</MenuItem>
                                <MenuItem value={"Wolf"}>Wolf/Coyote</MenuItem>
                                <MenuItem value={"Skunk"}>Skunk</MenuItem>
                            </Select>
                            <FormHelperText>Type of Animal</FormHelperText>
                        </FormControl>
                        <InputLabel >Comments</InputLabel>
                        <Input onChange={handleComment}/>
                        <Button onClick={ () => {
                            close();
                            handleSubmit()
                        }}>Submit</Button>
                    </div>
                </div>
        )
    }
    return null
})

export default SpotForm