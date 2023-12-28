import React from "react";
import {
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  ClockIcon,
} from "@heroicons/react/outline";

const FeatureCard: React.FC<{
  title: string;
  description: string;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}> = ({ title, description, Icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 m-4 shadow-lg">
      <Icon className="h-10 w-10 mb-4 text-blue-500" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-10">Why InterviewAI?</h2>
      <div className="flex flex-col md:flex-row justify-center items-stretch">
        <FeatureCard
          title="The industry’s most complete platform"
          description="InterviewAI prepares you for every possible type of interview questions. Prepare for success in every phase of the loop, from coding interviews, to design interviews, and beyond."
          Icon={AcademicCapIcon}
        />
        <FeatureCard
          title="Master in-demand tech skills - by devs, for devs"
          description="InterviewAI is more than just an interview preparation platform — it is the best place to receive instantaneous feedback with in-demand tech skills."
          Icon={ChartBarIcon}
        />
        <FeatureCard
          title="Timed mock interviews"
          description="Join 2M developers with hands-on interview practice and comprehensive, advanced AI feedback, faster than traditional study methods."
          Icon={ClockIcon}
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
