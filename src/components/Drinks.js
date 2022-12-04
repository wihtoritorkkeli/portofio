import { Typography, ImageList, ImageListItem, ImageListItemBar, IconButton, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import Popup from "reactjs-popup";
import './drinks.css';


function Drinks(props){
    let [viewing, setViewing] = useState({})
    let [drinkSelected, setDrinkSelected] = useState(false);
    let [drinks, setDrinks] = useState(props.drinks);
    let [open, setOpen] = useState(false);
    const closeModal = () => {setOpen(false)};


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
                else if (key.includes("strMeasure") && value !== null){
                    if(value !== ""){
                        measures.push(value);
                    }
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
            setDrinkSelected(true);
        });
    };

    useEffect(()=>{setDrinks(props.drinks)},[props.drinks])

    return(
        <Container className="textIn drinkContainer" maxWidth="false" id="drinklist">
            {drinkSelected?
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <Container className="modal" maxWidth="sm">
                    <CloseIcon className="close" onClick={closeModal} color="success" fontSize="large"/>
                    <div className="imageCenter">
                        <img src={`${viewing.img}`} alt={viewing.drink} className="pImg"/>
                    </div>
                    <Typography variant="h5" className="pHeader green">{viewing.drink}</Typography>
                    <Typography variant="h6" className="green">ingredients:</Typography>
                    {viewing.ingredients.map((i)=>(<Typography variant="p">{i}<br/></Typography>))}
                    <Typography variant="h6" className="green">instructions:</Typography>
                    <Typography variant="p" className="pInstuctions">{viewing.instructions}</Typography>
                </Container>
            </Popup>:
            null
            }
            <div className="image-list hideOnMobile">
                <div className="taa">
                    <Typography variant="h6">Suggestions:</Typography>
                    <Button variant="contained" color="warning" onClick={()=>{props.unselectDrink()}}>New Search</Button>
                </div>
                <ImageList cols={4}>
                    {drinks.map((drink)=>(
                        <ImageListItem key={drink.strDrink} onClick={()=>{requestDrink(drink.strDrink); setTimeout(function(){setOpen(true);}, 150)}}>
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
                <Button variant="contained" color="warning" onClick={()=>{props.unselectDrink()}}>New Search</Button>
            </div>
                <ImageList cols={1}>
                    {drinks.map((drink)=>(
                        <ImageListItem key={drink.strDrink} onClick={()=>{requestDrink(drink.strDrink); setTimeout(function(){setOpen(true);}, 150);}}>
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