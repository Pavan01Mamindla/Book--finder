// App.js
import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    if (!query) return;
    const res = await fetch(
      `https://openlibrary.org/search.json?title=${query}`
    );
    const data = await res.json();
    setBooks(data.docs.slice(0, 10)); // top 10 results
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Navbar */}
      <header className="bg-[#d6cfb4] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">
          📚 OpenBook Finder
        </h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 rounded-l-md border border-gray-400 w-64"
          />
          <button
            onClick={fetchBooks}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="p-6 bg-white shadow-md m-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Welcome to Book Finder</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="border p-4 rounded shadow-sm bg-[#fafafa]">
            <h3 className="font-bold">📖 Read Free Books</h3>
            <p className="text-sm text-gray-600">
              Millions of free books available to read online
            </p>
          </div>
          <div className="border p-4 rounded shadow-sm bg-[#fafafa]">
            <h3 className="font-bold">📅 Reading Goals</h3>
            <p className="text-sm text-gray-600">
              Set your yearly reading goals and track progress
            </p>
          </div>
          <div className="border p-4 rounded shadow-sm bg-[#fafafa]">
            <h3 className="font-bold">📌 Favorites</h3>
            <p className="text-sm text-gray-600">
              Save and organize your favorite books
            </p>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="p-6">
        <h2 className="text-lg font-semibold mb-4">Search Results</h2>
        {books.length === 0 ? (
          <p className="text-gray-600">No books yet. Try searching above.</p>
        ) : (
          <div className="grid md:grid-cols-5 gap-4">
            {books.map((book, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center"
              >
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : "https://via.placeholder.com/150x200?text=No+Cover"
                  }
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded"
                />
                <h3 className="mt-2 text-sm font-bold text-center">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {book.author_name ? book.author_name[0] : "Unknown Author"}
                </p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Locate
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
