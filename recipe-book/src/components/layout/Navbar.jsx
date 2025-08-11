import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-accent transition-colors">
          RecipeBook
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <a 
            href="https://spoonacular.com/food-api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            API Docs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;