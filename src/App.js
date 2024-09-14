import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './App.css';

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://mocki.io/v1/05f50733-bcc4-4b81-9b70-9e7cf2daa46f")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((data) => {
          return (
            value &&
            data &&
            data.country.toLowerCase().includes(value.toLowerCase()) || data.capital.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      });
  };
  

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};


const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`country: ${result.country} 
capital: ${result.capital} 
population: ${result.population}
currency: ${result.currency}
official_language: ${result.official_language}`)}
    >
      {result.country} - {result.capital}
    </div>
  );
};


const SearchResultsList = ({ results}) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};
export default App;
