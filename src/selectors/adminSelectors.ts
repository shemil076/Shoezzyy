import { RootState } from "../store";

export const seletAdminToken = (state : RootState) => state.admin.token;
export const seletAdminLoading = (state : RootState) => state.admin.loading;
export const seletAdminError = (state : RootState) => state.admin.error;