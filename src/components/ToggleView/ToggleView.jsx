import { Component } from 'react';
import Button from '@material-ui/core/Button';


class ToggleView extends Component {
    state = {
        toggle: true,
    }
    handleClick = () => {
        if(this.state.toggle === true) {
            this.setState({toggle: false})
            this.props.setListView(this.state.toggle)
        } else {
            this.setState({toggle: true})
            this.props.setListView(this.state.toggle)
        }
    }
    render() {
        return (
            <div>
                <Button 
                    variant="contained"
                    onClick={() => { 
                        this.handleClick() }}>
                        Toggle View
                </Button>
            </div>
        )
    }
}


export default ToggleView;