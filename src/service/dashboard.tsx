import { fetchWrapper } from "../helpers/fetch-wrapper";

const getDashboardStats = async () => {
  return await fetchWrapper.get(`/dashboard`);
};

export const dashboardService = {
  getDashboardStats,
};
