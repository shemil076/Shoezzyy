import { RootState } from "../store";

export const selectOrder = (state : RootState) => state.orders.orders;
export const selectOrderLoading = (state : RootState) => state.orders.loading;
export const selectOrderLastFetched = (state : RootState) => state.orders.isOrderLastFetched;