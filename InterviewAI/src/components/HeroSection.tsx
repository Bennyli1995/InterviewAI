import React from "react";
import CategoryCard from "./CategoryCard";
import {
  ChatIcon,
  PuzzleIcon,
  CogIcon,
  ClockIcon,
} from "@heroicons/react/outline";

const HeroSection: React.FC<{ setCurrentState: (state: string) => void }> = ({
  setCurrentState,
}) => {
  const handleCardClick = () => {
    setCurrentState("start");
  };

  return (
    <div className="bg-purple-600 text-white text-center py-28">
      <h1 className="text-4xl font-bold mb-6">Crack every type of interview</h1>
      <p className="mb-8">What do you want to crack first?</p>
      <div className="flex justify-center gap-4">
        <CategoryCard
          title="Behavioral Interviews"
          Icon={ChatIcon}
          onClick={handleCardClick}
        />
        <CategoryCard
          title="Algorithms Interviews"
          Icon={PuzzleIcon}
          onClick={handleCardClick}
        />
        <CategoryCard
          title="System Design Interviews"
          Icon={CogIcon}
          onClick={handleCardClick}
        />
        <CategoryCard
          title="Timed Mock Interviews"
          Icon={ClockIcon}
          onClick={handleCardClick}
        />
      </div>
    </div>
  );
};

export default HeroSection;
