import { useState } from 'react';
import './App.css';

export const replaceCamelWithSpaces = (string) => {
  return string.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {

  const [isRed, setIsRed] = useState(true);
  const [val, setVal] = useState(false);

  return (
    <div>
      <button
        style={{backgroundColor: val ? 'gray' : isRed ? 'red': 'blue'}}
        onClick={() => setIsRed(isRed => !isRed)}
        disabled={val}
      >
        {isRed? "Change to blue": "Change to red"}
      </button>
      <input
        type='checkbox'
        checked={val}
        onClick={() => setVal(val => !val)}
        id='checkbox-disable'
      />
      <label htmlFor='checkbox-disable'>Disable</label>
    </div>
  );
}

export default App;
