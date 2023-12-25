export const getRecentProjects = (arr) => {
  return arr.reverse().splice(0, 4);
};