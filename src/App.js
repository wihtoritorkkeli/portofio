import './App.css';
import Start from './components/Start';
import Drinks from './components/Drinks';
import { Button, Typography } from '@mui/material/';
import { useEffect, useState } from 'react';

function App() {
  let [showStart, setShowStart] = useState(true);
  
  const hideStart = () =>{
    setShowStart(false);
  };

  return (
    <div className="App">
      {showStart? <Start hideStart={hideStart}/> : null}
      {showStart? null: <Drinks/>}
    </div>
  );
}

export default App;
