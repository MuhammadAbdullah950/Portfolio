import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ imgSrc, imgAlt, githubLink, hostUrl, title, description, techIcon = [], techIconAlt = [], techName = [] }) => {
  return (
    <section id="project" className="group p-4">
      <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-700 hover:border-sky-400/50 transition-all duration-300 shadow-lg hover:shadow-sky-400/10">
        <div className="relative h-65 overflow-hidden">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 text-white"
            >
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            </a>
            <a
              href={hostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 text-white"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 mb-4">
            {description}
          </p>
          
          {/* Tech stack section with responsive layout */}
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-4">
            {/* Tech icons */}
            <div className="flex gap-3 items-center">
              {techIcon?.map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt={techIconAlt[index]}
                  className="w-8 h-8 bg-white rounded-full p-1 hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>

            {/* Tech names */}
            <div className="flex gap-2 flex-wrap">
              {techName.map((tech, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;