import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faPlay } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({
  imgSrc,
  videoSrc,
  githubLink,
  hostUrl,
  title,
  description,
  techIcon = [],
  techIconAlt = [],
  techName = [],
}) => {
  return (
    <section id="project" className="group p-4">
      <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-700 hover:border-sky-400/50 transition-all duration-300 shadow-lg hover:shadow-sky-400/10">
        {/* Image or Video Display */}
        <div className="relative h-64 overflow-hidden">
          {videoSrc ? (
            <video controls className="w-full h-full object-cover">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <FontAwesomeIcon icon={faPlay} className="w-12 h-12 opacity-50" />
            </div>
          )}
        </div>

        {/* GitHub & Host Links (Shown only if Image is Present) */}
        {imgSrc && (
          <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 text-white"
              >
                <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
              </a>
            )}
            {hostUrl && (
              <a
                href={hostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 text-white"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-6 h-6" />
              </a>
            )}
          </div>
        )}

        {/* Title & Description */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 mb-4">{description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Tech icons */}
            {techIcon.length > 0 && (
              <div className="flex gap-3">
                {techIcon.map((icon, index) => (
                  <img
                    key={index}
                    src={icon}
                    alt={techIconAlt[index]}
                    className="w-8 h-8 bg-white rounded-full p-1 hover:scale-110 transition-transform duration-300"
                  />
                ))}
              </div>
            )}

            {/* Tech names */}
            {techName.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
