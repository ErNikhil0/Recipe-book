const Footer = () => {
  return (
    <footer className="bg-dark text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} RecipeBook - Created for Wobot Intelligence</p>
        <p className="mt-2 text-sm text-gray-400">
          Data provided by Spoonacular API
        </p>
      </div>
    </footer>
  );
};

export default Footer;