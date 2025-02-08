import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { ChevronDown } from 'lucide-react';
import useWork from "../hooks/useWork";

const Work = () => {
  const {
    projectsData,
    projectCategory,
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    visibleProjects,
    handleLoadMore,
    filteredProjects,
    setVisibleProjects,
    isDropdownOpen,
    setIsDropdownOpen
  } = useWork();


  if (isLoading) {
    return (
      <section className="py-20 bg-zinc-900 min-h-[60vh] flex items-center justify-center">
        <div className="text-white flex items-center gap-3">
          <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          Loading projects...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-zinc-900 min-h-[60vh] flex items-center justify-center">
        <div className="text-red-400 text-center">
          <p className="mb-4">Error loading projects: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="text-left">
              <h2 className="text-4xl font-bold text-white mb-4">
                My Work
                <div className="h-1 w-20 bg-sky-500 mt-2 rounded-full"></div>
              </h2>
              <p className="text-lg text-gray-400">
                Explore some of my featured projects and creative works.
              </p>
            </div>

            {/* Responsive Category Filter */}
            <div className="relative w-full md:w-64">
              {/* Mobile Dropdown Button */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative w-full flex items-center justify-between px-4 py-3 rounded-lg 
                         bg-gray-800 text-white border border-gray-700 
                         focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none
                         transition-all duration-300 md:hidden"
              >
                <span className="truncate">
                  {projectCategory.find(cat => cat.value === selectedCategory)?.label}
                </span>
                <ChevronDown 
                  className={`ml-2 h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Mobile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-gray-800 rounded-lg shadow-lg md:hidden">
                  {projectCategory.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setVisibleProjects(4);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 
                               first:rounded-t-lg last:rounded-b-lg
                               transition-colors duration-200"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Desktop Select */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setVisibleProjects(4);
                }}
                className="hidden md:block w-full px-4 py-3 rounded-lg bg-gray-800 text-white 
                         border border-gray-700 focus:border-sky-500 focus:ring-2 
                         focus:ring-sky-500/20 focus:outline-none transition-all duration-300 
                         cursor-pointer appearance-none"
              >
                {projectCategory.map((category) => (
                  <option 
                    key={category.value} 
                    value={category.value}
                    className="bg-gray-800 text-white"
                  >
                    {category.label}
                  </option>
                ))}
              </select>
              
              {/* Desktop Dropdown Arrow */}
              <div className="hidden md:block absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No projects found in this category.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>

            {visibleProjects < filteredProjects.length && (
              <div className="text-center mt-16">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 
                           hover:bg-gray-700 transition-all duration-300 hover:border-sky-500/50
                           focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  Load More Projects
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Work;