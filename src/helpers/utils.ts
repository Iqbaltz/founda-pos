import Cookies from "js-cookie";

const isLoggedIn = () => {
  return Cookies.get("auth") ? true : false;
};

export const Utils = {
  isLoggedIn,
};
