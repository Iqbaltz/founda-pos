import { LoginEntity, LoginResponse, User } from "../entity/auth-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";

const login = async (payload: LoginEntity) =>
  (await fetchWrapper.auth("/auth/login", payload)) as LoginResponse;

const logout = async () => await fetchWrapper.post("/auth/logout");

const getProfile = async () => (await fetchWrapper.get("/auth/me")) as User;

export const authService = {
  login,
  logout,
  getProfile,
};
