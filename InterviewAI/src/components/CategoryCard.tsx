import React from "react";

interface CategoryCardProps {
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg">{title}</h3>
      {/* Add other elements such as icons or buttons */}
    </div>
  );
};

export default CategoryCard;
