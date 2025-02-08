import React, { useState } from "react";
import useFetchProjectData from "../data/projectsData";

const useWork = () => {

  const { projectsData, projectCategory, isLoading, error } = useFetchProjectData();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const filteredProjects = projectsData.filter(project =>
    selectedCategory === "all" ? true : project.category === selectedCategory
  );

  // Handle loading more projects
  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 4, filteredProjects.length));
  };

  return {
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
  }
}

export default useWork;