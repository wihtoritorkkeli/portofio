import './App.css';
import Start from './components/Start';
import Switcher from './components/Switcher';
import { useEffect, useState } from 'react';

function App() {
  let [showStart, setShowStart] = useState(true);

  const hideStart = () =>{
    setShowStart(false);
  };

  return (
    <div className="App">
      {showStart? <Start hideStart={hideStart}/> : <Switcher />}
    </div>
  );
}

export default App;
