import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import Table from './Table';

function App() {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    async function fetchGrants() {
        const url = "/NEH2020sGrant_Short.json";
        const response = await fetch(url);
        if(response.ok){
          console.log("response ok");
          
          const result = await response.json();
          console.log(result);

          setGrants(result.Grants.Grant);
          console.log(grants);
        }
    };
    fetchGrants();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
            <Table grants={grants} />
      </main>
    </div>
  );
}

export default App;
