// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import Table from './Table';

function App() {
  const [grants, setGrants] = useState([]);
  const [filteredGrants, setFilteredGrants] = useState([]);
  const [sortedGrants, setSortedGrants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sortField, setSortField] = useState("");


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

  let sortableAttributes = [];

  useEffect(() => {
    async function fetchGrants() {
        const url = "/NEH2020sGrant_Short.json";
        const response = await fetch(url);
        if(response.ok){          
          const result = await response.json();
          setGrants(result.Grants.Grant);
          setFilteredGrants(result.Grants.Grant);
          setSortedGrants(result.Grants.Grant);
          getSortableAttributes(result.Grants.Grant);
        }
    };
    fetchGrants();
  }, []);

  
  function getSortableAttributes(grants){
    sortableAttributes = attributes
    return

    for (const attr of attributes) {
      console.log(`${attr} : ${grants[0][attr]} : ${typeof grants[0][attr]}`);
      
      if(typeof grants[0][attr] === "string"){
        sortableAttributes.push(attr)
      }
    }
    console.log(sortableAttributes);
  }

  function handleSearch(event){
    event.preventDefault()
    if(searchField === ""){
      return;
    }

    const results = grants.filter((grant) => (
      grant[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    ))

    setFilteredGrants(results);
  }

  function handleSort(event){
    event.preventDefault()
    if(sortField === ""){
      return;
    }
    
    let result = [...filteredGrants]
    result = result.sort((a, b) => a[sortField] - b[sortField])
    setSortedGrants(result)
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
            <form onSubmit={handleSearch}>
              <label for="searchTerm">Search for</label>
              <input type='text' id='searchTerm' name='searchTerm' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required/>
              <label for='searchField'>in field</label>
              <select id='searchField' name='searchField' value={searchField} onChange={(e) => setSearchField(e.target.value)} required>
                <option value="" autoFocus>Select a field</option>
                {attributes.map(attr => 
                  <option value={attr}>{attr}</option>
                )}
              </select>
              <button type='submit'>Search</button>
            </form>
            <form onSubmit={handleSort}>
              <label for="sortField">Sort by:</label>
              <select id="sortField" name='sortField' value={sortField} onChange={e => setSortField(e.target.value)} required>
                <option value="" autoFocus>Select a field</option>
                {sortableAttributes.map(attr =>
                  <option value={attr}>{attr}</option>
                )}
              </select>
              <button type='submit'>Sort</button>
            </form>
            <Table grants={sortedGrants} attributes={attributes} />
      </main>
    </div>
  );
}

export default App;
