import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import Selection from "./Selection";
import Drinks from "./Drinks";

function Switcher(){
    let [selectClass, setSelectClass] = useState("textIn");
    let [drinkSelected, setDrinkSelected] = useState(false);
    let [categories, setCategories] = useState([]);
    let [drinks, setDrinks] = useState([]);

    const selectDrink = () => {
        console.log(selectClass);
        if(selectClass === "textIn"){
            document.getElementById("selection").classList.remove("textIn");
            document.getElementById("selection").classList.add("textOut");
        }
        else{
            document.getElementById("selection").classList.remove("resetIn");
            document.getElementById("selection").classList.add("textOut");
        }
        setTimeout(function(){setDrinkSelected(true); setSelectClass("resetIn");}, 800);
        console.log(document.getElementById("selection").classList);
    };

    const unselectDrink = () => {
        document.getElementById("drinklist").classList.remove("textIn");
        document.getElementById("drinklist").classList.add("resetOut");
        setTimeout(function(){setDrinkSelected(false)}, 1500);
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
            <Drinks drinks={drinks} unselectDrink={unselectDrink}/>:
            <Selection categories={categories} selectDrink={selectDrink} listDrinks={listDrinks} selectClass={selectClass}/>
            }
        </Container>
    );
};

export default Switcher;