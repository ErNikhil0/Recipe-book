import { useState, useEffect } from 'react';
import { fetchRecipes, searchRecipes, fetchCategories } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import CategoryFilter from '../components/CategoryFilter';
import { FiSearch, FiX } from 'react-icons/fi';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [recipesData, categoriesData] = await Promise.all([
          fetchRecipes(),
          fetchCategories()
        ]);
        setRecipes(recipesData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && selectedCategories.length === 0) return;

    try {
      setLoading(true);
      const data = await searchRecipes(searchQuery, selectedCategories);
      setRecipes(data);
      setError(null);
    } catch (err) {
      console.error('Failed to search recipes:', err);
      setError('Failed to search recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    fetchRecipes().then(data => {
      setRecipes(data);
      setSelectedCategories([]);
    });
  };

  const retryFetch = async () => {
    try {
      setLoading(true);
      const data = await fetchRecipes();
      setRecipes(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setError('Failed to load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/90"></div>
        <img 
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
          alt="Food background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-7xl mx-auto">
          {/* Hero section  */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 font-serif tracking-tight">
              Culinary <span className="text-amber-400">Explorer</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover, create, and share exceptional recipes from around the world
            </p>
            
       
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative flex items-center mb-8">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for recipes, ingredients, or chefs..."
                  className="w-full px-6 py-5 rounded-full border-0 focus:ring-2 focus:ring-amber-400 text-lg shadow-xl bg-white/90 backdrop-blur-sm pr-16"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-20 text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full transition-colors shadow-lg"
                >
                  <FiSearch size={24} />
                </button>
              </div>

              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onToggleCategory={handleCategoryToggle}
              />
            </form>
          </div>

         
          <div className="relative">
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="large" />
              </div>
            ) : error ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto shadow-2xl">
                <ErrorMessage message={error} onRetry={retryFetch} />
              </div>
            ) : (
              <>
                {recipes.length === 0 ? (
                  <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No recipes found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                    <button
                      onClick={clearSearch}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-colors"
                    >
                      Show All Recipes
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-semibold text-white">
                        {searchQuery || selectedCategories.length > 0 
                          ? 'Search Results' 
                          : 'Featured Recipes'}
                      </h2>
                      <span className="text-gray-300">
                        {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {recipes.map((recipe) => (
                        <RecipeCard 
                          key={recipe.id} 
                          recipe={recipe} 
                          className="hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;
