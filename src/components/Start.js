import {Button, Typography, Container } from "@mui/material"

function Start(props){
    
    return(
        <Container className="start textIn">
            <Typography variant="h2" className="startText">Welcome to my online portfolio</Typography>
            <Typography variant="h5" className="startText">Choose how you want to interract with my page:</Typography><br/>
            <Button variant="contained" color="primary" onClick={e => {
                e.currentTarget.parentElement.classList.remove("textIn"); 
                e.currentTarget.parentElement.classList.add("textOut"); setTimeout(function(){props.hideStart()}, 800)}}>
                    Keep reading
            </Button>
        </Container>
    );
}

export default Start;