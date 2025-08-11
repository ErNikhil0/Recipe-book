import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

// Mock data for when API fails
const mockRecipes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
    diets: ["vegetarian"],
    readyInMinutes: 30,
    servings: 4
  },
  {
    id: 2,
    title: "Creamy Tomato Soup",
    image: "https://spoonacular.com/recipeImages/2-556x370.jpg",
    diets: ["vegetarian", "gluten free"],
    readyInMinutes: 25,
    servings: 2
  },
  
];

const mockRecipeDetails = {
  id: 1,
  title: "Classic Margherita Pizza",
  image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
  diets: ["vegetarian"],
  readyInMinutes: 30,
  servings: 4,
  summary: "<p>A classic pizza with tomato sauce, mozzarella, and basil</p>",
  extendedIngredients: [
    { original: "1 pizza dough" },
    { original: "1/2 cup tomato sauce" },
    { original: "1 cup mozzarella cheese" },
    { original: "Fresh basil leaves" }
  ],
  instructions: "<ol><li>Preheat oven to 475°F</li><li>Roll out dough</li><li>Add sauce and cheese</li><li>Bake for 12-15 minutes</li><li>Add basil before serving</li></ol>"
};

// Cache for categories
let cachedCategories = null;

const getMockRating = () => ({
  rating: (Math.random() * 2 + 3).toFixed(1), 
  ratingCount: Math.floor(Math.random() * 100) + 5 
});

export const fetchRecipes = async (number = 12) => {
  try {
    const response = await api.get('/random', {
      params: {
        number,
      },
    });
    return response.data.recipes.map(recipe => ({
      ...recipe,
      ...getMockRating()
    }));
  } catch (error) {
    console.warn('API failed, using mock recipes:', error);
    return mockRecipes.slice(0, number).map(recipe => ({
      ...recipe,
      ...getMockRating()
    }));
  }
};

export const fetchRecipeDetails = async (id) => {
  try {
    const response = await api.get(`/${id}/information`, {
      params: {
        includeNutrition: false,
      },
    });
    return {
      ...response.data,
      ...getMockRating()
    };
  } catch (error) {
    console.warn('API failed, using mock recipe details:', error);
    return {
      ...mockRecipeDetails,
      id, // Use the requested ID
      ...getMockRating()
    };
  }
};

export const searchRecipes = async (query, categories = []) => {
  try {
    const response = await api.get('/complexSearch', {
      params: {
        query,
        number: 12,
        ...(categories.length > 0 && { tags: categories.join(',') }),
      },
    });
    return response.data.results.map(recipe => ({
      ...recipe,
      ...getMockRating()
    }));
  } catch (error) {
    console.warn('API failed, using mock search results:', error);
    // Simple mock filtering
    const filtered = mockRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase()) &&
      (categories.length === 0 || categories.some(cat => recipe.diets?.includes(cat)))
    );
    return filtered.map(recipe => ({
      ...recipe,
      ...getMockRating()
    }));
  }
};

export const fetchCategories = async () => {
  if (cachedCategories) return cachedCategories;
  
  try {
    
    const categories = [
      'main course',
      'dessert',
      'appetizer',
      'salad',
      'bread',
      'breakfast',
      'soup',
      'beverage',
      'sauce',
      'marinade',
      'fingerfood',
      'snack',
      'drink'
    ];
    cachedCategories = categories;
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [
      'main course',
      'dessert',
      'appetizer'
    ]; 
  }
};


export const addRating = async (recipeId, value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Rating ${value} added for recipe ${recipeId}`);
      resolve({ success: true });
    }, 500);
  });

};

