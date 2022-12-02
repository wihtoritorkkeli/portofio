import { Typography, Grid, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem, ListSubheader, ImageListItemBar } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import './drinks.css';

function Drinks(props){
    let [selected, setSelected] = useState("");
    let [drinks, setDrinks] = useState([]);
    
    let [categories, setCategories] = useState(props.categories);

    const requestNew = async(end) =>{
        const result = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+end);
        result.json().then(data => {
            console.log(data.drinks)
            setDrinks(data.drinks);
        });
    };

    const handleChange = (category) => {
        setSelected(category);
        console.log(selected);
    };


    return(
        <Container className="textIn drinkContainer" >
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={4} className="grid-item">
                    <Typography variant="h6">Choose your drink category here:</Typography>
                    <form>
                        <FormControl fullWidth>
                            <InputLabel id="select-drink-category">Drink category</InputLabel>
                            <Select
                                labelId="select-drink-category"
                                id="drink-category"
                                label="Drink category"
                                className="select-drink-category"
                                variant="outlined"
                                value={selected}
                            >
                                {categories.map((category) => (
                                    <MenuItem value={category.strCategory} key={category.strCategory} onClick={()=>{handleChange(category.strCategory); requestNew(category.strCategory)}}>{category.strCategory}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                </Grid>
                <Grid item xs={12} md={12} lg={8} className="grid-item">
                    <ImageList cols={5}>
                        <ImageListItem key="Subheader" cols={5}>
                            <ListSubheader component="div">Suggestions:</ListSubheader>
                        </ImageListItem>
                        {drinks.slice(0,10).map((drink)=>(
                            <ImageListItem key={drink.strDrink}>
                                <img src={`${drink.strDrinkThumb}`} width={50}/>
                                <ImageListItemBar title={drink.strDrink}/>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Drinks;