import { StoreInformationEntity } from "../entity/store-information-entity";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { fetchWrapperServer } from "../helpers/fetch-wrapper-server";

const getStoreInformation = async () => {
  return await fetchWrapper.get(`/store-information`);
};

const getStoreInformationServer = async () => {
  return await fetchWrapperServer.get(`/store-information`);
};

const editStoreInformation = async (payload: StoreInformationEntity) => {
  return await fetchWrapper.post(`/store-information`, payload);
};

export const storeInformationService = {
  getStoreInformation,
  getStoreInformationServer,
  editStoreInformation,
};
