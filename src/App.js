// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import Table from './Table';

function App() {
  const [grants, setGrants] = useState([]);
  const [filteredGrants, setFilteredGrants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("");

  const attributes = [
    "InstCountry",
    "InstState",
    "InstCity",
    "Institution",
    "ProjectTitle",
    "ApprovedMatching",
    "BeginGrant",
    "EndGrant"
  ];

  useEffect(() => {
    async function fetchGrants() {
        const url = "/NEH2020sGrant_Short.json";
        const response = await fetch(url);
        if(response.ok){          
          const result = await response.json();
          setGrants(result.Grants.Grant);
          setFilteredGrants(result.Grants.Grant);
        }
    };
    fetchGrants();
  }, []);

  function handleSubmit(event){
    event.preventDefault()
    if(searchField === ""){
      return;
    }

    const results = grants.filter((grant) => (
      grant[searchField].includes(searchTerm)
    ))

    setFilteredGrants(results);
  }


  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      <header>
        <h1>NEH 2020's Grants</h1>
      </header>
      <main>
            {/* <h2>Filters</h2> */}
            <form onSubmit={handleSubmit}>
              <label for="searchTerm">Search for</label>
              <input type='text' id='searchTerm' name='searchTerm' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required/>
              <label for='searchField'>in field</label>
              <select id='searchField' name='searchField' value={searchField} onChange={(e) => setSearchField(e.target.value)} required>
                <option value="" autoFocus>Select a field</option>
                {attributes.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
              <button type='submit'>Submit</button>
            </form>
            <Table grants={filteredGrants} attributes={attributes} />
      </main>
    </div>
  );
}

export default App;
