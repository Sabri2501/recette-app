import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      {/* Image with proper size constraints */}
      <div className="w-full h-48">
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-xl text-gray-800 truncate">{recipe.label}</h2>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Calories:</strong> {Math.round(recipe.calories)} kcal
        </p>
        {recipe.totalTime > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            <strong>Preparation Time:</strong> {recipe.totalTime} min
          </p>
        )}
        <div className="mt-4">
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm font-medium"
          >
            View Full Recipe →
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;