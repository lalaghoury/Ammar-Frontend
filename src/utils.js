export const getUrl = (role) => {
  if (role === "admin") {
    return "/admin";
  } else if (role === "startup") {
    return "/startup";
  } else {
    return "/sponsor";
  }
};
