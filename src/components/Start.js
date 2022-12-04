import {Button, Typography, Container } from "@mui/material"

function Start(props){
    
    return(
        <Container className="start textIn">
            <Typography variant="h2" className="startText">Online Cocktail bar</Typography>
            <Typography variant="h5" className="startText">Continue to discover new cocktails</Typography><br/>
            <Button variant="contained" color="warning" onClick={e => {
                e.currentTarget.parentElement.classList.remove("textIn"); 
                e.currentTarget.parentElement.classList.add("textOut"); setTimeout(function(){props.hideStart()}, 800)}}>
                    Discover new cocktails
            </Button>
        </Container>
    );
}

export default Start;