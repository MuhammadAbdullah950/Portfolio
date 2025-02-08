import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { AboutData , dataLinks } from "../data/dataLinks";


const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-20 bg-zinc-900 relative flex  items-center"
    >
      <div className="absolute inset-0  opacity-50"></div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="bg-zinc-900/40 p-8 rounded-2xl backdrop-blur-sm max-w-3xl mx-auto border border-gray-700">
          <div className="mb-8">
            <h3 className="text-4xl font-bold text-white mb-2">
              {AboutData.AboutTitle}
            </h3>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              {AboutData.AboutDescription}
            </p>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <a
              href={dataLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Github size={28} />
            </a>
            <a
              href={dataLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Linkedin size={28} />
            </a>
            <a
              href={dataLinks.email}
              className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Mail size={28} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {AboutData.Skills  .map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;