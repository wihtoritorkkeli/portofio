import { Container, Typography, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { useState } from "react";
import './drinks.css';

function Selection(props){
    let [selected, setSelected] = useState("");

    //This async function handles requesting new drink categories to show on the page:
    const requestNew = async(end, e) =>{
        const result = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+end);
        result.json().then(data => {
            props.listDrinks(data.drinks);
            props.selectDrink();
        });
    };

    const handleChange = (category) => {
        setSelected(category);
    };

    return(
        <Container className="textIn selection">
                <Typography variant="h5" className="formText h6">Choose your drink category here:</Typography>
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
                                onClick={(e)=>{
                                    handleChange(category.strCategory); 
                                    requestNew(category.strCategory, e);
                                }}
                                className="menu-item"
                                >{category.strCategory}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
                <Typography variant="p" className="formText">Select your favourite drink category to explore some yummy drink options and recipes.</Typography>
        </Container>
    );
};

export default Selection;