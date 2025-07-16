export const getRecentProjects = (projects, maxRecentProjects) => {
  if (!Array.isArray(projects) || projects.length === 0) {
    return [];
  }

  if (
    typeof maxRecentProjects !== "number" ||
    !Number.isInteger(maxRecentProjects) ||
    maxRecentProjects < 1
  ) {
    return [];
  }

  return projects.slice(-maxRecentProjects);
};
