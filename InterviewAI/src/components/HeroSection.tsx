import React from "react";
import {
  ChatIcon,
  CogIcon,
  ClockIcon,
  PuzzleIcon,
} from "@heroicons/react/outline";

interface CategoryCardProps {
  title: string;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-lg m-2">
      <Icon className="h-12 w-12 mb-2 text-purple-500" />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <div className="bg-purple-600 text-white text-center py-16">
      <h1 className="text-4xl font-bold mb-6">Crack every type of interview</h1>
      <p className="mb-8">What do you want to crack first?</p>
      <div className="flex justify-center gap-4">
        <CategoryCard title="Behavioral Interviews" Icon={ChatIcon} />
        <CategoryCard title="Algorithms Interviews" Icon={PuzzleIcon} />
        <CategoryCard title="System Design Interviews" Icon={CogIcon} />
        <CategoryCard title="Timed Mock Interviews" Icon={ClockIcon} />
      </div>
      <p className="text-purple-200 mt-8">
        Everything You Need to Get the Job... and Excel When You Get There
      </p>
      <button className="mt-4 bg-white text-purple-600 py-2 px-8 rounded-lg font-bold shadow-md hover:bg-purple-50 transition duration-300 ease-in-out">
        Get Educative Unlimited
      </button>
    </div>
  );
};

export default HeroSection;
