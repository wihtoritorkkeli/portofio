import { Typography, ImageList, ImageListItem, ImageListItemBar, IconButton, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import './drinks.css';

function Drinks(props){
    let [viewing, setViewing] = useState({})
    let [drinks, setDrinks] = useState(props.drinks);


    //this async function handles requesting drink details from a drink chosen by the user...
    const requestDrink = async(end) => {
        const result = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+end);
        result.json().then(data => {
            let ingredients = [];
            let measures = [];

            //this iterates through the requested "Drink" -object and returns all valid ingredients and measurements...
            for (const [key, value] of Object.entries(data.drinks[0])){
                if (key.includes("strIngredient") && value !== null){
                    ingredients.push(value);    
                }
                else if (key.includes("strMeasure") && value != null){
                    measures.push(value);
                }
            }

            for (let i = 0; i < measures.length; i++){
                ingredients[i] = ingredients[i] + " " + measures[i];
            }

            setViewing({
                drink: data.drinks[0].strDrink, 
                img: data.drinks[0].strDrinkThumb,
                ingredients: ingredients,
                instructions: data.drinks[0].strInstructions
            });
        });
    };

    return(
        <Container className="textIn drinkContainer" maxWidth="false">
            <div className="image-list hideOnMobile">
                <div className="taa">
                    <Typography variant="h6">Suggestions:</Typography>
                    <Button variant="contained" color="success" onClick={()=>{props.selectDrink()}}>New Search</Button>
                </div>
                <ImageList cols={4}>
                    {drinks.map((drink)=>(
                        <ImageListItem key={drink.strDrink} onClick={()=>{requestDrink(drink.strDrink)}}>
                            <img src={`${drink.strDrinkThumb}`} className="drinkImg" alt={drink.strDrink}/>
                            <ImageListItemBar 
                                title={drink.strDrink}
                                actionIcon={
                                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${drink.strDrink}`}>
                                    <InfoIcon/>
                                </IconButton>
                            } 
                            className="drinkImg"/>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div className="image-list hideOnDesktop">
            <div className="taa">
                <Typography variant="h6">Suggestions:</Typography> 
                <Button variant="outlined" onClick={()=>{props.selectDrink()}}>New Search</Button>
            </div>
                <ImageList cols={1}>
                    {drinks.map((drink)=>(
                        <ImageListItem key={drink.strDrink} onClick={()=>{requestDrink(drink.strDrink);}}>
                            <img src={`${drink.strDrinkThumb}`} className="drinkImg" alt={drink.strDrink}/>
                            <ImageListItemBar 
                                title={drink.strDrink}
                                actionIcon={
                                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${drink.strDrink}`}>
                                    <InfoIcon/>
                                </IconButton>
                            } 
                            className="drinkImg"/>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </Container>
    );
}

export default Drinks;