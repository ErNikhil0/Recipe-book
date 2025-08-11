const CategoryFilter = ({ categories, selectedCategories, onToggleCategory }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-8">
      <h3 className="text-white font-semibold mb-3 text-center md:text-left">Filter by Category</h3>
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onToggleCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategories.includes(category)
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;