import './App.css';
import Start from './components/Start';
import Drinks from './components/Drinks';
import { useEffect, useState } from 'react';

function App() {
  let [showStart, setShowStart] = useState(true);
  let [categories, setCategories] = useState([]);


  const hideStart = () =>{
    setShowStart(false);
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
    <div className="App">
      {showStart? <Start hideStart={hideStart}/> : null}
      {showStart? null: <Drinks categories={categories}/>}
    </div>
  );
}

export default App;
