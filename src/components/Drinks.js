import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import './drinks.css';

function Drinks(props){
    let [selected, setSelected] = useState("Ordinary Drink");
    let [drinks, setDrinks] = useState([]);

    const requestNew = async(end) =>{
        const result = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+end);
        result.json().then(data => {
            setDrinks(data.drinks);
        });
    };

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
                            <ImageListItem key={drink.strDrink}>
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
                            <ImageListItem key={drink.strDrink}>
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