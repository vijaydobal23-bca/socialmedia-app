import { useState, useEffect } from "react";
import { useUser } from "../hook/useUser";
import Follow from "./Follow";
import "./search.scss";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { handleSearchUsers, loading } = useUser();

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (query.trim()) {
        try {
          const users = await handleSearchUsers(query);
          setResults(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        setResults([]);
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  return (
    <main className="search-page">
      <div className="search-container">
        <h2>Search Users</h2>
        <input
          type="text"
          placeholder="Search by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        
        {loading && <p className="status-text">Searching...</p>}
        
        <div className="search-results">
          {results.map((user) => (
            <div key={user._id} className="search-result-item">
              <div className="user-info">
                <img src={user.profileImage} alt={user.username} className="profile-img" />
                <span>{user.username}</span>
              </div>
              <Follow username={user.username} />
            </div>
          ))}
          {!loading && query && results.length === 0 && (
            <p className="status-text">No users found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Search;
