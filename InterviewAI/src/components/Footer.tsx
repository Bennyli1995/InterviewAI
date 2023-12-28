import React from "react";
import facebook from "../resources/facebook.png";
import linkedIn from "../resources/linkedin.png";
import github from "../resources/github.jpeg";
import personal from "../resources/personal.png";

const SocialIcon: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="h-10 w-10 hover:opacity-75" />;
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C2C6C] text-white py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-16">
          <a href="https://www.facebook.com/benny.li.7/">
            <SocialIcon src={facebook} alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com/in/chengqi-benny-li/">
            <SocialIcon src={linkedIn} alt="LinkedIn" />
          </a>
          <a href="https://github.com/Bennyli1995">
            <SocialIcon src={github} alt="GitHub" />
          </a>
          <a href="https://techbybenny.com/">
            <SocialIcon src={personal} alt="Personal" />
          </a>
        </div>
        <div className="text-sm">
          Copyright @2023 InterviewAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
