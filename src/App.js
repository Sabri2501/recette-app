import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const APP_ID = 'a0c38c55';
const APP_KEY = '2aa00c3874bf9593f1edc2c1e0bcaf56';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('calories');

  const fetchRecipes = async () => {
    if (!search) return;

    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        const fetchedRecipes = data.hits.map((hit) => hit.recipe);
        setRecipes(sortRecipes(fetchedRecipes, sortBy)); // Sort when fetching recipes
        setError('');
      } else {
        setRecipes([]);
        setError('No recipes found. Try another keyword.');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
    }
  };

  const sortRecipes = (recipes, sortBy) => {
    // Return a new sorted array to avoid modifying the original
    return [...recipes].sort((a, b) => {
      if (sortBy === 'calories') {
        return a.calories - b.calories;
      } else if (sortBy === 'time') {
        return a.totalTime - b.totalTime || 0; // Fallback for missing values
      }
      return 0;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setRecipes((prevRecipes) => sortRecipes(prevRecipes, e.target.value)); // Sort existing recipes
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold">Recipe Finder</h1>
        <p className="mt-2 text-sm">Discover delicious recipes at your fingertips!</p>
      </header>

      <main className="p-4">
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a recipe..."
            className="p-3 rounded-lg shadow-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Search
          </button>
        </form>

        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        <div className="flex justify-center items-center mt-6">
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            onChange={handleSortChange}
            className="p-2 rounded-md shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
          >
            <option value="calories">Calories</option>
            <option value="time">Preparation Time</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
  {recipes.map((recipe, index) => (
    <RecipeCard key={index} recipe={recipe} />
  ))}
</div>

      </main>
    </div>
  );
};





// function App() {
//   return (
//     <div className="min-h-screen bg-blue-500 flex items-center justify-center">
//       <h1 className="text-white text-3xl">Hello, Tailwind CSS!</h1>
//     </div>
//   );
// }



export default App;
