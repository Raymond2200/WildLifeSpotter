import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      color: '#0b3939',
      backgroundColor: 'white',
    },
  });

const theme = createMuiTheme({
    overrides: {
        MuiTouchRipple: {
            child: {
                backgroundColor: '#000'
            }
        }
    }
});

function ToggleView(props) {
    const [toggle, setToggle] = React.useState(true)
    const classes = useStyles();

    const handleClick = () => {
        if(toggle === true) {
            setToggle(false)
            props.setListView(toggle)
        } else {
            setToggle(true)
            props.setListView(toggle)
        }
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button 
                    classes={{
                        root: classes.root,
                    }}
                    variant="contained"
                    onClick={() => { 
                        handleClick() }}>
                        Toggle View
                </Button>
            </ThemeProvider>
        </div>
    )
}


export default ToggleView;