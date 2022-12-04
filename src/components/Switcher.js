import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import Selection from "./Selection";
import Drinks from "./Drinks";

function Switcher(props){
    let [drinkSelected, setDrinkSelected] = useState(false);
    let [categories, setCategories] = useState([]);
    let [drinks, setDrinks] = useState([]);

    const selectDrink = () => {
        setDrinkSelected(!drinkSelected);
    };

    const listDrinks = (list) => {
        setDrinks(list);
    };

    const searchByName = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

    async function apiCall(url){
        const result = await fetch(url);
        result.json().then(data => {
            setCategories(data.drinks)
        })
    }

    useEffect(()=>{apiCall(searchByName);},[]);

    return (
        <Container maxWidth="false">
            {drinkSelected ?
            <Drinks drinks={drinks} selectDrink={selectDrink}/>:
            <Selection categories={categories} selectDrink={selectDrink} listDrinks={listDrinks}/>
            }
        </Container>
    );
};

export default Switcher;