import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import './drinks.css';

function Drinks(props){
    let [selected, setSelected] = useState("Ordinary Drink");
    let [viewing, setViewing] = useState({})
    let [drinks, setDrinks] = useState([]);

    //This async function handles requesting new drink categories to show on the page:
    const requestNew = async(end) =>{
        const result = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+end);
        result.json().then(data => {
            setDrinks(data.drinks);
        });
    };

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

    //this handles the first initail drink category request so that the page wouldnt start empty...
    useEffect(()=>{requestNew(selected);},[selected]);

    const handleChange = (category) => {
        setSelected(category);
    };


    return(
        <Container className="textIn drinkContainer" maxWidth="false">
            <Grid container  spacing={1} alignItems="center">
                <Grid item xs={12} md={3} lg={3} spacing={1} className="grid-item modify" alignItems="center">
                    <Typography variant="h6" className="formText h6">Choose your drink category here:</Typography>
                    <form className="form">
                        <FormControl variant="outlined" className="formi">
                            <InputLabel id="select-drink-category">Drink category</InputLabel>
                            <Select
                                labelId="select-drink-category"
                                id="drink-category"
                                label="Drink category"
                                className="select-drink-category"
                                variant="outlined"
                                value={selected}
                            >
                                {props.categories.map((category) => (
                                    <MenuItem
                                    value={category.strCategory} 
                                    key={category.strCategory} 
                                    onClick={()=>{handleChange(category.strCategory); requestNew(category.strCategory)}}
                                    className="menu-item"
                                    >{category.strCategory}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                    <Typography variant="p" className="formText">Select your favourite drink category to explore some yummy drink options and recipes.</Typography>
                </Grid>
                <Grid item xs={12} md={9} lg={9} spacing={1} className="grid-item-2 hideOnMobile">
                    <Typography variant="h6" className="taa">Suggestions:</Typography>
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
                </Grid>
                <Grid item xs={12} md={8} lg={9} spacing={1} className="grid-item-2 hideOnDesktop">
                    <Typography variant="h6" className="taa">Suggestions:</Typography>
                    <ImageList cols={2}>
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
                </Grid>
            </Grid>
        </Container>
    );
}

export default Drinks;