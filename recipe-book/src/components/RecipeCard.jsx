const RecipeCard = ({ recipe, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image || '/placeholder-recipe.jpg'}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg line-clamp-2">{recipe.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.diets?.slice(0, 3).map(diet => (
            <span key={diet} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
              {diet}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {recipe.summary?.replace(/<[^>]*>?/gm, '') || 'No description available.'}
        </p>
        <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors">
          View Recipe
        </button>
      </div>
    </div>
  );
};