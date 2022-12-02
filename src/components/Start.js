import {Button, Typography, Container } from "@mui/material"

function Start(){
    
    return(
        <Container className="start">
            <Typography variant="h2" className="startText textIn">Welcome to my online portfolio</Typography>
            <Typography variant="h5" className="startText textIn">Choose how you want to interract with my page:</Typography><br/>
            <Button variant="contained" color="primary" className="textIn">Keep reading</Button>
        </Container>
    );
}

export default Start;