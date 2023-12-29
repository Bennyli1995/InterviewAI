import React from "react";

interface CategoryCardProps {
  title: string;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  Icon,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-lg m-2 cursor-pointer"
      onClick={onClick}
    >
      <Icon className="h-12 w-12 mb-2 text-purple-500" />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
  );
};

export default CategoryCard;
