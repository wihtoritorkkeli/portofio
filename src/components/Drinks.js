import { Typography, Grid, FormControl, InputLabel, Select } from "@mui/material";
import { Container } from "@mui/system";
import './drinks.css';

function Drinks(props){
    
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
                            >

                            </Select>
                        </FormControl>
                    </form>
                </Grid>
                <Grid item xs={12} md={12} lg={8} className="grid-item">
                    <Typography variant="h6">Here are some drink suggestions:</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Drinks;