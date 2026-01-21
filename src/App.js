// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import Table from './Table';

function App() {
  const [grants, setGrants] = useState([]);
  const [queriedGrants, setQueriedGrants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");


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

  let sortableAttributes = attributes;

  useEffect(() => {
    async function fetchGrants() {
        const url = "/NEH2020sGrant_Short.json";
        const response = await fetch(url);
        if(response.ok){          
          const result = await response.json();
          setGrants(result.Grants.Grant);
          setQueriedGrants(result.Grants.Grant);
          // getSortableAttributes(result.Grants.Grant);
        }
    };
    fetchGrants();
  }, []);

  function handleQuery(event){
    event.preventDefault()
    let result = [...grants]

    const hasFilter = !(searchField === "")
    if(hasFilter){
      result = result.filter((grant) => grant[searchField].toLowerCase().includes(searchTerm.toLowerCase()) )
    }

    function sortFunc(grant1, grant2) {
      const value1 = grant1[sortField]
      const value2 = grant2[sortField]
      if(typeof value1 === "string"){
        return (sortOrder === "ASC") ? value1.localeCompare(value2) : value2.localeCompare(value1)
      }else{
        return (sortOrder === "ASC") ? value1 - value2 : value2 - value1
      }
    }

    const hasSort = !(sortField === "")
    if(hasSort){
      result = result.sort(sortFunc)
    }

    setQueriedGrants(result)
  }

  function reset(){
    setSearchTerm("")
    setSearchField("")
    setSortField("")
    setQueriedGrants(grants)
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
        <h1>NEH 2020 Grants</h1>
      </header>
      <main>
            <form onSubmit={handleQuery}>
              <h2>Search Tools</h2>
              <fieldset>
                <label for="searchTerm">Search for</label>
                <input type='text' id='searchTerm' name='searchTerm' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <label for='searchField'>in</label>
                <select id='searchField' name='searchField' value={searchField} onChange={(e) => setSearchField(e.target.value)} >
                  <option value="" autoFocus>Select a field</option>
                  {attributes.map(attr => 
                    <option value={attr}>{attr}</option>
                  )}
                </select>
              </fieldset>
              <fieldset>
                <label for="sortField">Sort by</label>
                <select id="sortField" name='sortField' value={sortField} onChange={e => setSortField(e.target.value)} >
                  <option value="" autoFocus>Select a field</option>
                  {sortableAttributes.map(attr =>
                    <option value={attr}>{attr}</option>
                  )}
                </select>
                <select id="sortOrder" name='sortOrder' value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="ASC" selected>ASC</option>
                  <option value="DESC">DESC</option>
                </select>
                <button onClick={reset} className='reset'>Reset</button>
                <button type='submit' className='submit'>Submit</button>
              </fieldset>
            </form>
            <Table grants={queriedGrants} attributes={attributes} />
      </main>
    </div>
  );
}

export default App;
