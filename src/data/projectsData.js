import { useEffect, useState } from "react";
import { dataLinks } from "./dataLinks";

const GITHUB_RAW_URL = dataLinks.githubProjectData;
const CACHE_KEY = 'portfolio_projects_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const useFetchProjectData = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [projectCategory, setProjectCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseData = (cleanedText) => {
    try {
      const extractedData = new Function(`
        "use strict";
        ${cleanedText}
        return { projectsData, ProjectCategory };
      `)();

      if (!Array.isArray(extractedData.projectsData) || !Array.isArray(extractedData.ProjectCategory)) {
        throw new Error('Invalid data structure received');
      }

      return extractedData;
    } catch (evalError) {
      console.error('Evaluation error:', evalError);
      throw new Error(`Error parsing data: ${evalError.message}`);
    }
  };

  const fetchFromGithub = async () => {
    const response = await fetch(GITHUB_RAW_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const cleanedText = text
      .replace(/export\s*{[^}]*}/g, '')
      .replace(/export\s*default[^;]*/g, '');

    return parseData(cleanedText);
  };

  const updateCache = (data) => {
    const cacheData = {
      timestamp: Date.now(),
      data: data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  };

  const loadFromCache = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { timestamp, data } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;

      return isExpired ? null : data;
    } catch (error) {
      console.error('Cache reading error:', error);
      return null;
    }
  };

  const loadData = async (isMounted) => {
    try {
      setError(null);

      // Try loading from cache first
      const cachedData = loadFromCache();
      if (cachedData) {
        if (isMounted) {
          setProjectsData(cachedData.projectsData);
          setProjectCategory(cachedData.ProjectCategory);
          setIsLoading(false);
        }
        // Schedule background update if cache is older than half the cache duration
        const { timestamp } = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (Date.now() - timestamp > CACHE_DURATION / 2) {
          fetchAndUpdateCache(false);
        }
        return;
      }

      // If no cache, fetch from GitHub
      await fetchAndUpdateCache(isMounted);
    } catch (error) {
      console.error('Data loading error:', error);
      if (isMounted) {
        setError(error.message);
        setProjectsData([]);
        setProjectCategory([]);
        setIsLoading(false);
      }
    }
  };

  const fetchAndUpdateCache = async (updateState = true) => {
    try {
      const data = await fetchFromGithub();
      updateCache(data);
      if (updateState) {
        setProjectsData(data.projectsData);
        setProjectCategory(data.ProjectCategory);
        setIsLoading(false);
      }
    } catch (error) {
      if (updateState) {
        throw error;
      } else {
        console.error('Background update failed:', error);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    
    loadData(isMounted);

    // Set up periodic background updates
    const intervalId = setInterval(() => {
      fetchAndUpdateCache(false);
    }, CACHE_DURATION);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return {
    projectsData,
    projectCategory,
    isLoading,
    error
  };
};

export default useFetchProjectData;