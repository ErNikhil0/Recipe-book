import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeDetails } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipeDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipeDetails(id);
        setRecipe(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recipe details:', err);
        setError('Failed to load recipe details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getRecipeDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#4ca1af] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to recipes
            </Link>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="aspect-w-3 aspect-h-2 md:aspect-none">
                  <img
                    src={recipe.image || '/placeholder-food.jpg'}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className="p-6 md:p-8 md:w-1/2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{recipe.title}</h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {recipe.diets?.map((diet, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {diet}
                    </span>
                  ))}
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Summary</h2>
                  <div 
                    className="prose max-w-none text-gray-700" 
                    dangerouslySetInnerHTML={{ __html: recipe.summary }} 
                  />
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Ingredients</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recipe.extendedIngredients?.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 mr-2"></span>
                        <span className="text-gray-700">
                          {ingredient.original}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h2>
                  {recipe.instructions ? (
                    <div 
                      className="prose max-w-none text-gray-700" 
                      dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
                    />
                  ) : (
                    <p className="text-gray-600">No instructions available for this recipe.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;